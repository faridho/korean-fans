import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Create from '@/views/Create'
import Detail from '@/views/Detail'
import Profile from '@/views/Profile'
import Settings from '@/views/Settings'
import Update from '@/views/Update'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/create',
    name: 'Create',
    component: Create
  },
  {
    path: '/update/:id',
    name: 'Update',
    component: Update
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/profile/:username',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/settings/:username',
    name: 'Settings',
    component: Settings
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
