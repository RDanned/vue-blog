<template>
  <div class="row pt-4">
    <PostPreview :post="post" v-for="post in posts" :key="post.id"/>
  </div>
</template>

<script lang="ts" setup>
import {computed, ref, onMounted, onUnmounted} from 'vue'
import PostPreview from '@/components/PostPreview.vue'
import {usePostsStore} from '@/store/posts'

const postStore = usePostsStore()

const posts = ref([])
const page = ref(1)
const loading = ref(false)
const perPage = 10

function loadMorePosts() {
  loading.value = true
  setTimeout(() => {
    const newPosts = postStore.getPostsByPage(page.value, perPage)

    posts.value.push(...newPosts)
    loading.value = false
    page.value++
  }, 300)
}

function isBottomVisible() {
  const scrollY = window.scrollY
  const visible = document.documentElement.clientHeight
  const pageHeight = document.documentElement.scrollHeight
  const bottomOfPage = visible + scrollY >= pageHeight
  return bottomOfPage || pageHeight < visible
}

function handleScroll() {
  if (isBottomVisible() && !loading.value) {
    loadMorePosts()
  }
}

onMounted(() => {
  loadMorePosts()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>