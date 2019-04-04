import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex) 
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import bookMod from './modules/book.js'

// 导出store对象
export default new Vuex.Store({
    getters,
    actions,
    modules:{
        bookMod:bookMod
    },
    state:{
    },
    mutations
})