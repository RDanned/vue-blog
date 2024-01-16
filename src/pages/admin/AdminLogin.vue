<template>
  <div class="container d-flex justify-content-center align-items-center" style="height: 100vh;">
    <div class="row">
      <div class="col-12 d-flex align-items-center">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title text-center mb-4">Admin Login</h2>
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" id="username" class="form-control" v-model="username" placeholder="Enter username">
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" id="password" class="form-control" v-model="password"
                       placeholder="Enter password">
              </div>
              <div class="d-grid">
                <button type="submit" class="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
        <AlertMessage
            :message="'Invalid credentials'"
            :type="'error'"
            :visible="showAlert"/>
      </div>
    </div>
  </div>
</template>


<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {useAuthStore} from '@/store/auth'
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
    setTimeout(() => {
      showAlert.value = false
    }, 1500)
  }
}
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
}

.card-title {
  font-weight: bold;
}
</style>
