<template>
  <div class="nav-link">
    <ul class="nav-link-ul">
      <li class="nav-link-item">
        <a href="/" class="link">
          <svg
            class="icon"
            :class="miniIcon?'icon-navbar_mini':'icon-navbar_logo'"
            aria-hidden="true"
          >
            <use :xlink:href="miniIcon?'#icon-navbar_mini':'#icon-navbar_logo'" />
          </svg>
          主站
        </a>
      </li>
      <li class="nav-link-item" v-for="(item,index) in navList" :key="index">
        <a :href="item.link" target="_blank" class="link">{{item.name}}</a>
      </li>
      <!-- <li class="nav-link-item" v-if="bw[2954] != null">
        {{bw}}
        <a href="/" target="_blank" class="link loc-moveclip">
          <div class="loc-mc-box">
            <p class="bnj-txt bnj-up">{{bw[2954][0].name}}</p>
            <img class="bnj-gif" :src="bw[2954][0].pic" alt="menuName" />
            <p class="bnj-txt bnj-down">{{bw[2954][0].name}}</p>
          </div>
        </a>
      </li> -->
      <download-pop></download-pop>
    </ul>
  </div>
</template>

<script>
import downloadPop from "../Popover/Download.vue";
export default {
  props: ["bw", "miniIcon"],
  data() {
    return {
      navList: [
        { name: "番剧", link: "/" },
        { name: "游戏中心", link: "/" },
        { name: "直播", link: "/" },
        { name: "会员购", link: "//show.qnets.cn/" },
        { name: "漫画", link: "/" },
        { name: "赛事", link: "/" },
      ],
    };
  },
  components: {
    downloadPop,
  },
};
</script>

<style lang="less" scoped>
.nav-link-ul {
  display: flex;
  align-items: center;
  height: 36px;
  overflow: hidden;
  /deep/ .nav-link-item {
    margin-right: 12px;
    .link {
      display: flex;
      align-items: center;
      white-space: nowrap;
      text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
      font-size: 14px;
      color: #fff;
    }
  }
}
.loc-moveclip,
.loc-mc-box {
  width: 54px;
  overflow: hidden;
}
.loc-moveclip {
  height: 36px;
  align-items: flex-start !important;
  .loc-mc-box {
    height: 108px;
    position: relative;
    animation: locmoveclipslider 10s ease-out infinite;
    animation-delay: 4.5s;
    .bnj-txt {
      line-height: 36px;
      text-align: center;
      width: 100%;
    }
    .bnj-up {
      position: absolute;
      left: 0;
      top: 0;
    }
    .bnj-gif {
      position: absolute;
      left: 0;
      top: 36px;
      width: 54px;
      height: 36px;
      transform: translateZ(0);
    }
    .bnj-down {
      position: absolute;
      left: 0;
      top: 72px;
    }
  }
}
.icon-navbar_mini {
  font-size: 18px;
  margin-right: 6px;
}
.icon-navbar_logo {
  font-size: 78px;
  margin-right: 12px;
}
/deep/ .icon-navbar_phone {
  font-size: 19px;
  margin-right: 2px;
}
@keyframes locmoveclipslider {
  1% {
    transform: translateY(0px);
  }
  5% {
    transform: translateY(-36px);
  }
  50% {
    transform: translateY(-36px);
  }
  55% {
    transform: translateY(-72px);
  }
  100% {
    transform: translateY(-72px);
  }
}
</style>