<script setup lang="ts">
import router from '@/router'
import { inject, ref, watch, type Ref } from 'vue'
import Pagination from './Pagination.vue'
import { PersonKey, type Person } from '@/types/types'
import PersonComponent from './PersonComponent.vue'

const handleClick = () => {
  router.push('/insert')
}
let key = inject(PersonKey)
const currentPage = ref(1)
const personsPerPage = ref(3)
let totalPages = ref(Math.ceil((key?.personsList.value.value.length ?? 0) / personsPerPage.value))

let endIndex: number
let startIndex: number
let currentPersons: Ref<Person[]> = ref([])

endIndex = currentPage.value * personsPerPage.value
startIndex = endIndex - personsPerPage.value

currentPersons.value = key?.personsList?.value?.value.slice(startIndex, endIndex) ?? []

const setCurrentPage = (number: number) => {
  currentPage.value = number
}

watch(currentPage, (newCurrentPage, prevCurrentPage) => {
  console.log('NEW: ', newCurrentPage, ' OLD: ', prevCurrentPage)
  if (prevCurrentPage == newCurrentPage) return
  endIndex = newCurrentPage * personsPerPage.value
  startIndex = endIndex - personsPerPage.value
  currentPersons.value = key?.personsList.value.value.slice(startIndex, endIndex) ?? []
})

watch(key?.personsList.value ?? [], (newValue) => {
  const newV = key?.personsList.value.value
  currentPersons.value = newV?.slice(startIndex, endIndex) ?? []
  totalPages.value = Math.ceil((key?.personsList.value.value.length ?? 0) / personsPerPage.value)
  console.log('NUOVO', newValue)
  console.log('STARTIN', startIndex, 'ENDIND', endIndex)
  console.log('PERSONAAAA', currentPersons)
})
</script>

<template>
  <div class="container">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Telefono</th>
          <th>Titolo</th>
          <th>
            <div>
              Azioni<button>
                <font-awesome-icon :icon="['fas', 'plus']" @click="handleClick" />
              </button>
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="tbody_grid_personcomponent">
        <PersonComponent v-for="person in currentPersons" :key="person.id" :person="person" />
      </tbody>
    </table>
  </div>
  <Pagination
    v-model:currentPage="currentPage"
    @setCurrentPage="setCurrentPage"
    v-model:lastPage="totalPages"
  />
</template>

<style scoped>
table {
  margin: 0 auto;
  padding: 0;
  border: 1px solid black;
  border-collapse: collapse;
  margin-bottom: 0.5rem;
  min-width: 100%;
}

table > thead {
  background: #d9d9d9;
  color: #111;
}

tr > th {
  padding: 1rem;
}

th > div {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

th > div > button {
  background: none;
  border: none;
  color: #111;
  cursor: pointer;
  transition: all 0.2s ease-in;
}

th > div > button:hover {
  transform: scale(1.7);
}

@media screen and (width <= 748px) {
  .container {
    overflow: scroll;
  }
}
</style>

<style>
.tbody_grid_personcomponent > tr:nth-child(even) {
  background-color: #e7e7e7;
}
</style>
