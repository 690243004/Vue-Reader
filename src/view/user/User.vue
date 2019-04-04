<template>
  <div class="user">
    <div class="avator-wrapper">
      <div class="avator" @click="chooseType()">
        <input
          @change="fileChange($event)"
          type="file"
          id="upload_file"
          multiple
          style="display: none"
        >
        <img id="image" :src="user.avatar">
      </div>
      <div class="name" v-if="user.status!==0">未登录</div>
      <div class="name" v-if="user.status === 0">{{user.username}} <a>点击修改</a></div>
    </div>

    <div class="info-wrapper">
      <div class="info-item">
        <div class="info-item-icon">
          <img src="../../assets/icon_hrwvcko172r/shudan.png">
        </div>
        <div class="info-item-title" @click="getCollectionList()">我的收藏</div>
      </div>
      <div class="info-item" @click="feedBack()">
        <div class="info-item-icon">
          <img src="../../assets/icon_hrwvcko172r/fankui.png">
        </div>
        <div class="info-item-title">反馈建议</div>
      </div>

      <div class="info-item" @click="logout()">
        <div class="info-item-icon">
          <img src="../../assets/icon_hrwvcko172r/tuichu.png">
        </div>
        <div class="info-item-title">退出</div>
      </div>
    </div>
    <Popup v-model="collectFlag" popup-transition="popup-fade">
      <div class="popup">
        <div class="popup-item" v-for="(item,index) in collect.slice(0,6)" :key="index">
          <img :src="url+item.cover">
          <div>{{item.title}}</div>
        </div>
        <div class="next">
            <div><</div>&nbsp &nbsp
          <span>  {{collect.length}}</span>
              &nbsp &nbsp
            <div>></div>
        </div>
      </div>
    </Popup>
  </div>
</template>

<script>
import mixins from "@u/mixins.js";
import qs from "qs";
import MD5 from "js-md5";
import axios from "axios";
import { MessageBox, Popup } from "mint-ui";
import { get } from "lodash";
const request = axios.create({
  baseURL: "/user",
  timeout: 5000
  // headers: {'X-Custom-Header': 'foobar',}
});
export default {
  data() {
    return {
      collectFlag: false,
      collect: []
    };
  },
  components: {
    Popup
  },
  mixins: [mixins],
  methods: {
    fileChange(e) {
      console.log(e.target.files[0]);
      let file = e.target.files[0];
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          resolve(reader);
        };
        reader.onerror = reject;
      }).then(res => {
        let { result } = res;
        /*        let img = document.getElementById("image")
                img.setAttribute("src",result) */
        // 修改用户头像地址
        request
          .post("/uploadAvatar", {
            _id: this.user._id,
            avatar: result
          })
          .then(res => {
            const {
              data: { user, err_code = 1 }
            } = res;
            if (err_code === 0) {
              this.updateModel("user", user);
              console.log(user.avatar);
            }
          });
      });
    },
    chooseType() {
      if (this.user.status === -1) {
        return this.$router.push("/login");
      }
      document.getElementById("upload_file").click();
    },
    feedBack() {
      let { user } = this;
      let { username, _id: userId } = user;
      if (user.status === -1) {
        MessageBox.alert("请先登录");
      }
      MessageBox.prompt("请输入建议", "").then(({ value, action }) => {
        request
          .post("feedBack", { username, userId, content: value })
          .then(res => {
            if (res.status === 200) {
              MessageBox.alert("反馈成功");
            }
          });
      });
    },
    logout() {
      MessageBox.confirm("确定退出吗？").then(action => {
        this.updateModel("user", {
          avatar: "../../assets/icon_hrwvcko172r/touxiang.png",
          username: "",
          status: -1 // -1代表未登录 0代表已经登录
        });
      });
    },
    // 获取收藏列表
    getCollectionList() {
      const { user } = this;
      const { _id } = user;
      request.post("userDetail", { _id }).then(res => {
        if (res.status === 200) {
          // 更新个人信息
          this.updateModel("user", res.data.user).then(() => {
            this.collect = get(this.user, "collect");
            this.collectFlag = true;
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";
.user {
  padding: px2rem(10) px2rem(10);
  .avator-wrapper {
    height: px2rem(150);
    background: #333333;
    border-radius: px2rem(10);
    display: flex;
    .avator {
      // padding-top: px2rem(20);
      padding: px2rem(10) px2rem(10);
      // @include center;
      flex: 0 0 px2rem(65);
      img {
        border-radius: 50%;
        width: px2rem(50);
        height: px2rem(50);
      }
    }
    .name {
      color: #fff;
      font-size: px2rem(12);
      line-height: px2rem(50);
      a {
          color:aqua;
          font-size: px2rem(9);
      }
    }
  }
  .info-wrapper {
    .info-item {
      display: flex;
      height: px2rem(30);
      // background:#66ccff;
      box-sizing: border-box;
      border-bottom: px2rem(1) solid #999;
      &::after {
        display: block;
        content: ">";
        position: absolute;
        right: px2rem(15);
        margin-top: px2rem(5);
        font-size: px2rem(18);
        color: #333;
      }
      .info-item-icon {
        flex: 0 0 px2rem(40);
        @include center;
        img {
          width: px2rem(15);
          height: px2rem(15);
        }
      }
      .info-item-title {
        font-size: px2rem(10);
        @include center;
        color: #000;
      }
    }
  }
  .divider {
    background: #eee;
    height: px2rem(5);
  }

  .popup {
    height: px2rem(210);
    width: px2rem(200);
    padding: px2rem(10);
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    .next {
      font-size: px2rem(12);
      width: 100%;
      @include center;
      color:aqua;
      span {
          color:#000;
      }
    }
    .popup-item {
      flex: 0 0 px2rem(60);
      height: px2rem(100);
      display: flex;
      margin-left: px2rem(5);
      flex-direction: column;
      img {
        width: px2rem(60);
        height: px2rem(80);
      }
      div {
        width: px2rem(60);
        line-height: px2rem(20);
        font-size: px2rem(10);
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>