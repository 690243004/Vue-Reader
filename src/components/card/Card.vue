<template>
    <div class="card-wrapper">
        <div class="card-title">为你推荐</div>
        <div class="card-tips"></div>
        <div class="card-list" >
            <div class="card-list-item" v-for="(item,index) in books" :key="index">
                <div class="card-list-item-img">
                    <img :src="url+item.cover">
                </div>
                <div class="card-list-item-title">
                    {{item.title}}
                </div>
            </div>
            <div>
            </div>
        </div>
        <div class="card-replace" @click="replaceSome()">换一批</div>
    </div>
</template>

<script>
import mixins from "@u/mixins.js"
export default {
	data(){
        return {
            curnum:0
        }
    },
    props: {
       books: {
           type:Array,default:[]
       } 
    },
    mixins:[mixins],
    mounted(){
        // this.books = this.maleList.slice(this.curnum,3);
    },
    methods: {
        replaceSome() {
            this.curnum  = parseInt(this.curnum) +3
            if(this.curnum+3>= this.maleList.length) {
                this.curnum = 0
            }
            this.books = this.maleList.slice( this.curnum,this.curnum+3)
        }
    }
}
</script>

<style lang="scss" scoped="">
@import '../../assets/styles/global';
.card-wrapper {
    padding: px2rem(10);
    .card-title {
        font-size: px2rem(15);
        font-weight: bold;
    }
    .card-tips{}
    .card-list{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .card-list-item {
            margin:px2rem(10) 0;
            .card-list-item-img {
                width: px2rem(50);
                img {
                   width: px2rem(60);
                    height: px2rem(80);
                }
            }
            .card-list-item-title {
                font-size: px2rem(9);
                font-weight: 400;
            }
        }
    }
    .card-replace{
      
        font-size: px2rem(11);
        line-height: px2rem(25);
        border: px2rem(0.5) solid #999;
        border-radius: px2rem(25);
        text-align: center;
        color:dodgerblue
    }
}
</style>