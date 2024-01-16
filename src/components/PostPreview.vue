<template>
  <div class="row">
    <div class="col-12">
      <router-link :to="`/${post.slug}`"><h2>{{ post.title }}</h2></router-link>
    </div>
    <div class="col-12">
      <p>{{ post.description }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{post: Post}>()
</script>