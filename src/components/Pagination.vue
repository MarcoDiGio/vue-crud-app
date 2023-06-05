<script setup lang="ts">
import { ref, watch, type Ref } from 'vue'

const props = defineProps<{
  currentPage: number
  lastPage: number
}>()

const emit = defineEmits<{
  setCurrentPage: [n: number]
}>()

const neighbors = ref(2)
let numbers: Ref<number[]> = ref([])

const calculateNeighbors = (currentPage: number, lastPage: number) => {
  if (lastPage == 0) {
    numbers.value = []
    return
  }
  numbers.value = [1, currentPage, lastPage]
  for (let index = 1; index <= neighbors.value; index++) {
    const prev = currentPage - index
    const next = currentPage + index
    if (prev > 0) numbers.value.push(prev)
    if (next < props.lastPage) numbers.value.push(next)
  }
  numbers.value = Array.from(new Set(numbers.value))
  numbers.value.sort()
}

calculateNeighbors(props.currentPage, props.lastPage)

watch(props, (newValue) => {
  if (props.lastPage < props.currentPage) {
    emit('setCurrentPage', 1)
  }
  console.log(newValue.currentPage, numbers.value)
  calculateNeighbors(newValue.currentPage, newValue.lastPage)
  console.log(numbers.value)
})
</script>

<template>
  <div>
    <button
      v-for="number in numbers"
      :key="number"
      v-bind:style="number == props.currentPage ? { backgroundColor: '#111' } : {}"
      @click="emit('setCurrentPage', number)"
    >
      {{ number }}
    </button>
  </div>
</template>

<style scoped>
div {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-top: 1rem;
}

div > button {
  cursor: pointer;
  background-color: gray;
  color: #eee;
  padding: 0.75rem 1rem;
  border: none;
  font-weight: 400;
  margin-bottom: 1rem;
  transition: all 0.1s ease-in;
}

div > button:hover {
  background-color: #444;
  transform: scale(1.2);
}
</style>
