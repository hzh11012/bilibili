<template>
  <el-popover :open-delay="300" :close-delay="300" placement="bottom" width="324" trigger="hover">
    <div class="login-container">
      <p class="title">登录后你可以：</p>
      <div class="img-panel">
        <img src="//static.hdslb.com/images/danmu.png" />
        <img src="//static.hdslb.com/images/danmu.png" style="left:290px" />
      </div>
      <div class="btn-box">
        <a href="/" class="btn reg-btn">注册</a>
        <a href="/#/login" class="btn">登录</a>
      </div>
    </div>
    <span slot="reference" class="txt name" @click="login">
      <img class="logout-face" src="http://static.hdslb.com/images/akari.jpg" />
      登录
    </span>
  </el-popover>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    login() {
      this.$emit("login");
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px;
}
.title {
  font-size: 14px;
  color: #212121;
  margin-bottom: 15px;
}
.img-panel {
  position: relative;
  width: 290px;
  height: 180px;
  background-color: #eee;
  overflow: hidden;
  background: url(//static.hdslb.com/images/base/danmu.png) no-repeat 50%;
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    animation: trans 4s linear infinite normal;
  }
}
.btn-box {
  display: flex;
  justify-content: space-between;
  .btn {
    display: inline-block;
    cursor: pointer;
    width: 48%;
    height: 38px;
    line-height: 38px;
    text-align: center;
    background-color: #00a1d6;
    color: #fff;
    font-size: 14px;
    border-radius: 2px;
    margin-top: 16px;
    transition: 0.3s ease;
    border: 1px solid #00a1d6;
  }
  .reg-btn {
    background-color: #fff;
    color: #00b5e5;
  }
}
@keyframes trans {
  0% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(-290px);
  }
}
</style>