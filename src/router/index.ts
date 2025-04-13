import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ConvertView from '../views/ConvertView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/convert',
      name: 'convert',
      component: ConvertView
    }
  ]
})

// Глобальный навигационный guard
router.beforeEach((to, from, next) => {
  document.title = to.meta.title as string || 'Конвертор валют'
  next()
})

export default router
