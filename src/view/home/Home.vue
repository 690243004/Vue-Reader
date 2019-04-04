<template>
  <div class="home">
    

    <!-- 搜索框 -->
    <div class="home-search">
      <div class="home-search-input-wrapper">
        <div class="home-search-icon">
          <div class="icon-wrapper">
            <span class=" icon icon-search"></span>
          </div>
        </div>
 
        <input
          placeholder="搜索"
          v-model="searchText"
          type="text"
          @keyup.enter="search()"
          @click="showSearchList()"
          class="home-search-input"
        >
        
      </div>
      <div v-if="searchListVisible" @click="hideSearchList()" class="home-search-cancel">取消</div>
    </div>
    <!-- 轮播图 -->
    <Swipe v-show="!searchListVisible"  />
    <Card :books="maleList.slice(0,3)" v-show="!searchListVisible"/>
    <RecommandList v-show="!searchListVisible" :recList="recList" :url="url"/>
    <RecommandList v-show="searchListVisible" :recList="searchList" :url="url"/>
  </div>
</template>

<script>
import mixins from "@u/mixins.js";
import RecommandList from "@c/list/RecommandList.vue";
import Swipe from "@c/swipe/Swipe.vue";
import request from '@u/request.js'
import Card from '@c/card/Card.vue'
export default {
  data() {
    return {
      searchText: "",
      searchListVisible:false,
      searchList:[]
    };
  },
  components: {
    RecommandList,
    Swipe,
    Card
  },
  mixins: [mixins],
  mounted() {
    // 获取男生推荐书籍
    this.$store.dispatch("maleListAsnc");
    // 获取女生推荐书籍
    this.$store.dispatch("feMaleListAsnc");
    // 获取推荐书籍
    this.$store.dispatch("recomandListAsnc");
  },
  methods:{
      showSearchList() {
          this.searchListVisible = true
      },
      hideSearchList() {
        this.searchListVisible = false
        this.searchText = ''
        this.searchList = [];
      },
      search() {
          console.log("232323",this.searchText)
          request.get(`search?keyword=${this.searchText}`).then((res)=>{
              this.searchList = res.data.books
          })
      }
  }
};
</script>

<style lang="scss" scoped="">
@import "../../assets/styles/global";
@import "../../assets/styles/icon.css";
.home {
  padding-bottom: px2rem(40);
}
.home-search {
  display: flex;
  // width: 100%;
  height: px2rem(25);
  box-sizing: border-box;
  border-radius: px2rem(15);
  padding: 0 px2rem(15);
  background: #eee;
  margin: px2rem(10) px2rem(10);
  .home-search-input-wrapper {
 
    flex: 1;
    @include center;
    .home-search-icon {
      flex: 0 0 px2rem(28);
      @include center;
      font-size: px2rem(12);
      .icon-wrapper {
        .icon-search {
        }
      }
    }
    .home-search-input {
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
  .home-search-cancel {
    flex: 0 0 px2rem(50);
    font-size: px2rem(14);
    @include right;
  }
}
</style>