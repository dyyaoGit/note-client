import Vue from 'vue'
import Router from 'vue-router'
import index from '../views/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/content/:id',
      name: 'content',
      component: () => import('../views/content.vue')
    },
    {
      path: '/region',
      component: () => import('../views/region.vue')
    },
    {
      path: '/writenote',
      component: () => import('../views/writeNote.vue')
    },
    {
      path: '/search',
      component: () => import ('../views/search.vue')
    }
  ]
})
