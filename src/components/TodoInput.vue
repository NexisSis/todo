<template>
  <div class="todo-input">
    <input
      v-model="inputValue"
      @keyup.enter="handleSubmit"
      placeholder="Add a new task..."
      class="todo-input__field"
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

<style scoped>
.todo-input {
  display: flex;
  gap: 0.625rem;
  margin-bottom: 1.25rem;
}

.todo-input__field {
  flex: 1;
  padding: 0.625rem;
  border: 1px solid var(--color-border-default);
  border-radius: 0.375rem;
  font-size: 1rem;
  color: var(--color-text-primary);
  background-color: var(--color-white);
}

.todo-input__field:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-primary);
  border-color: var(--color-transparent);
}

.todo-input__field::placeholder {
  color: var(--color-text-muted);
}
</style>
