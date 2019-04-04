<template>
     <div class="bookDesc-header">
        <span @click="goBack()" class="icon-back"></span>
    </div>
</template>

<script>
import mixins from "@u/mixins.js"
export default {
	data(){
        return {

        }
    },
	mixins:[mixins]
}
</script>

<style lang="scss" scoped="">
  @import "../../assets/styles/global";

 .bookDesc-header {
    height: px2rem(30);
    color: #A1A1A1;
    background: #fff;
    display: flex;
    align-items: center;
    border-bottom: px2rem(1) solid #eee;
    .icon-back {
        font-size: px2rem(16);
    }  
  }
</style>