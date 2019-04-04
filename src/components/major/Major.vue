<template>
    <div class="major-wrapper">
        <span class="major-wrapper-item" @click="changeTab('')" :class="{'selected':majorAndMinor.currentMinor===''}">全部</span>
        <span 
        @click="changeTab(item)"
        v-for="(item,index) in majorAndMinor.mins"
        :key="index"
        :class="{'selected':majorAndMinor.currentMinor===item}"
        class="major-wrapper-item"
        >{{item}}</span>
    </div>
</template>

<script>
import mixins from "@u/mixins.js"
export default {
	data(){
        return {

        }
    },
    methods:{
        changeTab(item){
            let obj = Object.assign({},this.majorAndMinor)
            obj.currentMinor = item
            this.updateModel('majorAndMinor',obj).then(()=>{
                this.$store.dispatch("getSortListByMajor",{major:obj.major,minor:obj.currentMinor})
            })
        }
    },
	mixins:[mixins]
}
</script>

<style lang="scss" scoped="">
@import "../../assets/styles/global";
.major-wrapper {
    width: 100%;
    display: flex;
    padding:0 px2rem(10);
    .major-wrapper-item {
        font-size: px2rem(12);
        line-height: px2rem(20);
        margin-left: px2rem(10);
        &:first-child {
            margin: 0;
        }
    }
    .selected {
        color:  rgb(237, 66, 75);
    }
}
</style>