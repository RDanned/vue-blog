<template>
  <div class="container-fluid admin">
    <div class="row">
      <AdminMenu/>
      <div class="col-md-9 admin-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AdminMenu from '@/components/admin/AdminMenu.vue'
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
}

#app {
  height: 100%;
}

.container-fluid, .row {
  height: 100%;
}

.col-md-3, .col-md-9 {
  height: 100%;
}

.admin-content {
  padding: 50px;
}
</style>