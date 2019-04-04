<template>
  <div class="book">
    <Scroll>
      <div ref="content" @click="toggleTitleAndMenu()" class="book-content-wrapper">
        {{book.chapter.title}} <br/>
        {{book.chapter.cpContent}}
      </div>
    </Scroll>
    <EbookMenu/>
    <EbookSettingFont/>
    <EbookSettingTheme/>
    <EbookSettingFontPopup/>
    <EbookSlide/>
    <EbookProgress/>
    <EbookTitle/>
  </div>
</template>

<script>
import mixins from "@u/mixins.js";
import Scroll from "@c/common/Scroll.vue";
import EbookMenu from "@c/book/EbookMenu.vue";
import EbookSettingFont from "@c/book/EbookSettingFont.vue";
import EbookSettingTheme from "@c/book/EbookSettingTheme.vue";
import EbookSettingFontPopup from "@c/book/EbookSettingFontPopup.vue";
import EbookSlide from "@c/book/EbookSlide.vue";
import EbookProgress from "@c/book/EbookProgress.vue";
import EbookTitle from "@c/book/EbookTitle.vue";
import { realPx } from "@u/utils";
export default {
  data() {
    return {};
  },
  components: {
    Scroll,
    EbookMenu,
    EbookSettingFont,
    EbookSettingTheme,
    EbookSettingFontPopup,
    EbookSlide,
    EbookProgress,
    EbookTitle
  },
  watch: {
    defaultFontSize(v) {
      console.log(v, this.$refs);
      this.$refs.content.style.fontSize = v + "px";
    },
    defaultTheme(v) {
      let { color = "", background = "" } = this.themeList.find(item => {
        if (item.name === v) {
          return item;
        }
      }).style.body;
      this.$refs.content.style.color = color;
      this.$refs.content.style.background = background;
    },
    defaultFontFamily(v) {
      this.$refs.content.style.fontFamily =
        this.defaultFontFamily === "default" ? "" : this.defaultFontFamily;
    }
  },
  methods: {
    toggleTitleAndMenu() {
      this.updateModel("menuVisible", this.menuVisible ? false : true);
    },
    initBook() {
      // 初始化字体
      this.$refs.content.style.fontSize = this.defaultFontSize + "px";
      this.$refs.content.style.lineHeight =
        parseInt(this.defaultFontSize) + 15 + "px";
      // 初始化主题
      let { color = "", background = "" } = this.themeList.find(item => {
        if (item.name === this.defaultTheme) {
          return item;
        }
      }).style.body;
      this.$refs.content.style.color = color;
      this.$refs.content.style.background = background;
      this.$refs.content.style.fontFamily =
        this.defaultFontFamily === "default" ? "" : this.defaultFontFamily;
    }
  },
  mounted() {
      this.initBook()
      let {num= 0 } = this.$route.params
      this.$store.dispatch("bookNextAsnc",{num})
  },
  mixins: [mixins]
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global.scss";
@import "../../assets/styles/icon.css";
.book {
  position: relative;
  width: 100%;
  height: 100%;
  .book-content-wrapper {
  }
  .img-wrapper {
    position: absolute;
    right: 0;
    top:50%;
    border-radius: 50%;
    border: 1px #fff solid;
    z-index:150;
    img {
      width: px2rem(25);
      height: px2rem(25);
    }
  }
}
</style>