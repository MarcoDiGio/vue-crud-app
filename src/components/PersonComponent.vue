<script setup lang="ts">
import { PersonKey, type Person } from '@/types/types'
import { inject, ref } from 'vue'
import { useToast } from 'vue-toast-notification'

const props = defineProps<{
  person: Person
}>()

const { update, remove } = inject(PersonKey) ?? {
  update: () => {
    return
  },
  remove: () => {
    return
  }
}
const $toast = useToast()

const isEditing = ref(false)
const name = ref(props.person.name)
const email = ref(props.person.email)
const phone = ref(props.person.phone)
const title = ref(props.person.title)

const handleEdit = () => {
  let newPerson: Person = {
    id: props.person.id,
    name: name.value,
    email: email.value,
    phone: phone.value,
    title: title.value
  }
  update(newPerson)

  isEditing.value = false

  $toast.success(`Persona ${newPerson.name} modificata con successo`, {
    position: 'top'
  })
}

const handleDelete = (id: number) => {
  if (confirm(`Vuoi davvero rimuovere ${props.person.name}?`)) remove(id)

  $toast.success(`Persona ${props.person.name} rimossa con successo`, {
    position: 'top'
  })
}
</script>

<template>
  <tr v-if="isEditing">
    <td>{{ person.id }}</td>
    <td><input type="text" required name="name" v-model="name" /></td>
    <td><input type="email" required name="email" v-model="email" /></td>
    <td>
      <input type="tel" required pattern="[0-9]{3}[0-9]{3}[0-9]{4}" name="phone" v-model="phone" />
    </td>
    <td><input type="text" required name="title" v-model="title" /></td>
    <td>
      <button type="button" @click="handleEdit">
        <font-awesome-icon :icon="['fas', 'check']" />
      </button>
    </td>
  </tr>
  <tr v-if="!isEditing">
    <td>{{ person.id }}</td>
    <td>{{ name }}</td>
    <td>{{ email }}</td>
    <td>{{ phone }}</td>
    <td>{{ title }}</td>
    <td>
      <button @click="isEditing = true">
        <font-awesome-icon :icon="['fas', 'pen-to-square']" />
      </button>
      <button @click="handleDelete(person.id)">
        <font-awesome-icon :icon="['fas', 'trash']" />
      </button>
    </td>
  </tr>
</template>

<style scoped>
tr {
  border: 1px solid black;
}

tr > td {
  border: 1px solid black;
  padding: 0.75rem;
}

tr > td > button {
  cursor: pointer;
  background: none;
  border: none;
  transition: all 0.2s ease-in;
}

tr > td > button:nth-child(2) {
  color: #dd0000;
}

tr > td:last-child {
  min-width: 3.9rem;
}

tr > td > button:hover {
  transform: scale(1.4);
}

tr > td > button:nth-child(2):hover {
  color: #aa0000;
}
</style>
