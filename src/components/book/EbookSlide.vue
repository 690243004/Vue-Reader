<template>
<transition name="fade">
    <transition name="slide-right">
    <div class="slide-content-wrapper" v-show="menuVisible &&settingVisible===3">
        <div class="content" v-if="settingVisible===3">
            <div class="content-page-wrapper">
                <div class="content-page">
                    <component :is="currentTab===1?content:bookmark"></component> 
                </div>
                <div class="content-page-tab">
                    <div @click="selectTab(1)"
                    :class="{'selected':currentTab === 1}"
                    class="content-page-item">
                       目录
                    </div>
                    <div @click="selectTab(2)"
                    :class="{'selected':currentTab === 2}"
                    class="content-page-item">
                        书签
                    </div>
                </div>
            </div>
        </div>
        <div class="content-bg" @click="hideTitleAndMenu"></div>
    </div>
    </transition>
</transition>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import mixins from "@u/mixins.js"
import EbookSlideContents from "./components/EbookSlideContents.vue";
import EbookSlideBookmark from "./components/EbookSlideBookmark.vue";

//:class="{'hide-box-shadow': settingVisible >= 0 || !menuVisible}"
export default {
  data(){
      return {
          currentTab:1,
          content:EbookSlideContents,
          bookmark:EbookSlideBookmark
      }
  },
  methods: {
      selectTab(key){
          this.currentTab = key
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
.slide-content-wrapper {
    position: absolute;
    top:0;
    left:0;
    z-index:300;
    width: 100%;
    height: 100%;
    display: flex;
    .content {
        background: #fff;
        flex: 0 0 85%;
        width: 85%;
        height: 100%;
        .content-page-wrapper{
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            .content-page {
                flex:1;
                width: 100%;
                overflow: hidden;
            }
            .content-page-tab {
                flex: 0 0 px2rem(48);
                width: 100%;
                height: px2rem(48);
                display: flex;
                .content-page-item {
                    flex:1;
                    font-size: px2rem(12);
                    @include center;
                    &.selected {
                        font-weight: bold;
                    }
                }
            }
        }
    }
    .content-bg {
        flex: 0 0 15%;
        width: 15%;
        height: 100%;
        background: rgba(0,0,0,.3)
    }
}
</style>