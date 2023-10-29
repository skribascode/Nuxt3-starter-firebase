<script setup>
import { useAuthStore } from '@/store/user'
import { OnClickOutside } from '@vueuse/components'

const router = useRouter()
const authStore = useAuthStore()
const { logoutUser } = authStore

const toggleMenuUser = ref(false)
const toggleMenuNav = ref(false)

const signOut = async () => await logoutUser().then(() => router.push('/'))
</script>

<template>
  <header class="w-full flex justify-between items-center p-4 bg-slate-600 text-white font-semi">
    <div class="relative">
      <Icon @click="toggleMenuUser = !toggleMenuUser" name="uil:user-circle" size="24" />
      <OnClickOutside @trigger="toggleMenuUser = false">
        <nav v-if="toggleMenuUser" class="absolute top-10 mt-1 -left-4 min-w-max flex flex-col p-4 shadow-sm bg-white">
          <nuxt-link class="leading-7" to="/auth/profile">Profile</nuxt-link>
          <nuxt-link class="leading-7" @click="signOut">Sign Out</nuxt-link>
        </nav>
      </OnClickOutside>
    </div>
    <div class="relative">
      <Icon @click="toggleMenuNav = !toggleMenuNav" name="uil:bars" size="24" />
      <OnClickOutside @trigger="toggleMenuNav = false">
        <nav v-if="toggleMenuNav" class="absolute top-10 mt-1 -right-4 min-w-max flex flex-col p-4 shadow-sm bg-white">
          <nuxt-link class="leading-7" to="/auth">Home</nuxt-link>
        </nav>
      </OnClickOutside>
    </div>
  </header>
</template>
