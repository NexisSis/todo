<template>
  <ul class="todo-list">
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :completed="todo.completed"
      :id="todo.id"
      :text="todo.text"
      @toggle-todo="toggleTodo"
      @remove-todo="removeTodo"
    />
  </ul>
</template>

<script setup>
import TodoItem from './TodoItem.vue'

defineProps({
  todos: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['toggle-todo', 'remove-todo'])

const toggleTodo = (id) => {
  emit('toggle-todo', id)
}

const removeTodo = (id) => {
  emit('remove-todo', id)
}
</script>

<style scoped>
.todo-list {
  list-style: none;
  padding: 0;
}
</style>
