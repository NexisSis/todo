<template>
  <li class="todo-item">
    <input
      type="checkbox"
      :checked="completed"
      @change="toggleTodo"
      class="todo-item__checkbox"
    />
    <span :class="{ 'todo-item__text--completed': completed }" class="todo-item__text">
      {{ text }}
    </span>
    <TodoButton type="delete" @click="removeTodo">×</TodoButton>
  </li>
</template>

<script setup>
import TodoButton from './TodoButton.vue'

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['toggle-todo', 'remove-todo'])

const toggleTodo = () => {
  emit('toggle-todo', props.id)
}

const removeTodo = () => {
  emit('remove-todo', props.id)
}
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  padding: 0.625rem;
  background-color: var(--color-bg-light);
  border-radius: 0.375rem;
  margin-bottom: 0.625rem;
}

.todo-item__checkbox {
  margin-right: 0.625rem;
  width: 1rem;
  height: 1rem;
  color: var(--color-primary);
  border-radius: 0.25rem;
}

.todo-item__checkbox:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-primary);
}

.todo-item__text {
  flex: 1;
  color: var(--color-text-primary);
}

.todo-item__text--completed {
  text-decoration: line-through;
  color: var(--color-text-muted);
}
</style>
