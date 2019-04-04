<template>
    <div>
        <SortList />
    </div>
</template>

<script>
import mixins from "@u/mixins.js"
import SortList from '@c/list/SortList.vue'
export default {
	data(){
        return {

        }
    },
    components:{
        SortList
    },
    mounted() {
        // 获取分类列表
        this.$store.dispatch('getSortList')
    } ,
	mixins:[mixins]
}
</script>

<style lang="scss" scoped="">
</style>