import { defineNuxtPlugin } from '#app'
import { useAuthStore } from '@/store/user'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => {
    const authStore = useAuthStore()
    authStore.initializeAuthListener()
  })
})
