<template>
  <div class="header">
    <div id="tabber">
      <router-link to="/home" class="tabber-item">
        <div class="iconfont aicon-shouye"></div>
        <p>首页</p>
      </router-link>
      <router-link to="/sort" class="tabber-item">
        <div class="iconfont aicon-fenlei"></div>
        <p>分类</p>
      </router-link>
      <router-link to="/rank" class="tabber-item">
        <div class="iconfont aicon-paihangbang"></div>
        <p>排行</p>
      </router-link>
      <router-link to="/user" class="tabber-item">
        <div class="iconfont aicon-wode"></div>
        <p>我的</p>
      </router-link>
    </div>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped=true>
@import "../../assets/icon_head/iconfont.css";
@import "../../assets/styles/global";

#tabber {
  color: #a1a1a1;
  background: #fff;
  position: fixed;
  bottom: 0;
  height: px2rem(28);
  width: 100%;
  display: flex;
  justify-content: space-around;
  .tabber-item {
    height: 100%;
    width: 25%;
    display: flex;
    font-size: px2rem(12);
    color: #fff;
    flex-direction: column;
    div {
      color: #000;
      flex: 0 0 px2rem(18);
      @include center;
      font-size: px2rem(13);
      img {
        width: px2rem(15);
        height: px2rem(15);
      }
    }

    p {
      color: #999;
      flex: 1;
      font-size: px2rem(9);
      @include center;
    }
  }
}
.tabber-active {
  color:dodgerblue !important;
  border: none;
  p,div {
   color:dodgerblue !important;
  }
}
</style>