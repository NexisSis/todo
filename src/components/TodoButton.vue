<template>
  <button
    :class="[
      'todo-button',
      type === 'primary' ? 'todo-button--primary' : 'todo-button--delete'
    ]"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'primary'
  }
})
</script>

<style scoped>
.todo-button {
  padding: 0.625rem 1.25rem;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.todo-button--primary {
  background-color: var(--color-primary);
  color: var(--color-white);
}

.todo-button--primary:hover {
  background-color: var(--color-primary-hover);
}

.todo-button--delete {
  background-color: var(--color-bg-transparent);
  color: var(--color-danger);
  font-size: 1.25rem;
  padding: 0 0.25rem;
}

.todo-button--delete:hover {
  color: var(--color-danger-hover);
}
</style>
