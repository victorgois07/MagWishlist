<template>
  <form @submit.prevent="handleSubmit" class="login-form">
    <div class="form-group">
      <label for="email">Email</label>
      <input id="email" v-model="email" type="email" required placeholder="Enter your email" />
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <input
        id="password"
        v-model="password"
        type="password"
        required
        placeholder="Enter your password"
      />
    </div>

    <button type="submit" :disabled="loading">
      {{ loading ? 'Logging in...' : 'Login' }}
    </button>

    <p v-if="error" class="error">{{ error }}</p>
  </form>
</template>

<script lang="ts">
import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

export default defineComponent({
  name: 'LoginForm',
  setup() {
    const email = ref('')
    const password = ref('')
    const error = ref('')
    const loading = ref(false)
    const router = useRouter()
    const authStore = useAuthStore()

    const { mutate: login } = useMutation(gql`
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password)
      }
    `)

    async function handleSubmit() {
      try {
        loading.value = true
        error.value = ''

        const result = await login({
          email: email.value,
          password: password.value,
        })

        if (result?.data?.login) {
          authStore.setToken(result.data.login)
          router.push('/')
        }
      } catch (e: Error | unknown) {
        error.value = e instanceof Error ? e.message : 'Failed to login'
      } finally {
        loading.value = false
      }
    }

    return {
      email,
      password,
      error,
      loading,
      handleSubmit,
    }
  },
})
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error {
  color: #dc3545;
  margin-top: 1rem;
  text-align: center;
}
</style>
