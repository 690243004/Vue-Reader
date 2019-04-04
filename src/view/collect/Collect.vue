<template>
    <div>
        <DescHeader />
        <div class="collect-wrapper">
            <div class="collect-item" @touchstart="showDeleteButton" @touchend="clearLoop" v-for="item in user.collect" :key="item._id">
                <img :src="url+item.cover">
                <div class="bookName">{{item.title}}</div>
                <div class="deleteBtn" v-show="isDeleting" @click="deleteBook()">
                    <img src="../../assets/icon_hrwvcko172r/delete.png">
                </div>
            </div>

        </div>
   
    </div>
</template>

<script>
import mixins from "@u/mixins.js"
import DescHeader from '@c/common/DescHeader.vue'
import { MessageBox } from 'mint-ui';
export default {
	data(){
        return {
            root:{},
            isDeleting:false
        }
    },
    mixins:[mixins],
    components:{
        DescHeader
    },
    methods:{
        showDeleteButton(){
            console.log("showDeleteButton")
            clearInterval(this.Loop);//再次清空定时器，防止重复注册定时器
            let self = this
            this.Loop=setTimeout(function(){
                self.isDeleting = true;
            },1000);
        },
        clearLoop() {
            clearInterval(this.Loop);
        },
        deleteBook() {
            MessageBox.confirm('确定移除吗？').then(action => {

            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global';
.collect-wrapper {
    padding: 0 px2rem(10);
    display: flex;
    flex-wrap: wrap;
    .collect-item {
        margin-top: px2rem(12);
        margin-right: px2rem(12);
        width: px2rem(75);
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
            display: block;
            width: 100%;
            height: px2rem(100);
        }
        .bookName {
            margin-top: px2rem(5);
            font-size: px2rem(12);
            text-align: center;
        }
        .deleteBtn {
            position: absolute;
            top:px2rem(-2);
            right: px2rem(-2);
            img {
                width: px2rem(15);
                height: px2rem(15);
            }
        }
    }
}

</style>