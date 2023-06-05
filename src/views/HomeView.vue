<script setup lang="ts">
import Grid from '@/components/Grid.vue'
</script>

<template>
  <main>
    <div>
      <h1>Interfaccia per operazioni CRUD</h1>
      <Grid />
    </div>
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

main > div {
  width: 60%;
  text-align: center;
}

main > div > button {
  cursor: pointer;
  background-color: #111;
  color: #eee;
  padding: 0.75rem;
  border: none;
  font-weight: 400;
  margin-bottom: 1rem;
  transition: all 0.1s ease-in;
}

main > div > button:hover {
  background-color: #333;
  transform: scale(1.1);
}

@media screen and (width <= 748px) {
  main > div {
    width: 95%;
  }
}
</style>
