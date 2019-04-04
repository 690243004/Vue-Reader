import Vue from 'vue'

import app from './app.vue'
//导入全局变量设置组件vuex 已经
import Vuex from 'vuex'
//导入路由模块
import VueRouter from 'vue-router'
import router from './router.js'
// 2.1 导入 vue-resource
import VueResource from 'vue-resource'
// 导入store
import store from './store/index.js'

import './assets/styles/global.scss'
import 'mint-ui/lib/style.css'
// import './assets/styles/icon.css'



import { Search } from 'mint-ui';
import { Swipe, SwipeItem } from 'mint-ui';
import { Field } from 'mint-ui';
import { Button } from 'mint-ui';
import { InfiniteScroll } from 'mint-ui';

Vue.use(InfiniteScroll);
Vue.component(Button.name, Button);
Vue.component(Field.name, Field);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Search.name, Search);

Vue.use(VueResource)
// 设置请求的根路径
Vue.http.options.root = '';
// 全局设置 post 时候表单数据格式组织形式   application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;
Vue.use(Vuex)
//给app配置路由模块
Vue.use(VueRouter)
//定义拦截器
/*Vue.http.interceptors.push((req,next)=>{
	Indicator.open('加载中...');
	next(res=>{
		Indicator.close();
		return res;
	})
})*/

//定义过滤器
Vue.filter('shortInfoFormat',function(data,args){ 
	if(data.length>45){
		return data.substring(0,45)+"..."; 
	}
	return data;
})

var vm  = new Vue({
	el:'#app',
	render:c=>c(app),
	methods:{
	},
	store,
	router
})



