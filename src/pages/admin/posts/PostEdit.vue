<template>
  <div class="post-edit-container">
    <h1>Edit Post</h1>
    <form @submit.prevent="updatePost">
      <div class="mb-3">
        <label for="id" class="form-label">ID</label>
        <input type="text" id="id" class="form-control" v-model="post.id" disabled>
      </div>
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input type="text" id="title" class="form-control" v-model="post.title" required>
      </div>
      <div class="mb-3">
        <label for="slug" class="form-label">Slug</label>
        <input type="text" id="slug" class="form-control" v-model="post.slug" required>
      </div>
      <div class="mb-3">
        <label for="content" class="form-label">Description</label>
        <textarea id="content" class="form-control" v-model="post.description" required></textarea>
      </div>
      <div class="mb-3">
        <label for="content" class="form-label">Content</label>
        <textarea id="content" class="form-control" v-model="post.content" required></textarea>
      </div>
      <button @click="router.back()"
              type="button"
              class="btn btn-secondary me-2"
      >Back to list
      </button>
      <button type="submit" class="btn btn-primary">Update Post</button>
    </form>
  </div>

  <AlertMessage
      :message="'Post was updated successfully.'"
      :type="'success'"
      :visible="showAlert"/>
</template>

<script lang="ts" setup>
import {ref, onMounted} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {usePostsStore} from '@/store/posts'
import AlertMessage from '@/components/admin/AlertMessage.vue'

const route = useRoute()
const router = useRouter()
const postsStore = usePostsStore()

const post = ref<Post>({
  id: null,
  title: '',
  slug: '',
  description: '',
  content: ''
})

const showAlert = ref(false)

onMounted(async () => {
  const postId = Number(route.params.id)
  const postData = postsStore.getPostById(postId)
  if (postData) {
    post.value = {...postData}
  } else {
    router.push('/admin/posts')
  }
})

function updatePost() {
  postsStore.editPost(post.value)
  showAlert.value = true
  setTimeout(() => {
    showAlert.value = false
  }, 1500)
}
</script>
