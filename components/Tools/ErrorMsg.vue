<template>
  <div v-if="!!errMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-2 my-4 rounded relative" role="alert">
    <span class="block sm:inline">{{ errMessage }}</span>
  </div>
</template>

<script setup>
  defineProps({
    errMessage: String
  })
</script>
