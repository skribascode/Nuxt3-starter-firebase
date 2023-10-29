import { useAuthStore } from '@/store/user'

export default defineNuxtRouteMiddleware(async(to, from) => {

  const { isLoggedIn } = storeToRefs(useAuthStore())

  const publicRoutes = ['/', '/register', '/recover']
  const authRoute = '/auth'

  watch(isLoggedIn, (value) => {
    if (value) {
      if (publicRoutes.includes(to.path)) {
        return navigateTo(authRoute)
      }
      return true
    } else {
      if (!publicRoutes.includes(to.path)) {
        return navigateTo('/')
      }
      return true
    }
  })

  if (isLoggedIn.value) {
    if (publicRoutes.includes(to.path)) {
      return navigateTo(authRoute)
    }
    return true
  } else {
    if (!publicRoutes.includes(to.path)) {
      return navigateTo('/')
    }
    return true
  }

})
