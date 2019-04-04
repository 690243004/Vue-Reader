import VueRouter from 'vue-router'
import Home from '@v/home/Home.vue'
import BookInfo from '@v/info/BookInfo.vue'
import Book from '@v/book/Book.vue'
import Sort from '@v/sort/Sort.vue'
import SortDesc from '@v/sort/SortDesc.vue'
import Rank from '@v/rank/Rank.vue'
import Login from '@v/login/Login.vue'
import Register from '@v/login/Register.vue'
import Listen from '@v/listen/Listen.vue'
import Collect from '@v/collect/Collect.vue'
import User from '@v/user/User.vue'
import Comment from '@v/comment/Comment.vue'
var router = new VueRouter({
	routes:[
		// 首页路由
		{path:'/',redirect:'/home'},
		{path:'/home',component: Home,meta:{
			showNav:true,
			keepAlive:true
		}},
		{path:'/sort',component: Sort,meta:{
			showNav:true,
			keepAlive:true
		}},
		{path:'/info/:id',component: BookInfo,meta:{
			keepAlive:true
		}},
		//	阅读页路由
		{path:'/book',component: Book,meta:{
			keepAlive:true
		}},
		//	我的路由
		{path:'/user',component: User,meta:{
			showNav:true,
			keepAlive:true
		}},
		//	阅读页路由重载
		{path:'/book/:num',component: Book},
		//分类详情页路由
		{path:'/sortDescription/:major/',
		component: SortDesc},

		{path:'/sortDescription/:major/:minor',
		component: SortDesc},
		{path:'/rank',component: Rank,meta:{
			showNav:true,
			keepAlive:true
		}},
		{path:'/login',component: Login},
		{path:'/register',component: Register},
		{path:'/listen',component: Listen},
		{path:'/collect',component: Collect},
		{path:'/comment',component: Comment},
	],
	linkActiveClass:'tabber-active' //覆盖默认路由高亮的类
})

export default router

