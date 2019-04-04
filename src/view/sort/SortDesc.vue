<template>
    <div>
        <DescHeader/>
        <Major :majorAndMinor="majorAndMinor"/>
        <RecommandList :recList="sortDescList" :url="url"  />
    </div>
</template>

<script>
import mixins from "@u/mixins.js"
import DescHeader from '@c/common/DescHeader.vue'
import RecommandList from '@c/list/RecommandList.vue'
import Major from '@c/major/Major.vue'
export default {
	data(){
        return {

        }
    },
    components:{
        DescHeader,
        RecommandList,
        Major
    },
    mounted() {
        let { major='',minor='' } = this.$route.params
        let majorAndMinor = this.sortList.find(item=>item.major === major)
        majorAndMinor['currentMinor'] = minor
        this.updateModel('majorAndMinor',majorAndMinor)
        this.$store.dispatch('getSortListByMajor',{  major,minor })
    } ,
	mixins:[mixins]
}
</script>

<style lang="scss" scoped="">
</style>