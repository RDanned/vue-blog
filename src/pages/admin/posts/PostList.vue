<template>
  <div class="post-table-container">
    <h1>Posts</h1>
    <button @click="createPost()" class="btn btn-success">+ Add new post</button>
    <table class="table post-table">
      <thead>
      <tr>
        <th class="post-column__id">#</th>
        <th class="post-column__title">Title</th>
        <th class="post-column__actions">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="post in paginatedPosts" :key="post.id">
        <td class="post-column__id">{{ post.id }}</td>
        <td class="post-column__title">{{ post.title }}</td>
        <td class="post-column__actions">
          <button @click="editPost(post.id)" class="btn btn-primary">Edit</button>
          <button @click="requestDeletePost(post)" class="btn btn-danger">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>

    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item" v-for="n in totalPages" :key="n">
          <button class="page-link" @click="currentPage = n">{{ n }}</button>
        </li>
      </ul>
    </nav>

    <PostDeleteConfirmationModal
        v-if="showDeleteModal"
        :postToDelete="selectedPostToDelete"
        @confirm="deletePost"
        @cancel="cancelDelete"
    />
  </div>
</template>

<script lang="ts" setup>
import {computed, ref} from 'vue'
import {useRouter} from 'vue-router'
import {usePostsStore} from '@/store/posts'
import PostDeleteConfirmationModal from '@/components/Admin/PostDeleteConfirmationModal.vue'

const router = useRouter()
const postsStore = usePostsStore()
const posts = computed(() => postsStore.posts)

const currentPage = ref(1)
const showDeleteModal = ref(false)
const selectedPostToDelete = ref(null)
const pageSize = 10

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return posts.value.slice(start, end)
})

const requestDeletePost = (post: Post) => {
  selectedPostToDelete.value = post
  showDeleteModal.value = true
}

const totalPages = computed(() => Math.ceil(posts.value.length / pageSize))

const deletePost = (post: Post) => {
  postsStore.deletePost(post.id)
  showDeleteModal.value = false
}

const createPost = () => {
  router.push({name: 'admin.posts.create'})
}

const cancelDelete = () => {
  showDeleteModal.value = false
}

function editPost(id: number) {
  router.push({name: 'admin.posts.edit', params: {id}})
}
</script>


<style scoped>
.post-table-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.post-column__id {
  width: 5%;
}

.post-column__actions {
  width: 15%;
}

.post-column__actions .btn {
  margin-right: 15px;
}
</style>