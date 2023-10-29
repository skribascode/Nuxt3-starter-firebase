import { defineNuxtPlugin } from '#app'
import { initializeApp } from 'firebase/app'

export default defineNuxtPlugin((nuxtApp) => {

	const config = useRuntimeConfig().public

	const firebaseConfig = {
		apiKey: config.apiKey,
		authDomain: config.authDomain,
		projectId: config.projectId,
		storageBucket: config.storageBucket,
		messagingSenderId: config.messagingSenderId,
		appId: config.appId,
	}

	const fApp = initializeApp(firebaseConfig)

	nuxtApp.provide('firebaseApp', fApp)
})
