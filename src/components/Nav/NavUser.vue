<template>
  <div class="nav-user-center">
    <div class="user-con search-icon">
      <a href="/" target="_blank">
        <svg class="icon icon-search" aria-hidden="true">
          <use xlink:href="#icon-search" />
        </svg>
      </a>
    </div>
    <div class="user-con" v-if="$store.state.isLogin == -101">
      <div class="item">
        <login-pop @login="login"></login-pop>
      </div>
      <div class="item">
        <a href="/" class="txt">注册</a>
      </div>
    </div>
    <div class="user-con" v-if="$store.state.isLogin == 0">
      <div class="item">
        <user-pop @logout="logout"></user-pop>
      </div>
      <div class="item">
        <vip-pop></vip-pop>
      </div>
      <div class="item">
        <msg-pop></msg-pop>
      </div>
      <div class="item">
        <dongtai-pop></dongtai-pop>
      </div>
      <div class="item">
        <favorite-pop></favorite-pop>
      </div>
      <div class="item">
        <history-pop></history-pop>
      </div>
      <div class="item">
        <span class="txt name">
          <a href="/">创作中心</a>
        </span>
      </div>
    </div>
    <div>
      <upload-pop></upload-pop>
    </div>
  </div>
</template>

<script>
import { delCookie } from "../../assets/js/cookie.js";
import userPop from "../Popover/User.vue";
import msgPop from "../Popover/Message.vue";
import vipPop from "../Popover/Vip.vue";
import loginPop from "../Popover/Login.vue";
import dongtaiPop from "../Popover/Dongtai.vue";
import favoritePop from "../Popover/Favorites.vue";
import historyPop from "../Popover/History.vue";
import uploadPop from "../Popover/Upload.vue";
export default {
  data() {
    return {};
  },
  methods: {
    getUserInfo() {
      this.$http.get("/api/x/web-interface/nav").then((res) => {
        this.$store.commit("isLogin", res.data.code);
        if (res.data.code == 0) {
          this.$store.commit("userinfo", res.data.data);
        }
        console.log(res.data);
      });
    },
    login() {
      this.$router
        .push({
          path: "/login",
        })
        .catch((data) => {});
    },
    logout() {
      //TODO
      this.$http.get("/login/login?act=exit").then((res) => {
        this.$router.go(0);
      });
    },
  },
  created() {
    this.getUserInfo();
  },
  components: {
    loginPop,
    userPop,
    msgPop,
    vipPop,
    dongtaiPop,
    favoritePop,
    historyPop,
    uploadPop
  },
};
</script>

<style lang="less" scoped>
.nav-user-center {
  display: flex;
  line-height: 36px;
  flex-shrink: 0;
  .icon-search {
    font-size: 22px;
  }
  .search-icon {
    display: none;
  }
}
.user-con {
  display: flex;
  align-items: center;
  a {
    display: flex;
    align-items: center;
  }
  .item {
    position: relative;
    margin-left: 12px;
    display: flex;
    cursor: pointer;
    /deep/ .txt {
      color: #fff;
      white-space: nowrap;
      font-size: 14px;
      line-height: 32px;
      text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
      a {
        color: #fff;
      }
    }
    /deep/ .name {
      display: flex;
      align-items: center;
    }
    /deep/ .logout-face {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      margin-right: 5px;
      border: 1px solid silver;
    }
    /deep/ .login-face {
      width: 36px;
      height: 36px;
      border-radius: 50%;
    }
    a {
      white-space: nowrap;
      text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
      font-size: 14px;
      color: #fff;
    }
  }
}
/deep/ .upload-btn {
  cursor: pointer;
  position: relative;
  color: #fff;
  font-size: 14px;
  display: block;
  width: 100px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  background: #fb7299;
  border-radius: 2px;
  margin-left: 14px;
}
@media screen and (max-width: 1190px) {
  .nav-user-center {
    .search-icon {
      display: flex;
    }
  }
}
</style>