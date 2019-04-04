// 导出store对象
import request from '@u/request'
import { FONT_SIZE, FONT_FAMILY, THEMELIST } from '@u/book.js' 
import axios from 'axios'
import { cloneDeep } from 'lodash'

const USER = {
    avatar:"../../assets/icon_hrwvcko172r/touxiang.png",
    username:'',
    status:-1   // -1代表未登录 0代表已经登录 
}
export default {
    state : {
        user: cloneDeep(USER),
        count: 0,
        recList:[],
        maleList:[],
        femaleList:[],
        url: 'http://statics.zhuishushenqi.com',
        currentBook:{},
        // 当前书籍章节 
        bookChapters:[],
        bookId:"",
        // 当前阅读章节及其内容
        book:{
            chapter : {}
        },
        // 当前书籍章节数
        num:0,
        // 书籍分类list
        sortList : [],
        // 根据分类获得的书籍list
        sortDescList:[],
        // 当前选择的major及其子对象minor
        majorAndMinor:{},
        // 书籍排行信息
        rank:{},
        // 书籍评论
        review:[],
        fontSizeList:FONT_SIZE,
        menuVisible:false,
        defaultFontSize:16,
        defaultFontFamily:"Default",
        defaultTheme: 'default',
        fontFamilyVisible:false,
        fontFamilyList:FONT_FAMILY,
        themeList:THEMELIST,
        // 获取了章节既为true
        bookAvailable:false,
        // 默认进度条
        defaultProgress :0,
        settingVisible:-1, // -1不显示 0字号 1主题 2进度条 3 目录,
    },
    mutations: {
        updateModel (state,payload) {
          state[payload.name] = payload.value 
        },
        SET_STATE(state,payload){
            console.log(payload)
            state[payload.name] = payload.value
        }
    },
    getters:{
        count(state){
            return state.count
        },
        recList(state) {
            return state.recList
        },
        maleList(state) {
            return state.maleList
        },
        femaleList(state) {
            return state.femaleList
        },
        url(state) {
            return state.url
        },
        currentBook(state) {
            return state.currentBook
        },
        bookChapters(state) {
            return state.bookChapters
        },
        bookId(state) {
            return state.bookId
        },
        menuVisible(state) {
            return state.menuVisible
        },
        settingVisible(state) {
            return state.settingVisible
        },
        fontSizeList(state) {
            return state.fontSizeList
        },
        defaultFontSize(state) {
            return state.defaultFontSize
        },
        defaultFontFamily(state) {
            return state.defaultFontFamily
        },
        defaultTheme(state) {
            return state.defaultTheme
        },
        themeList(state) {
            return state.themeList
        },
        fontFamilyVisible(state) {
            return state.fontFamilyVisible
        },
        fontFamilyList(state) {
            return state.fontFamilyList
        },
        book(state) {
            return state.book
        },
        num(state) {
            return state.num
        },
        bookAvailable(state) {
            return state.bookAvailable
        },
        defaultProgress(state) {
            return state.defaultProgress
        },
        sortList(state) {
            return state.sortList
        },
        sortDescList(state) {
            return state.sortDescList
        },
        majorAndMinor(state) {
            return state.majorAndMinor
        },
        rank(state) {
            return state.rank
        },
        user(state) {
            return state.user
        },
        review(state) {
            return state.review
        },
    },
    actions: {
        recomandListAsnc({commit}){
            request.get("recommend/53115e30173bfacb4904897e").then(response=>{
                let obj = {name:'recList',value:response.data.books}
                commit('SET_STATE',obj)
               
            })
        },
        maleListAsnc({commit}){
            request.get("category-info?gender=male&type=hot&major=%E7%8E%84%E5%B9%BB&start=0&limit=50").then(response=>{
                commit('SET_STATE',{name:'maleList',value:response.data.books})
            })
        },
        feMaleListAsnc({commit}){
            request.get("category-info?gender=female&type=hot&major=古代言情&start=0&limit=10").then(response=>{
                commit('SET_STATE',{name:'femaleList',value:response.data.books.slice(0,6)})
            })
        },
        // 获取书籍详情接口
		async getBookInfo({commit},payload){
			await request.get('book-info/'+payload).then(response=>{
                commit('SET_STATE',{name:'currentBook',value:response.data})
			})
        },
        // 获取书籍章节
		async getBookChapters({commit},payload){
			request.get('book-sources?view=summary&book='+payload).then(res=>{
                //根据书籍源id 获取书籍章节
                commit('SET_STATE',{name:'bookId',value:res.data[0]._id})
				request.get('book-chapters/'+res.data[0]._id).then(res=>{
                    commit('SET_STATE',{name:'bookChapters',value:res.data.chapters})
                    commit('SET_STATE',{name:'bookAvailable',value:true})
					//截取数组前100条
				})
			})
        },
        async updateModel({ commit, state }, payload) {
            // 从状态机中取出num 
            let { name, value } = payload
            // 进行url的编码
            commit("SET_STATE", { name, value })
        },

        // 根据章节数获取书籍内容
        async bookNextAsnc({ commit, state }, payload = {}) {
            let num = payload.num 
            // 更新状态机
            // 取出chapters 
            let { bookChapters = [] } = state
            // 进行url的编码
            let link = window.encodeURIComponent(bookChapters[num].link)
            request.get("chapters/" + link).then(res => {
                // 设置状态机
                commit("SET_STATE", { name:'book', value:res.data })
                commit("SET_STATE", { name:'num', value:num })
            })
        },
        // 获取分类列表
        async getSortList({ commit, state }, payload) {
			request.get("sub-categories").then(res => {
                let { male=[], female=[] } = res.data;
                let _arr = male.concat(female)
                commit("SET_STATE", { name:'sortList', value:_arr })
			});
        },
        // 根据分类获取书籍列表
        async getSortListByMajor({ commit, state }, payload) {
            let { major='',minor='' } = payload
            request.get(`category-info?gender=male&type=hot&major=${major}&minor=${minor}&start=0&limit=20`).then(res => 
                {
                    console.log("sortDescList",res.data)
                    commit("SET_STATE", { name:'sortDescList', value:res.data.books })
                }
            );
        },
        // 获得排行列表
        async rankingsAsnc({commit}){
            await request.get("rank/54d42d92321052167dfb75e3").then(res=>{
                commit('SET_STATE',{name:"rank",value:res.data.ranking})
            })
        },
        // 
        async getShortReview({commit,state},payload) {
            let params = {
                book: state.bookId,
                sortType: "updated",
                start:0,
                limit:20
            }
            /* await axios.get(`http://api.zhuishushenqi.com/post/review/by-book?book=${state.bookId}&sort=updated&start=0&limit=20`).then(res=>{
                console.log(res.data,"res")
            },(err)=>{
                console.log(err,'草泥马比')
            }) */
        },
    }
}