import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth'

import moment from 'moment'
import { useFirestore } from './useFirestore'

export const useAuth = () => {
  const { $firebaseApp } = useNuxtApp()
  const auth = getAuth($firebaseApp)
  const { set, get } = useFirestore()

  const fbAuthStateListener = async (callback) => {
    onAuthStateChanged(auth, async () => {
      const user = auth.currentUser
      if (user) {
        callback(user)
      } else {
        callback(null)
      }
    })
  }

  const fbCreateAccount = async (
    email,
    password,
    firstname,
    lastname,
    phone
  ) => {
    const response = await createUserWithEmailAndPassword(auth, email, password)
    if (response.user.uid) {
      await fbSetUserProfile(email, firstname, lastname, phone)
      const profile = await get('users', response.user.uid)
      return {
        user: response.user,
        profile,
      }
    } else {
      return {
        user: null,
        profile: null,
      }
    }
  }

  const fbSignIn = async (email, password) => {
    const response = await signInWithEmailAndPassword(auth, email, password)
    return response
  }

  const fbSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    const response = await signInWithPopup(auth, provider)
    return response
  }

  const fbSignOut = async () => {
    await signOut(auth)
    return true
  }

  const fbSetUserProfile = async (email, firstname, lastname, phone) => {
    const user = auth.currentUser
    const payload = {
      email: email,
      firstname: firstname,
      lastname: lastname,
      phone: phone,
      userId: user.uid,
      createdOn: moment(),
    }
    await set('users', user.uid, payload)
    return true
  }

  const fbResetPassword = async (email) => {
    const response = await sendPasswordResetEmail(auth, email)
    return response
  }

  return {
    fbSignIn,
    fbSignInWithGoogle,
    fbSignOut,
    fbCreateAccount,
    fbAuthStateListener,
    fbResetPassword,
  }
}
