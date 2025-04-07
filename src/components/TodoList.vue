<template>
  <ul class="list-none p-0">
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
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
