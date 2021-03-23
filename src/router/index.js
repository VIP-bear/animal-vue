import Vue from 'vue'
import Router from 'vue-router'
import LoginRegistor from '@/pages/LoginRegistor'
import Login from '@/pages/Login.vue'
import Registor from '@/pages/Registor.vue'
import Home from '@/pages/Home.vue'
import ArtWork from '@/pages/ArtWork.vue'

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
      path: '/artworks/*',
      name: 'ArtWork',
      component: ArtWork
    }
  ]
})
