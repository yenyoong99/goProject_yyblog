import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from '../views/dashboard/layout.vue'
import { state } from '@/stores/index'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'LoginView',
      component: () => import('../views/users/LoginView.vue')
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardLayout,
      children: [
        {
          path: 'posts/list',
          name: 'PostsList',
          component: () => import('../views/dashboard/posts/ListView.vue')
        },
        // {
        //   path: 'posts/detail/:id',
        //   name: 'PostsDetails',
        //   component: () => import('../views/dashboard/posts/DetailView.vue')
        // },
        // {
        //   path: 'posts/edit',
        //   name: 'PostsEdit',
        //   component: () => import('../views/dashboard/posts/EditView.vue')
        // },
        // {
        //   path: 'comments/list',
        //   name: 'CommentsList',
        //   component: () => import('../views/dashboard/comments/ListView.vue')
        // }
      ]
    },

  ]
})

router.beforeEach((to) => {
  // access dashboard
  if (to.fullPath.startsWith('/dashboard/')) {
    // check login state
    if (!state.value.isLogin) {
      // redirect to login page
      return { name: 'LoginView' }
    }
  }
})

export default router
