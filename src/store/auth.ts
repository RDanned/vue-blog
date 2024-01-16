import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
  }),
  actions: {
    login(username: string, password: string) {
      if (username === 'admin' && password === 'password') {
        this.isAuthenticated = true
        return true
      } else {
        return false
      }
    }
  }
})