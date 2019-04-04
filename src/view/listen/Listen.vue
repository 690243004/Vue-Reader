<template>
    <div>
        <DescHeader />
        Listen
        <a id="download">下载</a>
        <div @click="listenBook()">点击测试</div>
        <audio controls id="video_player"></audio>
    </div>
</template>

<script>
import mixins from "@u/mixins.js"
import MD5 from 'js-md5';
import { Base64 } from 'js-base64';
import DescHeader from '@c/common/DescHeader.vue'
import axios from 'axios'
import qs from 'qs'
const apiId = '5c14752e'
const apiKey = '33c6517f62fde9261d438b9a45e3908a'
let  xparam  = 'eyJhdWYiOiAiYXVkaW8vTDE2O3JhdGU9MTYwMDAiLCJhdWUiOiAicmF3Iiwidm9pY2VfbmFtZSI6ICJ4aWFveWFuIiwic3BlZWQiOiAiNTAiLCJ2b2x1bWUiOiAiNTAiLCJwaXRjaCI6ICI1MCIsImVuZ2luZV90eXBlIjogImludHA2NSIsInRleHRfdHlwZSI6ICJ0ZXh0In0='
let json = {
    "auf": "audio/L16;rate=16000",
    "aue": "raw",
    "voice_name": "xiaoyan",
    "speed": "50",
    "volume": "50",
    "pitch": "50",
    "engine_type": "intp65",
    "text_type": "text"
}
xparam = Base64.encode(JSON.stringify(json))
export default {
	data(){
        return {

        }
    },
    methods:{
        listenBook() {
            let cur = Math.round(new Date()/1000);
            let req = axios.create({
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
            req.post('/listen',qs.stringify({text: '人与人之间的联结，一定是一剂麻药。人会不知不觉地依赖这种关系，心也会跟着一点一点地被腐蚀。一段时间以后，如果不依赖别人的话，这个人将会变得什么都做不到。那样的话，会不会由于我想要帮助别人，却反而令其所苦呢。我这不就是在催生不靠外力就站不起来的人吗。明明不该授之于鱼，而是应该告诉别人捕鱼的方法才对。可以轻易地从别人那里得到的东西，一定是伪物。能从别人那里轻易获得之物，也一定会被别人轻易夺去。'}) ).then(res=>{
                let blob = new Blob([res.data]/* , {type: "audio/wav"} */)
                let a = document.getElementById('download')
                a.download = '文件.wav'
                a.href = window.URL.createObjectURL(blob)
                var video = document.getElementById('video_player');
                video.src = window.URL.createObjectURL(blob);
                video.play();
               //  var obj_url = window.URL.createObjectURL(blob);
                // window.navigator.msSaveOrOpenBlob(blob, 'aaa.wav');
            })
        }
        
    },
    mixins:[mixins],
    components:{
        DescHeader
    },

}
</script>

<style lang="scss" scoped="">
@import "../../assets/styles/global";
.mask {
    height: px2rem(300);
    background: #333333;
    width: 100%;
    position: relative;
    display: flex;
    .img-item {
        img {
            width: px2rem(50);
            height: px2rem(50);
        }
        transition: all .2s linear;
        &.selected{
            margin-top: 100px;
        }
    }
    #video_player {
        position: absolute;
        bottom:0;
        width: 100%;
    }
   
}
</style>