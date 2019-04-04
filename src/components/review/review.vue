<template>
  <div class="bookDesc-wrapper-comment">
    <div class="bookDesc-wrapper-comment-item">
      <div class="bookDesc-wrapper-comment-item-img">
        <img :src="child.avatar">
      </div>
      <div class="bookDesc-wrapper-comment-item-content">
        <div class="bookDesc-wrapper-comment-item-content-user">{{child.username}}</div>
        <div class="bookDesc-wrapper-comment-item-content-comment">{{child.content}}</div>
        <div class="bookDesc-wrapper-comment-item-content-date">
          <p>{{child.create_time.slice(0,10)}}</p>
          <p>回复</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixins from "@u/mixins.js";
export default {
  data() {
    return {};
  },
  props: {
    child: {
      type: Object,
      default: {}
    }
  },
  mounted(){
    console.log(this.props)
  },
  mixins: [mixins]
};
</script>

<style lang="scss" scoped="">
@import "../../assets/styles/global";
.bookDesc-wrapper-comment {
  .bookDesc-wrapper-comment-head {
    // color: rgb(237, 66, 75);
    font-size: px2rem(10);
    line-height: px2rem(20);
    border-bottom: px2rem(1) #888 solid;
  }
  .bookDesc-wrapper-comment-item {
    margin-top: px2rem(10);
    background: #fff;
    display: flex;
    padding: px2rem(5);
     border-radius: px2rem(10);
    //border-radius: px2rem(10);
    .bookDesc-wrapper-comment-item-img {
      flex: 0 0 px2rem(40);
      img {
        width: px2rem(40);
        height: px2rem(40);
        border-radius: px2rem(10);
      }
    }
    .bookDesc-wrapper-comment-item-content {
      flex: 1;
      font-size: px2rem(10);
      display: flex;
      flex-direction: column;
      margin-left: px2rem(10);
      .bookDesc-wrapper-comment-item-content-user {
        font-size: px2rem(10);
        flex: 1;
      }
      .bookDesc-wrapper-comment-item-content-comment {
        flex: 3;
        @include ellipsis2(4);
        line-height: px2rem(15);
        color: #888;
        margin: px2rem(5) 0;
      }
      .bookDesc-wrapper-comment-item-content-date {
        color: #888;
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
</style>