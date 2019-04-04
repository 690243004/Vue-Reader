<template>
  <div>
    <transition name="slide-up">
      <div class="setting-wrapper" v-show="menuVisible && settingVisible===0">
        <div class="setting-font-size">
          <div class="preview" :style="{fontSize:fontSizeList[0].fontSize+'px'}">A</div>
          <div class="select">
            <div
              class="select-wrapper"
              @click="setFontSize(item.fontSize)"
              v-for="(item,index) in fontSizeList"
              :key="index"
            >
              <div class="line"></div>
              <div class="point-wrapper">
                <div class="point" v-show="defaultFontSize===item.fontSize">
                  <div class="small-point"></div>
                </div>
              </div>
              <div class="line"></div>
            </div>
          </div>

          <div
            class="preview"
            :style="{fontSize:fontSizeList[fontSizeList.length-1].fontSize+'px'}"
          >A</div>
        </div>
        <div class="setting-font-family" @click="showFamilyPopup">
          <div class="setting-font-family-text-wrapper">{{defaultFontFamily}}</div>
          <div class="setting-font-family-icon-wrapper">
            <span class="icon-forward"></span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import mixins from "@u/mixins.js"

//:class="{'hide-box-shadow': settingVisible >= 0 || !menuVisible}"
export default {
  methods: {
    setFontSize(fontSize) {
      this.$store.dispatch("updateModel", {
        name: "defaultFontSize",
        value: fontSize
      });  
    },
    // 更新状态机
    updateModel(name, value) {
      this.$store.dispatch("updateModel", { name, value });
    },
    // 显示字体样式弹出层
    showFamilyPopup(){
      this.$store.dispatch("updateModel", { name:"fontFamilyVisible", value:this.fontFamilyVisible?false:true });
    }
  },
  mixins: [mixins],
  mounted() {},
  components:{
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

.setting-wrapper {
  position: absolute;
  bottom: px2rem(48);
  left: 0;
  width: 100%;
  height: px2rem(60);
  z-index: 110;
  display: flex;
  flex-direction: column;
  background: #fff;
  box-shadow: 0 px2rem(-8) px2rem(-8) rgba(0, 0, 0, 0.15);
  .setting-font-size {
    flex: 2;
    display: flex;
    height: 100%;
    .preview {
      flex: 0 0 px2rem(40);
      @include center;
    }
    .select {
      flex: 1;
      display: flex;
      .select-wrapper {
        flex: 1;
        display: flex;
        align-items: center;
        &:first-child {
          .line {
            &:first-child {
              border-top: none;
            }
          }
        }
        &:last-child {
          .line {
            &:last-child {
              border-top: none;
            }
          }
        }
        .line {
          flex: 1;
          height: 0;
          border-top: px2rem(1) solid #ccc;
        }
        .point-wrapper {
          flex: 0 0 0;
          width: 0;
          height: px2rem(7);
          border-left: px2rem(1) solid #ccc;
          position: relative;
          .point {
            position: absolute;
            top: px2rem(-8);
            left: px2rem(-10);
            width: px2rem(20);
            height: px2rem(20);
            border-radius: 50%;
            border: px2rem(1) solid #ccc;
            box-shadow: 0 px2rem(4) px2rem(4) rgba(0, 0, 0, 0.15);
            @include center;
            .small-point {
              width: px2rem(5);
              height: px2rem(5);
              background: black;
              border-radius: 50%;
            }
          }
        }
      }
    }
  }
  .setting-font-family {
    flex: 1;
    font-size: px2rem(14);
    @include center;
    .setting-font-family-text-wrapper {
         @include center;
      .setting-font-family-text {
      }
    }
    .setting-font-family-icon-wrapper {
         @include center;
      .icon-forward {
      }
    }
  }
}
</style>