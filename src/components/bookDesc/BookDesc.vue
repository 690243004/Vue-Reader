<template>
  <div class="bookDesc">
    <DescHeader/>
    <div class="bookDesc-wrapper">
      <div class="bookDesc-wrapper-information">
        <div class="bookDesc-wrapper-information-cover">
          <img :src="url+currentBook.cover">
        </div>
        <div class="bookDesc-wrapper-information-content">
          <div class="bookDesc-wrapper-information-content-title">{{currentBook.title}}</div>
          <div class="bookDesc-wrapper-information-content-author">
            <p>作者：{{currentBook.author}}</p>
            <p>分类：{{currentBook.majorCate}}</p>
          </div>
          <div class="bookDesc-wrapper-information-content-other"></div>
        </div>
      </div>

      <div class="bookDesc-wrapper-collection" @click="collect()">+收藏</div>

      <div class="bookDesc-wrapper-button" @click="$router.push({path: '/book'})">立即阅读</div>

      <div class="bookDesc-wrapper-new">
        <div>最新</div>
        <div>{{currentBook.lastChapter}}</div>
      </div>

      <div class="bookDesc-wrapper-description">
        <div class="bookDesc-wrapper-description-head">作品简介</div>
        <div class="bookDesc-wrapper-description-content">{{currentBook.longIntro}}</div>
      </div>

      <div class="bookDesc-wrapper-tab">
        <span v-for="(item,index) in currentBook.tags" :key="index">{{ item }}</span>
      </div>

      <div class="bookDesc-wrapper-index">
        <div class="bookDesc-wrapper-index-head">作品目录</div>
        <div
          class="bookDesc-wrapper-index-item"
          v-for="(item,index) in bookChapters.slice(0,8)"
          :key="index"
        >
          <router-link :to="'/book/'+index">{{item.title}}</router-link>
        </div>
      </div>

      <div class="bookDesc-wrapper-comment">
        <div class="bookDesc-wrapper-comment-head">{{currentBook.title}}评论</div>
        
        <div 
        v-for="(item,index) in review.slice(0,3)" :key="index"
        class="bookDesc-wrapper-comment-item" 
        >
          <div class="bookDesc-wrapper-comment-item-img">
            <img
              :src="item.avatar"
            >
          </div>
          <div class="bookDesc-wrapper-comment-item-content">
            <div class="bookDesc-wrapper-comment-item-content-user">{{item.username}}
            </div>
            <div class="bookDesc-wrapper-comment-item-content-comment">
             {{item.content}}
            </div>
            <div class="bookDesc-wrapper-comment-item-content-date">
              <p>{{item.create_time.slice(0,10)}}</p>
              <p>{{assistNum}} <span @click="assist()" :style="assistNum===1?{color:'#888'}:{color:'#fff'}" class=" iconfont aicon-dianzan"></span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
   <div class="watchMore" @click="$router.push({path: '/comment'})">
      查看更多
    </div>
    <div class="review" @click="reviewSubmit()">
      轻触点评
    </div>
  </div>
</template>

<script>
import mixins from "@u/mixins.js";
import DescHeader from "@c/common/DescHeader.vue";
import {mock} from '@u/review.js'
import axios from 'axios'
import { MessageBox } from 'mint-ui';
console.log(mock)
const request = axios.create({
    baseURL: '/user',
    timeout: 5000,
   // headers: {'X-Custom-Header': 'foobar',}
})
export default {
  data() {
    return {
      // review :[]
      assistNum:''
    };
  },
  components: {
    DescHeader
  },
  methods:{
    collect:function(){
      const { user , currentBook } = this
      if(user.status === -1) {
        return MessageBox.alert("请先登录")
      }
      const { collect } = user 
      if( ~collect.findIndex(item=>item._id === currentBook._id)) {
        MessageBox.alert("该书籍已收藏")
      }else {
        let _collect = collect.concat([{
          _id:currentBook._id,
          cover:currentBook.cover,
          title:currentBook.title
          }])
        request.post("collect",{ collect:_collect,_id:user._id })
        .then(res=> {
          if(res.status === 200) {
            this.updateModel("user",res.data.user)
            MessageBox.alert("收藏成功")
          }else {
            MessageBox.alert("请求失败")
          }
        })
      }
      
    },
    reviewSubmit() {
      const { user,currentBook} = this
      const { status, username,_id:userId,avatar } = user
      const { _id:bookId } = currentBook
      let self = this
      if(this.user.status === -1) {
        return  MessageBox.alert('请先登录')
      }
       MessageBox.prompt("请输入点评","")
            .then(({ value,action })=> {
                request.post("review",{username,userId,content:value,bookId,avatar}).then(res=>{
                    if(res.status === 200) {
                           MessageBox.alert('点评成功')
                           self.getReviewList()
                    }
                })
        })
    },
    // 获取评论列表
    getReviewList() {
      const { _id } = this.currentBook
        request.post("reviewList",{bookId:_id}).then(res=>{
            if(res.status === 200) {
              const { data } = res
              // this.review = data.data
              this.updateModel('review',data.data)
            }
        })
    },
    // 点赞
    assist() {
      this.assistNum = this.assistNum === 1 ?'':1
    }
  },
  mixins: [mixins],
  mounted() {
    this. getReviewList()
  }
};
</script>

<style lang="scss" scoped="">
@import "../../assets/styles/global";
@import "../../assets/icon_head/iconfont.css";
.bookDesc {
  .bookDesc-wrapper {
    width: 100%;
    height: 100%;
    padding: 0 px2rem(10);
    box-sizing: border-box;
    position: relative;
    .bookDesc-wrapper-information {
      padding: px2rem(10) 0;
      height: px2rem(100);
      width: 100%;
      display: flex;
      .bookDesc-wrapper-information-cover {
        flex: 0 0 px2rem(80);
        img {
          width: px2rem(80);
          height: 100%;
        }
      }
      .bookDesc-wrapper-information-content {
        margin-left: px2rem(10);
        flex: 1;
        display: flex;
        font-size: px2rem(14);
        flex-direction: column;
        .bookDesc-wrapper-information-content-title {
          flex: 0 0 px2rem(13);
        }
        .bookDesc-wrapper-information-content-author {
          flex: 1;
          font-size: px2rem(12);
          color: #888;
          p {
            margin: px2rem(10) 0;
          }
        }
        .bookDesc-wrapper-information-content-other {
          flex: 0 0 px2rem(14);
        }
      }
    }
    .bookDesc-wrapper-button {
      font-size: px2rem(10);
      width: px2rem(80);
      height: px2rem(20);
      color: #fff;
      @include center;
      background: rgb(237, 66, 75);
       border-radius: px2rem(10);
    }
    .bookDesc-wrapper-new {
      font-size: px2rem(12);
      margin-top: px2rem(10);
      display: flex;
      align-items: flex-start;
      div:first-child {
        border: px2rem(1) solid rgb(237, 66, 75);
        width: px2rem(30);
        font-size: px2rem(9);
        height: px2rem(14);
        margin-right: px2rem(5);
        @include center;
        color: rgb(237, 66, 75);
        border-radius: px2rem(10);
      }
    }
    .bookDesc-wrapper-description {
      margin-top: px2rem(10);
      .bookDesc-wrapper-description-head {
        font-size: px2rem(14);
        display: flex;
      }
      .bookDesc-wrapper-description-content {
        font-size: px2rem(12);
        margin-top: px2rem(10);
      }
    }
    .bookDesc-wrapper-tab {
      span {
        font-size: px2rem(10);
        background: #888;
        color: #fff;
        margin-left: px2rem(5);
      }
      span:first-child {
        margin: 0;
      }
    }
    .bookDesc-wrapper-index {
      .bookDesc-wrapper-index-head {
        font-size: px2rem(14);
      }
      .bookDesc-wrapper-index-item {
        margin-top: px2rem(10);
        font-size: px2rem(12);
        a {
          color:#000;
        }
       
      }
    }

    .bookDesc-wrapper-collection {
      position: absolute;
      font-size: px2rem(9);
      width: px2rem(50);
      height: px2rem(15);
      color: #fff;
      @include center;
      background: rgb(237, 66, 75);
      border-radius: px2rem(10);
      right: px2rem(10);
      top: px2rem(10);
    }

    .bookDesc-wrapper-comment {
      margin-top:px2rem(10);
     .bookDesc-wrapper-comment-head {
        // color: rgb(237, 66, 75);
        font-size: px2rem(10);
        line-height: px2rem(20);
        border-bottom: px2rem(1)  #888 solid;
      }
      .bookDesc-wrapper-comment-item {
        margin-top:px2rem(10);
        background: #eeeeee;
        display: flex;
        padding:px2rem(10);
        border-radius: px2rem(10);
        .bookDesc-wrapper-comment-item-img {
          flex: 0 0 px2rem(40);
          img {
            width: px2rem(40);
            height: px2rem(40);
          }
        }
        .bookDesc-wrapper-comment-item-content {
          flex:1;
          font-size: px2rem(10);
          display: flex;
          flex-direction: column;
          margin-left:px2rem(10);
          .bookDesc-wrapper-comment-item-content-user {
            font-size: px2rem(10);
            flex:1;
          }
          .bookDesc-wrapper-comment-item-content-comment {
            flex:3;
            @include ellipsis2(4);
            line-height: px2rem(15);
            color:#888;
            margin:px2rem(5) 0;
          }
          .bookDesc-wrapper-comment-item-content-date {
            color: #888;
            flex:1;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        }
        
      }
    }



  }
  .review {
    background: dodgerblue;
    width: px2rem(120);
    font-size: px2rem(11);
    color:#fff;
    border-radius: px2rem(10);
    text-align: center;
    line-height: px2rem(25);
    margin:px2rem(10) auto;
  }
  .watchMore {
     font-size: px2rem(10);
     text-align: center;
     margin-top: px2rem(5);
     color: blue
  }
}
</style>