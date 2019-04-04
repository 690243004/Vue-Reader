<template>
  <div>
    <div @click="$router.push({path: '/info/'+item._id})" class="recommand-list-wrapper" v-for="(item,index) in recList" :key="index">
      <div class="recommand-list-img">
        <img :src="url+item.cover" >
      </div>
      <div class="recommand-list-info">
        <div class="recommand-list-info-title">{{item.title}}</div>
        <div class="recommand-list-info-desc">
          {{ item.shortIntro|shortInfoFormat() }}
        </div>
        <div class="recommand-list-info-author">
          <span class="authoor">{{item.author}}</span>
          <span class="major" v-if="item.majorCate">{{item.majorCate}}</span>
          <span class="major"  v-if="item.minorCate">{{item.minorCate}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixins from "@u/mixins.js";
export default {
  props: {
    recList:{
      type:Array,
      default:[]
    } ,
    url:{
      type:String,
      default:''
    } 
  },
  data() {
    return {
    };
  },
  // mixins: [mixins],

};
</script>

<style lang="scss" scoped="">
@import "../../assets/styles/global";
.recommand-list-wrapper {
  display: flex;
  height: px2rem(80);
  padding: px2rem(10);
  .recommand-list-img {
    flex: 0 0 px2rem(60);
    height: 100%;
    img {
      width: px2rem(60);
      height: 100%;
    }
  }
  .recommand-list-info {
    margin-left: px2rem(10);
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    .recommand-list-info-title {
      flex: 0 0 px2rem(10);
      font-size: px2rem(12);
    }
    .recommand-list-info-desc {
      flex: 1;
      font-size: px2rem(10);
      line-height: px2rem(13);
      @include ellipsis2(3);
      color: #888;
    }
    .recommand-list-info-author {
      flex: 0 0 px2rem(15);
      font-size: px2rem(10);
      .authoor {
        box-sizing: border-box;
        padding: px2rem(2) px2rem(5);
        background: rgba(241, 158, 194, 1);
        color:#fff;
      }
      .major {
        box-sizing: border-box;
        padding: px2rem(2) px2rem(5);
        color:#fff;
        background-color: #D1ACD8;
        margin-left: px2rem(5);
      }
      .major:last-child{
        background-color: #A1D0D2;
      }
    }
  }
}
</style>