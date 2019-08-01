import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/HomePage.vue'
import { Script } from 'vm';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: false }
    },
    {
      path: '/article/:find',
      props : true,
      name: 'article',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/articlePage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/test',
      name: 'test',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/testPage.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/profile',
      name: 'profile',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Profile.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/admin',
      name: 'admin',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/admin.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/imageupload',
      name: 'imageupload',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/ImageUpload.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/addcontent',
      name: 'addcontent',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/AddContent.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/addcontent/:searchWord',
      props:true,
      name: 'addcontent',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/AddContent.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/follow',
      name: 'follow',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Follow.vue'),
      meta: { requiresAuth: true }
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (sessionStorage.getItem('userInfo')) {
      return next()
    } else {
      return next('/')
    }
  } else {
    // 필요하지 않은 경우는 home이거나 testpage
    if (to.name == 'home' && sessionStorage.getItem('userInfo')) {
      return next('/article')
    }
    return next()
  }
})


export default router