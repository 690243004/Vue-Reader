<template>
  <transition name="slide-up">
    <div class="setting-wrapper" v-show="menuVisible && settingVisible===2">
      <div class="time-wrapper">
        <span>{{book.chapter.title}}</span>
      </div>
      <div class="progress-wrapper">
        <div class="progress-icon-wrapper" @click="prevSection()">
          <span class="icon-back" ></span>
        </div>
        <input
          class="progress"
          type="range"
          max="100"
          min="0"
          step="1"
          @change="onProgressChange($event.target.value)"
          @input="onProgressInput($event.target.value)"
          :value="defaultProgress"
          :disabled="!bookAvailable"
          ref="progress"
        >
        <div class="progress-icon-wrapper"  @click="nextSection()">
          <span class="icon-forward"></span>
        </div>
      </div>
      <div class="text-wrapper">
        <span>{{bookAvailable ? (Math.round(( parseFloat(defaultProgress))*100)/100)+'%':'加载中'}}</span>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import mixins from "@u/mixins.js"
//:class="{'hide-box-shadow': settingVisible >= 0 || !menuVisible}"
export default {
  mixins: [mixins],
  methods: {
    // 进度条松开后触发事件
    onProgressChange(progress) {
       progress = (Math.round(( parseFloat(progress))*100)/100)
       // 要跳转的章节数 = 章节目录长度 * progress/100
       let num = Math.floor(this.bookChapters.length * progress/100 )
       this.bookNextAsnc(num)
    },
    // 拖动进度条触发的事件
    onProgressInput(progress) {
      progress = (Math.round(( parseFloat(progress))*100)/100)
    },
    prevSection() {
      if(this.num !== 0){
        this.bookNextAsnc(this.num-1)
      }
    },
    nextSection() {
       if(this.num !== this.bookChapters.length-1){
         this.bookNextAsnc(this.num+1)
      }
    },
   
    updateProgressBg() {
      this.$refs.progress.style.backgroundSize = `${
        this.defaultProgress
      }% 100%`;
    },


  },
  mounted() {},
  components: {},
  computed: {
    getSectionName() {
      return ''
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";
.setting-wrapper {
  z-index: 110;
  height: px2rem(60);
  left: 0;
  width: 100%;
  bottom: px2rem(48);
  position: absolute;
  display: flex;
  flex-direction: column;
  background: #fff;
  .progress-wrapper {
    @include center;
    padding: 0 px2rem(10);
    box-sizing: border-box;
    flex: 1;
    .progress {
      width: 100%;
      height: px2rem(2);
      background: -webkit-linear-gradient(#999, #999) no-repeat, #ddd;
      -webkit-appearance: none;
      //  background-size: 0 100% !important;
      &:focus {
        outline: none;
      }
      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: px2rem(20);
        width: px2rem(20);
        border-radius: 50%;
        background: #fff;
        box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.15);
        border: px2rem(1) solid #ddd;
      }
    }
    .progress-icon-wrapper {
      font-size: px2rem(20);
      margin: 0 px2rem(10);
    }
  }
  .text-wrapper {
    @include center;
    flex: 1;
    font-size: px2rem(14);
    .progress-section-text {
      @include ellipsis;
    }
  }
  .time-wrapper {
    @include center;
    flex: 1;
    font-size: px2rem(14);
    padding-top:px2rem(10)
  }
}
</style>