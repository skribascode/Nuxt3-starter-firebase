<template>
  <div v-if="!!successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-2 my-4 rounded relative" role="alert">
    <span class="block sm:inline">{{ successMessage }}</span>
  </div>
</template>

<script setup>
  defineProps({
    successMessage: String
  })
</script>
