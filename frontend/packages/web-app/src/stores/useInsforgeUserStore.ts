import type { InsForgeUser } from '@rpa/components/auth'
import { signInWithPassword, signOut, getCurrentUser } from '@rpa/components/auth'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useInsforgeUserStore = defineStore('insforgeUser', () => {
  const currentUser = ref<InsForgeUser | null>(null)
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  const isAuthenticated = computed(() => !!currentUser.value)

  async function login(email: string, password: string) {
    isLoading.value = true
    error.value = null
    try {
      const { user } = await signInWithPassword({ email, password })
      currentUser.value = user
      return user
    }
    catch (e) {
      error.value = e instanceof Error ? e : new Error(String(e))
      throw error.value
    }
    finally {
      isLoading.value = false
    }
  }

  async function fetchUser() {
    isLoading.value = true
    error.value = null
    try {
      const user = await getCurrentUser()
      currentUser.value = user
      return user
    }
    catch (e) {
      error.value = e instanceof Error ? e : new Error(String(e))
      currentUser.value = null
      throw error.value
    }
    finally {
      isLoading.value = false
    }
  }

  async function logout() {
    isLoading.value = true
    try {
      await signOut()
    }
    finally {
      currentUser.value = null
      isLoading.value = false
    }
  }

  return {
    currentUser,
    isLoading,
    error,
    isAuthenticated,
    login,
    fetchUser,
    logout,
  }
})
