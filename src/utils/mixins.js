
import { mapGetters, mapActions } from 'vuex'
import request from '@u/request'
export default {
  computed: {
    ...mapGetters([
      'count', 'recList', 'maleList', 'femaleList',
      'url', 'currentBook', 'bookChapters', 'bookId',
      'menuVisible', 'settingVisible', 'defaultFontSize',
      'fontSizeList', 'defaultFontFamily', 'themeList',
      'defaultTheme', 'fontFamilyVisible', 'fontFamilyList',
      'book', 'num', 'bookAvailable', 'defaultProgress','review',
      'sortList','sortDescList','majorAndMinor','rank','user'
    ])
  },
  methods: {
    ...mapActions([
      // 'updateModel'
      // 根据章节数获取书籍内容

    ]),
    // 更新状态机
    async updateModel(name, value) {
      return this.$store.dispatch("updateModel", { name, value });
    },
    goBack() {
      this.$router.go(-1)
    },
    hideTitleAndMenu() {
      this.$store.dispatch("updateModel", {
        name: "menuVisible",
        value: false
      });
      this.$store.dispatch("updateModel", {
        name: "settingVisible",
        value: -1
      });
      this.$store.dispatch("updateModel", {
        name: "fontFamilyVisible",
        value: false
      });
    },
    // 根据章节数获取书籍内容
    async bookNextAsnc(num) {
      // 进行url的编码
      let link = window.encodeURIComponent(this.bookChapters[num].link)
      request.get("chapters/" + link).then(res => {
        // 设置状态机
        this.updateModel('book',res.data)
        this.updateModel('num',num)
        this.updateModel('defaultProgress',Math.ceil(num/this.bookChapters.length*100))
      })
    },
  },
}