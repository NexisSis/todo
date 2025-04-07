<template>
  <li class="flex items-center p-2.5 bg-gray-50 rounded-md mb-2.5">
    <input
      type="checkbox"
      :checked="completed"
      @change="toggleTodo"
      class="mr-2.5 w-4 h-4 text-green-500 rounded focus:ring-green-500"
    />
    <span :class="{ 'line-through text-gray-500': completed }" class="flex-1">
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
