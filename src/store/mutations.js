// 增加数量
export const  increment = (state)=>{
    state.count++;
}
// 回退
export const goBack = ()=>{
    this.$router.go(-1)
}
// 载入方法
export const loading = (state,extra)=>{
    state.loading = extra
    console.log(state.loading)
}
