<script setup lang="ts">
import { PersonKey, type Person } from '@/types/types'
import { useToast } from 'vue-toast-notification'
import { inject, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const $toast = useToast()

const key = inject(PersonKey)

let checked = ref(false)
let name = ref('')
let email = ref('')
let phone = ref('')
let title = ref('')

const handleGoBack = () => {
  router.push('/')
}

const handleReset = () => {
  name.value = ''
  email.value = ''
  phone.value = ''
  title.value = ''
}

const handleSubmit = () => {
  let p: Person = {
    /* 
        since personsList is sorted, last id is the max one
        so we will use that to emulate autoincrement in SQL
      */
    id: key?.personsList
      ? key.personsList.value.value.length > 0
        ? key.personsList.value.value.slice(-1)[0].id + 1
        : 1
      : Math.floor(Math.random() * 100000),
    name: name.value,
    email: email.value,
    phone: phone.value,
    title: title.value
  }
  if (key) key.create(p)
  $toast.success(`Persona ${name.value} aggiunta nel database`, {
    position: 'top'
  })
  if (!checked.value) {
    router.push('/')
  } else {
    name.value = ''
    email.value = ''
    phone.value = ''
    title.value = ''
  }
}
</script>

<template>
  <main className="{InsertCSS.main}">
    <section>
      <h1>Aggiungi campo</h1>
      <form @submit.prevent="handleSubmit">
        <button type="button" @click="handleGoBack">
          <font-awesome-icon :icon="['fas', 'arrow-left']" />Torna indietro
        </button>
        <div>
          <input type="checkbox" id="multi-entry" v-model="checked" />
          <label for="multi-entry"> Inserisci campi multipli</label>
        </div>
        <label for="name">Nome</label>
        <input
          required
          type="text"
          id="name"
          placeholder="Inserisci il nome qui..."
          v-model="name"
        />
        <label for="email">Email</label>
        <input
          required
          type="email"
          id="email"
          placeholder="Inserisci l'email qui..."
          v-model="email"
        />
        <label for="phone">Numero di telefono (formato accettato: 3771117721)</label>
        <input
          required
          maxLength="10"
          type="tel"
          id="phone"
          pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
          placeholder="Inserisci il numero di telefono qui..."
          v-model="phone"
        />
        <label for="title">Titolo</label>
        <input
          required
          type="text"
          id="title"
          placeholder="Inserisci il titolo della persona qui..."
          v-model="title"
        />
        <div>
          <button type="submit">Inserisci campo</button>
          <button type="reset" @click="handleReset">
            <font-awesome-icon :icon="['fas', 'eraser']" />
          </button>
        </div>
      </form>
    </section>
  </main>
</template>

<style scoped>
main {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

main > section {
  width: clamp(min(90vw, 70%), 70%, max(90%, 90vw));
  margin: 0 auto;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  margin: 0 auto;
  width: fit-content;
}

form > button:first-child {
  align-self: flex-start;
  padding: 0.25rem;
  border: none;
  background-color: unset;
  display: flex;
  align-items: center;
  cursor: pointer;
}

form > button:first-child > svg {
  height: 1.25rem;
  margin-right: 1ch;
}

form > label {
  text-align: start;
  font-weight: 400;
  width: 100%;
  word-wrap: break-word;
  opacity: 0.8;
}

form > input {
  border: none;
  padding: 0.5rem;
  outline: none;
  width: clamp(260px, 40vw, 600px);
  border: 1px solid #a1a1a1;
  border-radius: 5px;
}

form > input:focus {
  border: 1px solid black;
  transition: 0.2s all ease-out;
}

form > div > button {
  cursor: pointer;
  background-color: #111;
  color: #eee;
  padding: 0.75rem 1.25rem;
  margin-top: 0.75rem;
  border: none;
  font-weight: 400;
  margin-right: 1rem;
}

form > button:hover,
form > div > button:hover,
form > div > button:focus {
  transform: scale(1.1);
  transition: 0.1s all ease-out;
}
</style>
