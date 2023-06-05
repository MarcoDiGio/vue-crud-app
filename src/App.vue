<script setup lang="ts">
import { type Ref, ref, provide } from 'vue'
import { RouterView } from 'vue-router'
import { PersonKey, type Person } from './types/types'
import { computed } from 'vue'
const personsList: Ref<Person[]> = ref([
  {
    id: 1,
    name: 'John Smith',
    email: 'johnsmith@gmail.com',
    phone: '1112223334',
    title: 'Direttore Operativo'
  },
  {
    id: 2,
    name: 'Mario Rossi',
    email: 'mariorossi@hotmail.it',
    phone: '3334445556',
    title: 'Direttore Generale'
  },
  {
    id: 3,
    name: 'Robert Smith',
    email: 'robertsmith@outlook.it',
    phone: '3234545656',
    title: 'Amministratore Delegato'
  },
  {
    id: 4,
    name: 'James Marisbury',
    email: 'jamesmarisbury@libero.it',
    phone: '5445549999',
    title: 'Impiegato'
  },
  {
    id: 5,
    name: 'Patricia Felicia',
    email: 'patriciafelicia@hotmail.it',
    phone: '5235248909',
    title: 'Impiegato'
  },
  {
    id: 6,
    name: 'Jennifer Robinson',
    email: 'jenniferrobinson@privatemail.com',
    phone: '5245248999',
    title: 'Impiegato'
  },
  {
    id: 7,
    name: 'Richard Robinson',
    email: 'richardrobinson@libero.it',
    phone: '3943934980',
    title: 'Impiegato'
  },
  {
    id: 8,
    name: 'Mr Robinson',
    email: 'mrrobinson@protonmail.com',
    phone: '5225236979',
    title: 'Impiegato'
  }
])

const remove = (id: number) => {
  personsList.value = personsList.value.filter((x) => x.id != id)
  sort()
  console.log('QUI', personsList.value)
}

const create = (person: Person) => {
  personsList.value.push(person)
  sort()
}

const update = (person: Person) => {
  remove(person.id)
  personsList.value.push(person)
  sort()
}

const sort = () => {
  personsList.value = personsList.value.sort((a, b) => a.id - b.id)
}

const ctx = {
  personsList: computed<Ref<Person[]>>(() => personsList),
  create,
  update,
  remove
}

provide(PersonKey, ctx)
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
