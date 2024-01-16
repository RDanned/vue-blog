import {defineStore} from 'pinia'
import {faker} from '@faker-js/faker'
import {getSlug} from '@/utils/postUtils'

let defaultPosts: Post[] = []

for (let i = 0; i < 30; i++) {
  const title = faker.lorem.sentence(7)
  const slug = getSlug(title)
  defaultPosts.push({
    id: i,
    title: title,
    slug: slug,
    description: faker.lorem.sentences(5),
    content: faker.lorem.sentences(20),
  })
}

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [...defaultPosts]
  }),

  getters: {
    getPosts: (state) => (): Post[] => {
      return state.posts
    },
    getPostsByPage: (state) => (page: number, perPage: number): Post[] => {
      const start = (page - 1) * perPage
      const end = start + perPage
      return state.posts.slice(start, end)
    },
    getPostById: (state) => (id: number): Post | undefined => {
      return state.posts.find(post => post.id === id)
    },
    getPostBySlug: (state) => (slug: string): Post | undefined => {
      return state.posts.find(post => post.slug === slug)
    }
  },

  actions: {
    createPost(post: Post) {
      this.posts.push(post)
    },
    editPost(updatedPost: Post) {
      const index = this.posts.findIndex(post => post.id === updatedPost.id)
      if (index !== -1)
        this.posts[index] = updatedPost
    },
    deletePost(id: number) {
      this.posts = this.posts.filter(post => post.id !== id)
    },
  },
});
