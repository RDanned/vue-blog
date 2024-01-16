<template>
  <div v-if="isVisible" class="modal-backdrop">
    <div class="modal-content">
      <h4>Confirm Deletion</h4>
      <p>Are you sure you want to delete this post?</p>
      <div class="modal-actions">
        <button @click="confirmDeletion" class="btn btn-danger">Delete</button>
        <button @click="cancel" class="btn btn-secondary">Cancel</button>
      </div>
    </div>

  </div>
</template>

<script setup>
import {ref, defineEmits} from 'vue'

const props = defineProps({
  postToDelete: Object
})

const emits = defineEmits(['confirm', 'cancel'])

const isVisible = ref(true)

const confirmDeletion = () => {
  emits('confirm', props.postToDelete)
  isVisible.value = false
}

const cancel = () => {
  emits('cancel')
  isVisible.value = false
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  max-width: 350px;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 15px;
}
</style>