<template>
  <h1>
    {{ post.title }}
  </h1>
  <div class="post-content" v-html="post.content">

  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {usePostsStore} from '@/store/posts'

const route = useRoute()
const router = useRouter()
const postsStore = usePostsStore()

const post = ref<Post>({
  id: null,
  title: '',
  slug: '',
  content: ''
})

onMounted(async () => {
  const postSlug = route.params.slug
  const postData = postsStore.getPostBySlug(postSlug)
  if (postData) {
    post.value = {...postData}
  } else {
    router.push('/404')
  }
})

</script>