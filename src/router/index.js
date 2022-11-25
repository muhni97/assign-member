import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Members from '../views/Member/Members.vue'
import CategoryEdit from '../views/Category/CategoryEdit.vue'
import MemberEdit from '../views/Member/MemberEdit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/home/:id',
      name: 'categoryEdit',
      component: CategoryEdit
    },
    {
      path: '/categories/:id',
      name: 'memberEdit',
      component: MemberEdit
    },
    {
      path: "/:catchAll(.*)",
      component: HomeView,
    },
  ]
})

export default router
