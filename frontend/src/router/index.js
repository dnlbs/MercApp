import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/product/:id', name: 'product', component: () => import('../views/ProductView.vue') },
  { path: '/cart', name: 'cart', component: () => import('../views/CartView.vue') },
  { path: '/about', name: 'about', component: () => import('../views/AboutView.vue') },
  { path: '/new', name: 'new', component: () => import('../views/ProductFormView.vue') },
  { path: '/edit/:id', name: 'edit', component: () => import('../views/ProductFormView.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router