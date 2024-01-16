<template>
  <div class="content-container container">
    <div class="row">
      <div class="log-in">
        <router-link v-if="!authStore.isAuthenticated" to="/admin/login">
          Log in
        </router-link>
        <router-link v-if="authStore.isAuthenticated" to="/admin">
          Admin
        </router-link>
      </div>
    </div>
    <div class="row">
      <router-link to="/">
        <div class="logo">Another blog</div>
      </router-link>
    </div>
    <div class="row">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/store/auth'
const authStore = useAuthStore()
</script>

<style scoped>
.content-container {
  max-width: 672px;
  box-shadow: 0px 10px 6px -3px rgba(0,0,0,0.75);
}

.logo {
  font-size: 48px;
  font-weight: bold;
}

.log-in {
  text-align: right;
}
</style>