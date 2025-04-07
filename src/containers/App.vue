<template>
  <div class="max-w-2xl mx-auto p-5 font-sans">
    <h1 class="text-center text-gray-800 text-3xl font-bold mb-8">Todo List</h1>
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
