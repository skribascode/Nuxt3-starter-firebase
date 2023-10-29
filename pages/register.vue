<script setup>
	import { useVuelidate } from '@vuelidate/core'
	import {
		required,
		helpers,
		email,
		minLength,
		sameAs,
	} from '@vuelidate/validators'
	import { useAuthStore } from '@/store/user'

	definePageMeta({
		layout: 'visitor'
	})

	const router = useRouter()

	const authStore = useAuthStore()
	const { createAccount, logInUserWithGoogle } = authStore

	const pwdClear = ref(false)
	const confirmPwdClear = ref(false)

	onMounted(() => (authStore.error = ''))

	const dataForm = reactive({
		email: '',
		password: '',
		confirmPassword: '',
	})

	const rules = computed(() => {
		return {
			email: {
				required: helpers.withMessage('Email is required', required),
				email: helpers.withMessage('Email is incorrect', email),
			},
			password: {
				required: helpers.withMessage('Password is required', required),
				minLength: helpers.withMessage('Password must contain at least 8 characters', minLength(8)),
				containsPasswordRequirement: helpers.withMessage(
					() =>
						`Password requires an uppercase, lowercase, number and special character`,
					(value) =>
						/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/.test(value),
				),
			},
			confirmPassword: {
				required: helpers.withMessage('Confirm password is required', required),
				sameAs: helpers.withMessage('Confirm Password is different of password', sameAs(dataForm.password)),
			},
		}
	})

	const v$ = useVuelidate(rules, dataForm)

	const validate = async () => {
		const result = await v$.value.$validate()
		if (!result) {
			return
		}
		signUp()
		v$.value.$reset()
	}

	const signUp = async () => {
		await createAccount(dataForm.email, dataForm.password).then(() => router.push('auth'))
	}

	const signUpWithGoogle = async () => {
		await logInUserWithGoogle().then(() => router.push('auth'))
	}
</script>

<template>
	<div class="flex flex-col items-center mx-auto w-full h-full p-4">

		<Logo />
		<div class="bg-white shadow rounded lg:w-1/3 md:w-1/2 w-full p-4">
			<h1 class="focus:outline-none text-2xl font-extrabold leading-6">
				Register
			</h1>
			<p
				tabindex="0"
				class="focus:outline-none text-sm my-4 font-medium leading-none text-slate-400">
				<span>You have account?</span>
				<nuxt-link
					class="hover:text-slate-500 focus:outline-none hover:underline text-sm font-medium leading-none text-slate-800 cursor-pointer ml-1"
					to="/">
					Sign in here
				</nuxt-link>
			</p>

			<ToolsErrorMsg v-if="authStore.error" :errMessage="authStore.error" />

			<button
				aria-label="Continue with google"
				role="button"
				class="focus:outline-none py-3.5 px-4 border rounded-lg border-slate-700 flex items-center w-full mt-10 mb-5"
				@click="signUpWithGoogle()">
				<Icon name="logos:google-icon" />
				<p class="text-base font-medium ml-4 text-slate-700">
					Continue with Google
				</p>
			</button>

			<div class="w-full flex items-center justify-between py-5">
				<hr class="w-full bg-gray-400" />
				<p class="text-base font-medium leading-4 px-2.5 text-slate-400">OR</p>
				<hr class="w-full bg-gray-400" />
			</div>

			<form @submit.prevent="validate()">
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
						class="focus:outline-none bg-gray-100 border rounded-lg text-xs font-medium leading-none text-slate-700 py-3 w-full pl-3 mt-2" />
					<div
						v-if="v$.email.$errors.length"
						class="text-xs font-medium leading-none text-red-500 py-2"
          >
						<div
							v-for="error of v$.email.$errors"
							:key="error.$uid"
						>
							<div class="">{{ error.$message }}</div>
						</div>
					</div>
				</div>

				<div class="mt-6 w-full">
					<label
						for="password"
						class="text-sm font-medium leading-none text-slate-700">
						Password
					</label>

					<div class="relative flex items-center justify-center">
						<input
							id="password"
							v-model="dataForm.password"
							:type="pwdClear ? 'text' : 'password'"
							required
							class="focus:outline-none bg-gray-100 border rounded-lg font-medium leading-none text-base text-slate-700 py-3 w-full pl-3 mt-2" />
						<div
							@click="pwdClear = !pwdClear"
							class="absolute right-0 mt-2 mr-3 cursor-pointer">
							<Icon v-if="pwdClear" name="eva:eye-off-outline" />
							<Icon v-else name="eva:eye-outline" />
						</div>
					</div>

					<div
						v-if="v$.password.$errors.length"
						class="text-xs font-medium leading-none text-red-500 py-2">
						<div
							v-for="error of v$.password.$errors"
							:key="error.$uid">
							<div class="">{{ error.$message }}</div>
						</div>
					</div>
				</div>

				<div class="mt-6 w-full">
					<label
						for="confirm-password"
						class="text-sm font-medium leading-none text-slate-700">
						Confirm your password
					</label>

					<div class="relative flex items-center justify-center">
						<input
							id="confirm-password"
							v-model="dataForm.confirmPassword"
							:type="confirmPwdClear ? 'text' : 'password'"
							required
							class="focus:outline-none bg-gray-100 border rounded-lg font-medium leading-none text-base text-slate-700 py-3 w-full pl-3 mt-2"
            />

						<div
							@click="confirmPwdClear = !confirmPwdClear"
							class="absolute right-0 mt-2 mr-3 cursor-pointer">
							<Icon v-if="confirmPwdClear" name="eva:eye-off-outline" />
							<Icon v-else name="eva:eye-outline" />
						</div>
					</div>

					<div
						v-if="v$.confirmPassword.$errors.length"
						class="text-xs font-medium leading-none text-red-500 py-2"
          >
            {{ v$.confirmPassword.$errors[0].$message }}
					</div>
				</div>

				<div class="mt-8">
					<button
						role="button"
						type="submit"
						class="text-sm font-semibold leading-none text-white focus:outline-none bg-slate-700 border rounded-lg hover:bg-slate-500 py-4 w-full">
						Register
					</button>
				</div>
			</form>
		</div>
	</div>
</template>
