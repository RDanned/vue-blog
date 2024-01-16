<template>
  <div class="container d-flex justify-content-center align-items-center" style="height: 100vh;">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" id="username" class="form-control" v-model="username">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" id="password" class="form-control" v-model="password">
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  </div>
  <AlertMessage
      :message="'Invalid credentials'"
      :type="'error'"
      :visible="showAlert"/>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import AlertMessage from '@/components/admin/AlertMessage.vue'

const authStore = useAuthStore()
const router = useRouter()

const username = ref('')
const password = ref('')
const showAlert = ref(false)

const handleLogin = () => {
  if (authStore.login(username.value, password.value)) {
    showAlert.value = false
    router.push('/admin')
  } else {
    showAlert.value = true
  }
}
</script>

<style scoped>

</style>