import Vue from 'vue'
import Router from 'vue-router'
import LoginRegistor from '@/pages/LoginRegistor'
import Login from '@/pages/Login.vue'
import Registor from '@/pages/Registor.vue'
import Home from '@/pages/Home.vue'
import ArtWork from '@/pages/ArtWork.vue'
import User from '@/pages/User.vue'
import Following from '@/pages/Following.vue'

Vue.use(Router)

export default new Router({
  /** 去除路径中的# */
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'LoginRegistor',
      component: LoginRegistor
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/registor',
      name: 'Registor',
      component: Registor
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/artworks/:id',
      name: 'ArtWork',
      component: ArtWork
    },
    {
      path: '/users/:id',
      name: 'User',
      component: User
    },
    {
      path: '/users/:id/following',
      name: 'Following',
      component: Following
    }
  ]
})
