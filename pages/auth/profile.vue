<script setup>
import { useAuthStore } from '@/store/user'

const authStore = useAuthStore()
</script>
<template>
  <div class="flex flex-col items-center mx-auto w-full h-screen p-4">
    <h1>Profile</h1>
    <p>{{ authStore.isLoggedIn ? 'Connected !': 'Disconnected...'}}</p>
  </div>
</template>
