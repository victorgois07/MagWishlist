import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const user = ref<any | null>(null)

  function setToken(newToken: string | null) {
    token.value = newToken
  }

  function setUser(newUser: any | null) {
    user.value = newUser
  }

  function logout() {
    token.value = null
    user.value = null
  }

  return {
    token,
    user,
    setToken,
    setUser,
    logout,
  }
})
