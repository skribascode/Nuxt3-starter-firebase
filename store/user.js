import { defineStore } from 'pinia'
import { translateFirebaseError } from '@/utils/firebaseErrors'
import { useAuth } from '@/composables/useAuth'
import { useFirestore } from '@/composables/useFirestore'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: null,
    profile: null,
    authUserUnsubscribe: null,
    error: '',
  }),
  piniaPersistedstate: {
    cookieOptions: {
      sameSite: 'strict',
    },
    storage: 'localStorage'
  },
  getters: {
    isLoggedIn: (state) => state.user !== null,
    userError: (state) => state.error,
  },
  actions: {
    async initializeAuthListener() {
      const { fbAuthStateListener } = useAuth()
      const { get } = useFirestore()

      return new Promise((resolve) => {
        fbAuthStateListener(async (user) => {
          this.user = user ? user : null
          if (user) {
            const profile = await get('users', user.uid)
            this.profile = profile
            this.user = user
          }
          resolve(true)
        })
      })
    },
    async logInUser(email, password) {
      const { fbSignIn } = useAuth()
      try {
        const response = await fbSignIn(email, password)
        this.user = response.user ? response.user : null
        this.error = ''
        return true
      } catch (e) {
        this.user = null
        this.error = translateFirebaseError(e.code)
        return false
      }
    },
    async logInUserWithGoogle() {
      const { fbSignInWithGoogle } = useAuth()
      try {
        const response = await fbSignInWithGoogle()
        this.user = response.user ? response.user : null
        this.error = ''
        return true
      } catch (e) {
        this.user = null
        this.error = translateFirebaseError(e.code)
        return false
      }
    },
    async logoutUser() {
      const { fbSignOut } = useAuth()
      try {
        await fbSignOut()
        this.user = null
        this.profile = null
        this.error = ''
        return true
      } catch (e) {
        this.error = translateFirebaseError(e.code)
        return false
      }
    },
    async createAccount(email, password, firstname, lastname, phone) {
      const { fbCreateAccount } = useAuth()
      try {
        const { user, profile } = await fbCreateAccount(email, password, firstname, lastname, phone)
        this.user = user ? user : null
        this.profile = profile ? profile : null
        this.error = ''
        return true
      } catch (e) {
        this.user = null
        this.error = translateFirebaseError(e.code)
        return false
      }
    },
    async resetPassword(email) {
      const { fbResetPassword } = useAuth()
      const { list } = useFirestore()
      try {
        await list('users', 'email', email).then(async (snap) => {
          if (!snap.empty) {
            this.error = ''
            await fbResetPassword(email)
            return true
          } else {
            return false
          }
        })
      } catch (e) {
        this.error = translateFirebaseError(e.code)
        return false
      }
    }
  },
})
