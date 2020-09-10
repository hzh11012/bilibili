<template>
  <div class="interHeader">
    <nav-header :miniIcon="banner" :bw="navBw"></nav-header>
    <div v-if="banner" class="nav-banner" :style="{backgroundImage:'url('+ navBw[142][0].pic +')'}">
      <div class="taper-line"></div>
      <div class="b-logo b-wrap" style="margin:0">
        <a href="/" class="head-logo">
          <img class="logo-img" :src="navBw[142][0].litpic" />
        </a>
        <a
          v-if="navBw[142][0].name!=''"
          href="/"
          class="head-title"
          target="_blank"
        >{{navBw[142][0].name}}</a>
      </div>
    </div>
    <div v-if="banner" class="b-wrap">
      <menu-header></menu-header>
    </div>
  </div>
</template>

<script>
import navHeader from "../components/Nav/Nav.vue";
import menuHeader from "../components/Nav/Menu.vue";
export default {
  props: ["banner"],
  data() {
    return {
      navBw: {
        142: {
          0: "",
        },
        2954: {
          0: " ",
        },
      },
    };
  },
  methods: {
    //获取主页nav区域的pic
    getBw() {
      this.$http
        .get(
          "/api/x/web-show/res/locs?pf=0&ids=142%2C2837%2C2836%2C2870%2C2953%2C2954%2C2955%2C2956"
        )
        .then((res) => {
          this.navBw = res.data.data;
        });
    },
  },
  created() {
    this.getBw();
  },
  components: {
    navHeader,
    menuHeader,
  },
};
</script>

<style lang="less" scoped>
.interHeader {
  position: relative;
  z-index: 5;
}
.nav-banner {
  position: relative;
  margin: 0 auto;
  min-height: 155px;
  min-width: 999px;
  height: 9.375vw;
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
  background-image: url("//ftp.qnets.cn/bilibili/navHeaderbg.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center 0;
  &:hover {
    cursor: pointer;
    .b-logo {
      .head-title {
        opacity: 1;
      }
    }
  }
  .taper-line {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100px;
    background: linear-gradient(rgba(0, 0, 0, 0.4), transparent);
  }
  .b-logo {
    position: relative;
    .head-logo {
      position: absolute;
      width: auto;
      height: 50%;
      min-height: 60px;
      bottom: 10px;
      z-index: 1;
      .logo-img {
        height: 100%;
      }
    }
    .head-title {
      position: absolute;
      bottom: 25px;
      left: 280px;
      padding: 6px 10px;
      background-color: rgba(0, 0, 0, 0.68);
      opacity: 0;
      max-width: 350px;
      font-size: 14px;
      border-radius: 4px;
      color: white;
      line-height: 20px;
      transition: all 0.2s;
    }
  }
}
</style>