<template>
  <div class="flex gap-2.5 mb-5">
    <input
      v-model="inputValue"
      @keyup.enter="handleSubmit"
      placeholder="Add a new task..."
      class="flex-1 px-2.5 py-2.5 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
    />
    <TodoButton @click="handleSubmit">Add</TodoButton>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TodoButton from './TodoButton.vue'

const inputValue = ref('')

const handleSubmit = () => {
  if (inputValue.value.trim()) {
    emit('add-todo', inputValue.value.trim())
    inputValue.value = ''
  }
}

const emit = defineEmits(['add-todo'])
</script>
