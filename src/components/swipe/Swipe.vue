<template>
    <div>
       <mt-swipe :auto="4000">
            <mt-swipe-item>
                <img src="../../assets/img/s1.jpg">
            </mt-swipe-item>
            <mt-swipe-item>
                <img src="../../assets/img/s2.jpg">
            </mt-swipe-item>
            <mt-swipe-item>
                <img src="../../assets/img/s3.jpg">
            </mt-swipe-item>
            <mt-swipe-item>
                <img src="../../assets/img/s4.jpg">
            </mt-swipe-item>
        </mt-swipe>
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
.mint-swipe {
    height: px2rem(120);
    padding:0 px2rem(10);
    margin: px2rem(10) 0;
	img{
        width: 100%;
        border-radius: px2rem(10);
		height: 100%;
    }
    
}
</style>