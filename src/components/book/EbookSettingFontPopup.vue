<template>
  <transition name="popup-slide-up">
    <div class="ebook-popup-list" v-show="fontFamilyVisible">
      <div class="ebook-popup-title">
        <div class="ebook-popup-title-icon" @click="hide">
          <span class="icon-down2"></span>
        </div>
        <span class="ebook-popup-title-text">选择字体</span>
      </div>
      <div class="ebook-popup-list-wrapper">
        <div
          class="ebook-popup-item"
          @click="setFontFamily(item.font)"
          v-for="(item,index) in fontFamilyList"
          :key="index"
        >
          <div class="ebook-popup-item-text" :class="{'selected':isSelected(item)}">{{item.font}}</div>
          <div class="ebook-popup-item-check" v-if="isSelected(item)">
            <span class="icon-check"></span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import mixins from "@u/mixins.js"
export default {
  methods: {
    // 更新状态机
    updateModel(name, value) {
      this.$store.dispatch("updateModel", { name, value });
    },
    hide() {
      this.$store.dispatch("updateModel", {
        name: "fontFamilyVisible",
        value: false
      });
    },
    isSelected(item) {
      return this.defaultFontFamily === item.font;
    },
    setFontFamily(font) {
      // 存入到localStorage中
      this.$store.dispatch("updateModel", {
        name: "defaultFontFamily",
        value: font
      });
    }
  },
  mixins: [mixins],
  mounted() {
    // 写入缓存
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";
.ebook-popup-list {
  position: absolute;
  bottom: 0;
  left: 0;
  background: #fff;
  z-index: 300;
  width: 100%;
  box-shadow: 0 px2rem(-4) px2rem(6) rgba(0, 0, 0, 0.1);
  .ebook-popup-title {
    padding: px2rem(15);
    box-sizing: border-box;
    border-bottom: px2rem(1) solid #b8b9bb;
    text-align: center;
    position: relative;
    @include center;
    .ebook-popup-title-icon {
      position: absolute;
      left: px2rem(15);
      top: 0;
      height: 100%;
      font-size: px2rem(16);
      font-weight: bold;
      @include center;
    }
    .ebook-popup-title-text {
      font-size: px2rem(14);
      font-weight: bold;
    }
  }
  .ebook-popup-list-wrapper {
    .ebook-popup-item {
      display: flex;
      padding: 15px;
      .ebook-popup-item-text {
        flex: 1;
        font-size: px2rem(14);
        text-align: left;
        &.selected {
          color: #346cb9;
          font-weight: bold;
        }
      }
      .ebook-popup-item-check {
        flex: 1;
        color: #346cb9;
        text-align: right;
        font-size: px2rem(14);
        font-weight: bold;
      }
    }
  }
}
</style>