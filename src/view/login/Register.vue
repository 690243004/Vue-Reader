<template>
    <div class="login">
        <DescHeader />
        <div class="login-input-wrapper">
            <mt-field label="用户名" placeholder="Input username"  v-model="username"></mt-field>
            <mt-field label="密码" placeholder="Input password" type="password" v-model="password"></mt-field>
            <mt-field label="确认密码" placeholder="confirm password" type="password" v-model="confirm"></mt-field>
            <div class="login-input-button">
                <mt-button size="small" @click="register()" type="primary">ok</mt-button>
            </div>
        </div>

    </div>
</template>

<script>
import mixins from "@u/mixins.js"
import DescHeader from '@c/common/DescHeader.vue'
import qs from 'qs'
import MD5 from 'js-md5'
import axios from 'axios'
import { MessageBox } from 'mint-ui';
const request = axios.create({
    baseURL: '/user',
    timeout: 5000,
   // headers: {'X-Custom-Header': 'foobar',}
})
export default {
	data(){
        return {
            username:'',
            password:'',
            confirm:''
        }
    },
    mixins:[mixins],
    components:{
        DescHeader
    },
    methods:{
        register(){
            let { username , password } = this
            if(!username || !password){
                return MessageBox('提示', '用户名密码为空');
            }
            request.post("register",{username,password,email:username})
            .then(res=>{
                const { err_code="",message} = res.data
                if(err_code===1) {
                    return MessageBox('错误', message);
                }
                if(err_code === 0) {
                    MessageBox('提示', "注册成功");
                    // 跳转到登录页面
                     return  this.$router.push('/login')
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped="">
@import "../../assets/styles/global";
.login {
    .login-icon-wrapper {
        .login-icon-wrapper-icon {
            @include center;
            img {
                height: px2rem(200);
            }
        }
    }

    .login-input-wrapper {
        .login-input-button {
            padding:px2rem(10);
            @include center;
            &:last-child {
                padding-top:0;
            }
        }
        
    }
}
</style>