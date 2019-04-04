<template>
    <div class="login">
        <DescHeader />
        <div class="login-icon-wrapper">
            <div class="login-icon-wrapper-icon">
                <img src="../../assets/img/logo.jpg">
            </div>
        </div>
        <div class="login-input-wrapper">
            <mt-field label="用户名" placeholder="Input username"  v-model="username"></mt-field>
            <mt-field label="密码" placeholder="Input password" type="password" v-model="password"></mt-field>
            <div class="login-input-button">
                <mt-button size="large" @click="login()" type="primary">登录</mt-button>
            </div>
             <div class="login-input-button">
                <mt-button size="large" @click="register()" type="default">注册</mt-button>
            </div>
        </div>

    </div>
</template>

<script>
import mixins from "@u/mixins.js"
import qs from 'qs'
import DescHeader from '@c/common/DescHeader.vue'
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
            password:''
        }
    },
    mixins:[mixins],
    components:{
        DescHeader
    },
    methods:{
        login(){
            let { username ,password} = this
            if(!username || !password) {
                return MessageBox('提示', '必须输入用户名与密码');
            }
            request.post("/login",{email:username,password}).then(res=> {
                if(res.data.err_code !== 1) {
                    this.updateModel("user",res.data.user)
                    .then(()=>{
                        MessageBox('提示', '登录成功');
                        this.$router.push('/user')
                    })
                } else {
                    MessageBox('错误', res.data.message);
                }
                
            }).catch(err=>{
                MessageBox('错误', err);
            })
           // this.$router.push('/home')
        },
        register(){
            this.$router.push('/register')
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