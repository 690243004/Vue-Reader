<template>
  <transition name="slide-up">
    <div class="setting-wrapper" v-show="menuVisible && settingVisible===1">
      <div class="setting-theme">
        <div
          class="setting-theme-item"
          @click="setTheme(item.name)"
          v-for="(item,index) in themeList"
          :key="index"
        >
          <div
            class="preview"
            :style="{background:item.style.body.background}"
            :class="{'no-border': item.style.body.background !== '#fff', 'selected':item.name === defaultTheme}"
          ></div>
          <div class="text" :class="{'selected':item.name === defaultTheme}">{{item.name}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import mixins from "@u/mixins.js"
import { addCss,removeCss } from "@u/book.js";
//:class="{'hide-box-shadow': settingVisible >= 0 || !menuVisible}"
export default {
  mixins: [mixins],
  methods: {
    setTheme(themeName) {
      this.updateModel("defaultTheme", themeName);
    }
  },
  mounted() {},
  components: {}
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";
.setting-wrapper {
  background: #fff;
  z-index: 110;
  height: px2rem(60);
  left: 0;
  width: 100%;
  bottom: px2rem(48);
  position: absolute;
  .setting-theme {
    // background: #fff;
    display: flex;
    height: 100%;
    .setting-theme-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: px2rem(5);
      .preview {
        flex: 1;
        border: px2rem(1) solid #ccc;
        box-sizing: border-box;
        &.no-border {
          border: none;
        }
        &.selected {
          box-shadow: 0px px2rem(4) px2rem(6) 0 rgba(0, 0, 0, 1);
        }
      }
      .text {
        @include center;
        flex: 0 0 px2rem(20);
        font-size: px2rem(14);
        color: #999;
        &.selected {
          color: #333;
        }
      }
    }
  }
}
</style>