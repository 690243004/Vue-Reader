<template>
  <div>
    <div class="ebook-menu">
      <transition name="slide-up">
        <div class="menu-wrapper" :class="{'hide-box-shadow':settingVisible!=-1}" v-show="menuVisible">
          <div class="icon-wrapper">
            <span class="icon-menu" @click="showSetting(3)"></span>
          </div>
          <div class="icon-wrapper">
            <span class="icon-progress" @click="showSetting(2)"></span>
          </div>
          <div class="icon-wrapper">
            <span class="icon-bright" @click="showSetting(1)"></span>
          </div>
          <div class="icon-wrapper">
            <span class="icon-A" @click="showSetting(0)"></span>
          </div>
        </div>
      </transition>

    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import mixins from "@u/mixins.js"

//:class="{'hide-box-shadow': settingVisible >= 0 || !menuVisible}"
export default {
  methods: {
    showSetting(key){
      this.$store.dispatch('updateModel',{name:'settingVisible',value:this.settingVisible===key?-1:key})
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
.menu-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 200;
  display: flex;
  width: 100%;
  height: px2rem(48);
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
  font-size: px2rem(22);
  background-color: #fff;
  &.hide-box-shadow {
    box-shadow: none;
  }
  .icon-wrapper {
    flex: 1;
    @include center;
    .icon-progress {
      font-size: px2rem(24);
    }
    .icon-A {
      font-size: px2rem(20);
    }
  }
}

</style>