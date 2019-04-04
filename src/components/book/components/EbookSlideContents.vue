<template>
  <div class="ebook-slide-contents">
    <div class="slide-contents-search-wrapper">
      <!-- 搜索框 -->
      <div class="slide-contents-search-input-wrapper">
        <div class="slide-contents-search-icon">
          <div class="icon-wrapper">
            <span class="icon-search"></span>
          </div>
        </div>

        <input
          placeholder="搜索"
          v-model="searchText"
          type="text"
          @click="showSearchPage()"
          
          class="slide-contetns-search-input"
        >
      </div>
      <!-- 取消按钮 -->
      <div
        v-if="searchVisible"
        @click="hideSearchPage()"
        class="slide-contents-search-cancel"
      >取消</div>
    </div>

    <div v-show="!searchVisible" class="slide-contents-book-wrapper">
      <div class="slide-contents-book-img-wrapper">
        <img :src="url+currentBook.cover"  class="slide-contents-book-img">
      </div>
      <div class="slide-contents-book-info-wrapper">
          <div class="slde-contents-book-title">{{currentBook.title}}</div>
          <div class="slde-contents-book-author">作者：{{currentBook.author}}</div>
      </div>

      <div class="slide-contents-book-progress-wrapper">
          <div class="slide-contents-book-progress">
          </div>
          <div class="slide-contents-book-time"></div>
        </div>
    </div>

    <Scroll v-show="!searchVisible" class="slide-contents-list" :top="156" :bottom="48" ref="scoll" >
      <div class="slide-contents-item" v-for="(item,index) in bookChapters" :key="index">
        <span @click=" skip(index)" :class="{'selected':num === index}" 
          class="slide-contents-item-label">{{item.title}}
        </span>
        <span class="slide-contents-item-page">
        </span>
      </div>
    </Scroll>

    <Scroll class="slide-search-list" 
        :top="66" 
        :bottom="48" ref="scoll" v-show="searchVisible" > 
      <div class="slide-search-item" v-for="(item,index) in searchList" :key="index">
           <span @click=" skip(index)" :class="{'selected':num === index}" 
          class="slide-contents-item-label">{{item.title}}
        </span>
      </div>
    </Scroll>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import mixins from "@u/mixins.js"
import Scroll from '../../common/Scroll.vue'
import { px2rem } from '@u/utils'
//:class="{'hide-box-shadow': settingVisible >= 0 || !menuVisible}"
export default {
  data() {
    return {
      searchVisible: false,
      searchList:[],
      searchText:''
    };
  },
  mixins: [mixins],
  methods: {
    hideSearchPage() {
      this.searchVisible = false;
      this.searchText = ""
      this.searchList = null
    },
    showSearchPage() {
      this.searchVisible = true;
    },

    skip(num) {
      this.$store.dispatch('bookNextAsnc',{num})
      this.updateModel('menuVisible',false)
    },
    contentItemStyle(item) {
      return {
        marginLeft : `${px2rem(item.level * 15)}rem`
      }
    },
    doSearch(q) {
    },
    search() {
      if(this.searchText && this.searchText.length>0 ) {
        
      }
    }
  },
  mounted() {
    this.searchList = this.bookChapters
  },
  components: {
    Scroll
  },
  computed: {},
  watch: {
    searchText:function(e) {
      this.searchList = this.bookChapters.filter(item=> ~item.title.indexOf(e))
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/global";
.ebook-slide-contents {
  width: 100%;
  font-size: 0;
  .slide-contents-search-wrapper {
    display: flex;
    width: 100%;
    height: px2rem(36);
    margin: px2rem(20) 0 px2rem(10) 0;
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .slide-contents-search-input-wrapper {
      flex: 1;
      @include center;
      .slide-contents-search-icon {
        flex: 0 0 px2rem(28);
        @include center;
        font-size: px2rem(12);
      }
      .slide-contetns-search-input {
        flex: 1;
        width: 100%;
        height: px2rem(32);
        background: transparent;
        border: none;
        font-size: px2rem(14);
        &:focus {
          outline: none;
        }
      }
    }
    .slide-contents-search-cancel {
      flex: 0 0 px2rem(50);
      font-size: px2rem(14);
      @include right;
    }
  }

  .slide-contents-book-wrapper {
    display: flex;
    width: 100%;
    height: px2rem(90);
   // background: orange;
    padding:px2rem(10) px2rem(15) px2rem(20) px2rem(15);
    box-sizing: border-box;
    .slide-contents-book-img-wrapper {
      flex: 0 0 px2rem(45);
      .slide-contents-book-img {
        width: px2rem(45);
        height : px2rem(60);
      }
    }
    .slide-contents-book-info-wrapper {
      flex:1;
      padding: 0 px2rem(10);
      .slde-contents-book-title {
        font-size: px2rem(14);
        width: px2rem(153.7);
        @include ellipsis2(2);
      }
      .slde-contents-book-author {
        font-size: px2rem(12);
        margin-top: px2rem(15);
        @include ellipsis;
        width: px2rem(153.7);
      }
    }
    .slide-contents-book-progress-wrapper {
      flex: 0 0 px2rem(70);
      .slide-contents-book-progress {
        .progress{
          font-size: px2rem(14);
        }
        .progress-text {
          font-size: px2rem(12);
        }
      }
      .slide-contents-book-time {
        font-size: px2rem(12);
      }
    }
  }

  .slide-contents-list {
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .slide-contents-item {
      display: flex;
      padding: px2rem(20) 0 ;
      box-sizing: border-box;
      .slide-contents-item-label {
        flex:1;
        font-size: px2rem(12);
        //@include ellipsis;
        &.selected {
          font-weight: bold;
        }
      }
    }
  }


  .slide-search-list {
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .slide-search-item {
      font-size: px2rem(14);
      line-height: px2rem(16);
      padding:px2rem(20) 0;
      box-sizing: border-box;
    }
  }
}
</style>