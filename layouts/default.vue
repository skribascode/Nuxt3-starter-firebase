<script setup>
import { useAuthStore } from '@/store/user'

const authStore = useAuthStore()

</script>
<template>
  <div class="flex flex-col justify-center items-center w-full h-screen text-slate-700">
    <Header v-if="authStore.isLoggedIn"/>
    <slot />
  </div>
</template>
