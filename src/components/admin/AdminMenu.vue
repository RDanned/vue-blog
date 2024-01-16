<template>
  <div class="col-md-3 bg-light">
    <ul class="nav flex-column">
      <li class="nav-item" v-for="item in menuItems" :key="item.name">
        <router-link :to="item.path" class="nav-link">{{ item.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'

const menuItems = ref([
  {name: 'Back to front site', path: '/'},
  {name: 'Dashboard', path: '/admin/'},
  {name: 'Posts', path: '/admin/posts/'},
])
</script>