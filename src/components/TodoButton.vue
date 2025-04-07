<template>
  <button
    :class="[
      'px-5 py-2.5 rounded-md cursor-pointer text-base transition-colors duration-200',
      type === 'primary'
        ? 'bg-primary text-white hover:bg-primary-hover'
        : 'bg-transparent text-danger text-xl px-1 hover:text-danger-hover'
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
