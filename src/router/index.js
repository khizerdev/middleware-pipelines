import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Account from '../views/Account.vue'
import Dashboard from '../views/Dashboard.vue'
import auth from '@/middleware/auth'
import subscribed from '@/middleware/subscribed'
import middlewarePipeline from './middlewarePipeline'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/account',
    name: 'account',
    component: Account,
    meta: {
      middleware:[auth]
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      middleware:[auth,subscribed]
    }
  },
 
]



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next) => {
  if (!to.meta.middleware) {
    return next()
  }

  const middleware = to.meta.middleware

  const context = {
    to,
    from,
    next
  }

  return middleware[0]({
    ...context,
    next:middlewarePipeline(context, middleware, 1)
  })


})

export default router
