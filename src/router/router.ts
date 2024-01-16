import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import {useAuthStore} from '@/store/auth'

import AdminLayout from '@/layout/AdminLayout.vue'
import BlogLayout from '@/layout/BlogLayout.vue'
import NotFound from '@/pages/NotFound.vue'
import Home from '@/pages/Home.vue'
import Dashboard from '@/pages/admin/Dashboard.vue'
import PostList from '@/pages/admin/posts/PostList.vue'
import PostCreate from '@/pages/admin/posts/PostCreate.vue'
import PostEdit from '@/pages/admin/posts/PostEdit.vue'
import AdminLogin from '@/pages/admin/AdminLogin.vue'

const routes: RouteRecordRaw[] = [
  {path: '/:pathMatch(.*)*', alias: '/404', name: 'NotFound', component: NotFound},
  {
    path: '/',
    component: BlogLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home,
      },
      {
        path: '/:slug',
        name: 'post.detail',
        component: () => import('@/pages/PostDetail.vue')
      }
    ]
  },
  {
    path: '/admin/login',
    name: 'admin.login',
    component: AdminLogin
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminLayout,
    meta: {needAuth: true},
    children: [
      {
        path: '',
        name: 'admin.dashboard',
        component: Dashboard
      },
      {
        path: 'posts',
        name: 'admin.posts',
        children: [
          {
            path: '',
            name: 'admin.posts.list',
            component: PostList
          },
          {
            path: 'create',
            name: 'admin.posts.create',
            component: PostCreate
          },
          {
            path: ':id/',
            name: 'admin.posts.edit',
            component: PostEdit
          }
        ]
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  console.log(authStore.isAuthenticated)
  if (to.matched.some(record => record.meta.needAuth) && !authStore.isAuthenticated) {
    next({ name: 'admin.login' })
  } else {
    next()
  }
})

export default router