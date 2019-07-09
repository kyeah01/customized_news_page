import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
		{
			path: '/',
			name: 'home',
			component: ()=> import( './views/HomePage.vue' )
		},
		{
			path: '/mypage',
			name: 'mypage',
      component: ()=> import( './views/mypage.vue' )
		},
    {
      path: '/admin',
      name: 'admin',
      component: ()=> import( './views/adminPage.vue' )
    },
    {
      path: '/article',
      name: 'article',
      component: ()=> import( './views/articlePage.vue' )
    },
    {
      path: '/test',
      name: 'test',
      component: ()=> import( './views/testPage.vue' )
    }
  ]
})
