<template>
    <div>
    <div class="bookDesc-wrapper-comment" @click="hide">
        <DescHeader />
        <div
        class="bookDesc-wrapper-comment-item" v-for="(item,index) in review" :key="index">
          <div class="bookDesc-wrapper-comment-item-img">
            <img
              :src="item.avatar"
            >
          </div>
          <div class="bookDesc-wrapper-comment-item-content">
            <div class="bookDesc-wrapper-comment-item-content-user">#{{index+1}} {{item.username}}</div>
            <div class="bookDesc-wrapper-comment-item-content-comment">3213213213</div>
            <div class="bookDesc-wrapper-comment-item-content-date">
              <p>{{item.create_time.slice(0,10)}}</p>
              <p>1 <span @click="assist()" class=" iconfont aicon-dianzan"></span></p>
            </div>
            <div class="subContent-btn"><span @click="getChildList(item,index)">查看更多回复</span><span @click.stop="show(item,index)">回复</span></div>
            <ul class="subContent-item"  v-infinite-scroll="loadMore" v-if="item.child&&item.child.length>0">
                <Review v-for="(child,i) in item.child" :child="child" :key="i"/>
            </ul>
          </div>
        
        </div>

    </div>
        <Field 
    v-if="inputFlag"
    class="input" 
    :label="'回复'+parentItem.username.slice(0,2)+'..'" 
    placeholder="请输入"
    v-model="content"
    ><div @click="submit">提交</div></Field>
  </div>
</template>

<script>
import mixins from "@u/mixins.js"
import DescHeader from '@c/common/DescHeader.vue'
import Review from '@c/review/review.vue'
import { Field } from 'mint-ui';
import axios from 'axios'
import { MessageBox } from 'mint-ui';
import { cloneDeep } from 'lodash'
const request = axios.create({
    baseURL: '/user',
    timeout: 5000,
   // headers: {'X-Custom-Header': 'foobar',}
})
export default {
	data(){
        return {
          // 回复内容
          content:"",
          // 回复人
          reviewUser:'',
          inputFlag:false,
          parentItem: {

          },
          index:''
        }
    },
    mixins:[mixins],
    components:{
        DescHeader,
        Review,
        Field
    },
    methods: {
        loadMore() {
            console.log("loadMore")
        },
        hide() {
            this.inputFlag = false
        },
        show(item,index) {
          this.parentItem = item;
          this.index = index;
          this.inputFlag = true
        },
        submit () {
          // console.log('提交',this.content)
          console.log(this.parentItem)
          const username = this.user.username+'回复：'+ this.parentItem.username
          const { userId } = this.user
          const content = this.content
          const bookId = this.parentItem.bookId
          const avatar = this.user.avatar
          const parentId = this.parentItem._id
          request.post("review",{
            parentId,
            username,
            userId,
            content,
            bookId,avatar}).then(res=>{
              if(res.status === 200) {
                console.log("回复成功")
                this.getChildList(this.parentItem,this.index)
              }
          })
        },
        getChildList(parentItem,index) {
          request.post("reviewList",{
            bookId:parentItem.bookId,
            parentId:parentItem._id}).then(res=>{
            if(res.status === 200) {
              const { data } = res
              const child = data.data
              console.log(child,this.review[index])
              let updateItem = cloneDeep(this.review[index])
              updateItem.child = child
              console.log(updateItem,index)
              this.updateModel('review',[
                ...this.review.slice(0,index),
                updateItem,
                ...this.review.slice(index+1)
              ])
            }
          })
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";
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
          .subContent-btn {
              margin-top: px2rem(7);
              font-size: px2rem(9);
              display: flex;
              justify-content: space-between;
              align-items: center;
          }
          .subContent-item {
              // height: px2rem(200);
              overflow-y: scroll;
             // margin-top: px2rem(5);
          }
        }
        
      }
    }
    .input {
      position: fixed;
      bottom:0;
      width: 100%;
    }
</style>