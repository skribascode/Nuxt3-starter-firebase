<script setup>
	import { useAuthStore } from '@/store/user'
	import { useGlobalStore } from '@/store/global'

	definePageMeta({
		layout: 'visitor'
	})

	const globalStore = useGlobalStore()
	console.log(await globalStore.list())
	const authStore = useAuthStore()
	const { resetPassword } = authStore
	onMounted(() => authStore.error = '')

	const sended = ref(false)

	const dataForm = reactive({
		email: '',
	})

	const recover = async () => {
		await resetPassword(dataForm.email).then(() => {
			sended.value = true
			dataForm.email = ''
		})
	}
</script>

<template>
	<div class="flex flex-col items-center mx-auto w-full h-full p-4">

		<Logo />

		<div class="bg-white shadow rounded lg:w-1/3 md:w-1/2 w-full p-4">
			<h1 class="focus:outline-none text-2xl font-extrabold leading-6">
				Recover your password
			</h1>
			<p class="focus:outline-none text-xs my-4 font-medium leading-5 text-slate-400">
				Enter your email for recover password. Only if you registered via email/password, not with Googles.
			</p>
			<form @submit.prevent="recover()">
				<div>
					<label
						for="email"
						class="text-sm font-medium leading-none text-slate-700">
						Email
					</label>
					<input
						id="email"
						aria-labelledby="email"
						v-model="dataForm.email"
						type="email"
						required
						class="bg-gray-100 border rounded-lg text-xs font-medium leading-none text-slate-700 py-3 w-full pl-3 mt-2"
					/>
				</div>
				<div class="mt-8">
					<button
						role="button"
						type="submit"
						class="text-sm font-semibold leading-none text-white focus:outline-none bg-slate-700 border rounded-lg hover:bg-slate-500 py-4 w-full">
						Recovery
					</button>
				</div>
			</form>

			<p
				class="focus:outline-none text-center text-sm mt-8 font-medium leading-none text-slate-400"
      >
				<nuxt-link
					class="focus:outline-none focus:underline text-center text-sm font-medium leading-none cursor-pointer"
					to="/">
					Return to login here
				</nuxt-link>
			</p>

			<div v-if="sended" class="mt-4">
				<ToolsSuccessMsg
					successMessage="A password reset email has been sent to you" />
			</div>
		</div>
	</div>
</template>
