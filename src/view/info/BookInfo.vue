<template>
    <div>
       <BookDesc />
    </div>
</template>

<script>
import mixins from "@u/mixins.js"
import BookDesc from '@c/bookDesc/BookDesc.vue'
export default {
	data(){
        return {

        }
    },
    components:{
        BookDesc
    },
    mounted() {
        window.scrollTo(0,0)
        let id = this.$route.params.id
        this.updateModel("bookId",id)
        this.$store.dispatch("getBookInfo", id).then(()=>{
            this.$store.dispatch("getBookChapters", id);
            this.$store.dispatch("getShortReview", id);
        });
       
    },
    created() {
    },
	mixins:[mixins]
}
</script>

<style lang="scss" scoped="">
</style>