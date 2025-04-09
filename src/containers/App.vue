<template>
  <div class="app">
    <h1 class="app__title">Todo List</h1>
    <TodoInput @add-todo="handleAddTodo" />
    <TodoList
      :todos="todoListStore.todos"
      @toggle-todo="handleToggleTodo"
      @remove-todo="handleDeleteTodo"
    />
  </div>
</template>

<script setup>
import { useTodoListStore } from '../stores/useTodoListStore'
import TodoInput from '../components/TodoInput.vue'
import TodoList from '../components/TodoList.vue'
import { onMounted } from 'vue'

const todoListStore = useTodoListStore()

onMounted(async () => {
  await todoListStore.initialize()
})

const handleAddTodo = async (text) => {
  await todoListStore.addTodo(text)
}

const handleToggleTodo = async (id) => {
  await todoListStore.toggleTodo(id)
}

const handleDeleteTodo = async (id) => {
  await todoListStore.deleteTodo(id)
}
</script>

<style scoped>
.app {
  max-width: 42rem;
  margin: 0 auto;
  padding: 1.25rem;
  font-family: system-ui, -apple-system, sans-serif;
}

.app__title {
  text-align: center;
  color: var(--color-text-primary);
  font-size: 1.875rem;
  font-weight: bold;
  margin-bottom: 2rem;
}
</style>
