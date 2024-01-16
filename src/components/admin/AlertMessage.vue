<template>
  <div v-if="visible" :class="['alert', 'alert-' + type]">
    {{ message }}
  </div>
</template>

<script lang="ts" setup>
defineProps<{ message: string, visible: boolean, type: 'success' | 'error' }>()
</script>

<style scoped>
.alert {
  padding: 10px;
  color: white;
  margin-bottom: 15px;

  position: fixed;
  right: 50px;
  top: 25px;
}

.alert-success {
  background-color: #4CAF50;
}

.alert-error {
  background-color: #f44336;
}
</style>