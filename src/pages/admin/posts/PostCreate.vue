<template>
  <div class="post-create-container">
    <h1>Create New Post</h1>
    <form @submit.prevent="createNewPost">
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
      <button type="submit" class="btn btn-primary">Create Post</button>
    </form>

    <AlertMessage
        :message="'Post was created successfully.'"
        :type="'success'"
        :visible="showAlert"/>
  </div>
</template>

<script lang="ts" setup>
import {ref, watch} from 'vue'
import {useRouter} from 'vue-router'
import {usePostsStore} from '@/store/posts'
import {getSlug} from '@/utils/postUtils'
import AlertMessage from '@/components/admin/AlertMessage.vue'

const postsStore = usePostsStore()
const router = useRouter()

const post = ref<Post>({
  id: Date.now(),
  title: '',
  slug: '',
  description: '',
  content: ''
})

const showAlert = ref(false)

watch(() => post.value.title, (newTitle) => {
  post.value.slug = getSlug(post.value.title)
})

function createNewPost() {
  postsStore.createPost(post.value)
  post.value = {id: Date.now(), title: '', slug: '', description: '', content: ''}
  showAlert.value = true

  setTimeout(() => {
    showAlert.value = false
  }, 1500)
}
</script>