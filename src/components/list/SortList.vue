<template>
  <div class="sort-list-wrapper">
      <!-- 男性分类 -->
    <div class="sort-list-item" v-for="(item,index) in sortList" :key="index+item.major">

        <div @click="$router.push({path: '/sortDescription/'+item.major})" class="sort-item-title">
			<span class="sort-item-title-arrow arrow">{{item.major}}</span>
		</div>

        <div class="sort-item-subItem-wrapper">
            <div 
            @click="$router.push({path: '/sortDescription/'+item.major+'/'+sub})"
            class="sort-item-subItem-item" v-for="sub in item.mins" :key="sub">
                {{sub}}
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
  mixins: [mixins],
  mounted(){
  }
};
</script>

<style lang="scss" scoped="">
@import "../../assets/styles/global";

.sort-list-wrapper {
    padding: 0 px2rem(10);
    width: 100%;
    box-sizing: border-box;
    .sort-list-item {
        margin-top:px2rem(10); 
        &:first-child {
            margin: 0;
        }
        .sort-item-title {
            border-bottom: px2rem(1) solid #888;
            height: px2rem(30);
            line-height: px2rem(30);
            .sort-item-title-arrow {
                font-size: px2rem(14);
            }
        }
        .sort-item-subItem-wrapper {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-wrap: wrap;
            .sort-item-subItem-item {
                margin-top: px2rem(10);
                font-size: px2rem(10);
                border: px2rem(1) solid #888;
                border-radius: 5%;
                padding: px2rem(5);
                color:  #888;
                margin-left:px2rem(5);
                box-sizing: border-box;
                @include center;
            }
         /*    .sort-item-subItem-item:hover {
                border-bottom: 1px solid #888;
            } */
        }
    }
}

.arrow{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.arrow::after{
	content: '';
	display: block;
	height: px2rem(8);
	width: px2rem(8);
	border-top: px2rem(1) solid green;
	border-right: px2rem(1) solid green;
	transform: rotate(45deg);
}
</style>