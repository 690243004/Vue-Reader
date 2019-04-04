<template>
    <div class="rank-wrapper">
        <div class="rank-title" ><span>{{rank.title}}</span></div>
        <div class="rank-list-wrapper">
            <div class="rank-list-item" 
            :key="index"
            v-for="(item,index) in rank.books"
            >
                <span>{{index+1}}</span>
                <a href="javascript:void(0)" class="font-a" >{{item.title}}</a>
            </div>
        </div>
    </div>
</template>

<script>
import mixins from "@u/mixins.js"
export default {
	data(){
        return {

        }
    },
    mixins:[mixins],
    mounted(){
        this.$store.dispatch("rankingsAsnc")
    }
}
</script>

<style lang="scss" scoped="">
@import '../../assets/styles/global';
.rank-wrapper {
    padding: px2rem(10) ;
    .rank-title {
        padding: px2rem(10) ;
        box-sizing: border-box;
        height: px2rem(100);
       // @include center;
         background: #333;
         border-radius: px2rem(10);
        border-bottom: px2rem(1) solid #DFDFDF;
        span {
            font-size: px2rem(12);
            color: #fff;
        }
     /*    span::before{
			content: '.';
			width: px2rem(3);
			background:  #5E5E5E;
			margin-right: px2rem(7);
		} */
    }
    .rank-list-wrapper {
        font-size: px2rem(12);
        .rank-list-item:nth-child(1) {
			span{
				background-color: #FF4644;
			}
		}
        .rank-list-item:nth-child(2) {
			span{
				background-color: #E28D29;
			}
		}
		.rank-list-item:nth-child(3) {
			span{
				background-color: #9FC575;
			}
		}
        .rank-list-item{
			height: px2rem(30);
			border-bottom: px2rem(1) solid #DFDFDF;
			line-height: px2rem(30);
			span{
				display: inline-block;
				width: px2rem(15);
				height: px2rem(15);
				line-height: px2rem(15);
				background-color: #8F8F8F;
				border-radius: 50%;
				color: #fff;
				margin-right: px2rem(5);
				text-align: center;
			}
		}
    }
}
</style>