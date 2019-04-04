<template>
  <transition name="slide-down">
    <div class="title-wrapper" v-show="menuVisible">
      <div @click="goBack()" class="left">
        <span class="icon-back"></span>
      </div>
      <div class="right">
        <div class="icon-wrapper">
          <span class="icon-shelf"></span>
        </div>
        <div class="icon-wrapper">
          <span style="font-weight:bold" class="iconfont aicon-yixianshi-" @click="listen()"></span>
        </div>
        <div class="icon-wrapper" >
          <span class="icon-more"></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { apiId,apiKey,xparam } from '@s/config/config'
import mixins from "@u/mixins.js"
import MD5 from 'js-md5';
import axios from 'axios'
import qs from 'qs'
import { Base64 } from 'js-base64';
export default {
  methods: {
    listen() {
      // 创建时间戳
      const cur = Math.round(new Date()/1000);
      // 配置请求
      const req = axios.create({
        baseURL: '',
        timeout: 5000,
        headers: {
            'X-Custom-Header': 'foobar',
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            'X-Appid':apiId,
            'X-CurTime':cur,
            'X-CheckSum':MD5(apiKey+cur+xparam),
            'X-Param':xparam
        },
        responseType:'blob'
      })
      req.post('/listen',qs.stringify({text: this.book.chapter.cpContent.slice(0,200)}) )
      .then(res=>{
  
        let blob = new Blob([res.data]/* , {type: "audio/wav"} */)
  /*       let a = document.getElementById('download')
        a.download = '文件.wav'
        a.href = window.URL.createObjectURL(blob)
        console.log(blog,'blog') */
        var video = document.createElement('audio');
        video.src = window.URL.createObjectURL(blob);
        video.play();
        document.removeChild(video)
        //  var obj_url = window.URL.createObjectURL(blob);
        // window.navigator.msSaveOrOpenBlob(blob, 'aaa.wav');
      })
    }
  },
  mixins:[mixins],
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";
@import "../../assets/icon_head/iconfont.css";
.title-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 200;
  display: flex;
  width: 100%;
  height: px2rem(48);
  box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, 0.15);
  font-size: px2rem(22);
  background: #fff;
  // background-color: #fff;
  .left {
    flex: 0 0 px2rem(37);
     @include left;
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    .icon-wrapper {
      flex: 0 0 px2rem(37);
       @include right;
    }
  }
}
</style>