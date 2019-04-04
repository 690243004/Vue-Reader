<template>
<div class="app-container">
	

	<keep-alive>
		<transition>
		<router-view v-if="$route.meta.keepAlive"></router-view>
		</transition>
	</keep-alive>
	<transition>
	<router-view v-if="!$route.meta.keepAlive"></router-view></transition>
	<Head  v-if="$route.meta.showNav"></Head>
</div>
</template>

<script>
import mixins from "@u/mixins.js"
import Head from '@c/head/Head.vue'
export default {
	data(){return {
	}},
	components:{
		Head
	},
	mixins:[mixins]
}
</script>

<style lang="scss" scoped>
@import './assets/styles/global';
.app-container {
}
</style>