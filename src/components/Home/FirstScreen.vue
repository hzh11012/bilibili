<template>
  <div class="first-screen">
    <div class="b-wrap" v-if="isbanner && istop">
      <div class="space-between">
        <div class="home-silde">
          <el-carousel trigger="click" arrow="never">
            <el-carousel-item v-for="(item,index) in banner" :key="index">
              <a href="/" target="_blank">
                <img :src="item.pic+'@880w_388h_1c_95q.webp'" :alt="item.name" />
                <p class="title">
                  <i v-if="item.server_type" class="bypb-icon"></i>
                  {{item.name}}
                </p>
              </a>
            </el-carousel-item>
            <a href="/" class="more">
              更多
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiala" />
              </svg>
            </a>
          </el-carousel>
        </div>
        <div class="recommend-box">
          <video-reco v-for="(item,index) in recommend" :key="index" :item="item"></video-reco>
          <div class="btn prev" @click="prev">
            <svg class="icon icon-left" aria-hidden="true">
              <use xlink:href="#icon-xiala" />
            </svg>
          </div>
          <div class="btn next" @click="next">
            <svg class="icon icon-right" aria-hidden="true">
              <use xlink:href="#icon-xiala" />
            </svg>
          </div>
        </div>
      </div>
      <div class="space-between">
        <div class="extension">
          <header class="storey-title">
            <div class="l-con">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-tuiguang" />
              </svg>
              <a target="_blank" class="name no-link">推广</a>
              <div class="text-info">
                <a
                  href="/"
                  target="_blank"
                  v-for="(item,index) in tgLink"
                  :key="index"
                  class="text-info-link"
                >
                  <svg class="icon icon-xinxi_huo" aria-hidden="true">
                    <use xlink:href="#icon-xinxi_huo" />
                  </svg>
                  {{item.name}}
                </a>
              </div>
            </div>
          </header>
          <div class="ext-box">
            <video-tg v-for="(item,index) in tgList" :key="index" :item="item"></video-tg>
          </div>
        </div>
        <div class="bypb-window">
          <div class="online">
            <a href="/" target="_blank">在线列表</a>
          </div>
          <a href="/" target="_blank" class="operate-card">
            <img :src="operateCard[0].pic" :alt="operateCard[0].name" />
            <i v-if="operateCard[0].server_type" class="gg-icon"></i>
          </a>
        </div>
      </div>
      <div class="space-between">
        <div class="extension">
          <header class="storey-title">
            <div class="l-con">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-saishi" />
              </svg>
              <a target="_blank" class="name no-link">电竞赛事</a>
            </div>
          </header>
        </div>
        <div class="bypb-window">asds</div>
      </div>
    </div>
  </div>
</template>

<script>
import videoReco from "./VideoCard/videoCardReco.vue";
import videoTg from "./VideoCard/videoCardTuiguang.vue";
export default {
  data() {
    return {
      active: 0, //当前推荐页
      banner: [],
      isbanner: false,
      recommend: [],
      recommend0: [],
      recommend1: [],
      recommend2: [],
      tgLink: [], //推广模块顶部的 连接
      tgList: [], //推广的视频列表
      operateCard: [{ pic: "" }], //推广模块 最右边的 card 数据
      istop: false,
    };
  },
  methods: {
    getBanner() {
      this.$http(
        "/api/x/web-show/res/locs?pf=0&ids=29%2C34%2C1550%2C3197"
      ).then((res) => {
        this.banner = res.data.data[3197];
        this.tgLink = res.data.data[1550];
        this.tgList = res.data.data[34];
        this.operateCard = res.data.data[29];
        this.isbanner = true;
      });
    },
    getTop() {
      this.$http("/api/x/web-interface/index/top").then((res) => {
        this.recommend = res.data.data.slice(0, 10);
        this.recommend0 = res.data.data.slice(0, 10);
        this.recommend1 = res.data.data.slice(10, 20);
        this.recommend2 = res.data.data.slice(20, 30);
        this.istop = true;
      });
    },
    prev() {
      if (this.active == 0) {
        this.recommend = this.recommend2;
        this.active = 2;
      } else if (this.active == 1) {
        this.recommend = this.recommend0;
        this.active = 0;
      } else {
        this.recommend = this.recommend1;
        this.active = 1;
      }
    },
    next() {
      if (this.active == 0) {
        this.recommend = this.recommend1;
        this.active = 1;
      } else if (this.active == 1) {
        this.recommend = this.recommend2;
        this.active = 2;
      } else {
        this.recommend = this.recommend0;
        this.active = 0;
      }
    },
  },
  created() {
    this.getBanner();
    this.getTop();
  },
  components: {
    videoReco,
    videoTg,
  },
};
</script>

<style lang="less" scoped>
.first-screen {
  min-height: 470px;
}
.home-silde {
  position: relative;
  width: 550px;
  height: 242px;
  overflow: hidden;
  border-radius: 2px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 2px;
    vertical-align: middle;
    border-style: none;
  }
  .title {
    position: absolute;
    bottom: 10px;
    left: 12px;
    display: flex;
    overflow: hidden;
    align-items: center;
    width: 70%;
    color: #fff;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
  }
  .bypb-icon {
    display: inline-block;
    vertical-align: middle;
    width: 38px;
    height: 22px;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAAAsCAMAAAD4va5DAAAAolBMVEX///8AAAAAAAAAAAAAAAACAgIAAAAAAAAGBgb5+fns7OwAAACBgYHq6ur9/f17e3tgYGD09PSoqKiLi4sAAAANDQ3V1dW6urqPj48DAwMAAAD////u7u7j4+MbGxv////b29vBwcH19fXt7e3GxsaLi4ukpKRTU1P4+Pjl5eXh4eHX19fLy8vb29v4+PisrKwvLy86Ojr7+/vy8vK4uLhVVVX0WqNFAAAANnRSTlOZAgULFR0IACCBYxIvW4sxJmk0HxoXU0grJQ6TZl0cj1RFcmtENTUmfGFYTUlGcT4rI4dyMhsJ24tXAAABiElEQVRIx+3XyW6DMBCA4WnAzrCUJUDYCpQAIWuTdHn/V6sNqZqFAwSfqv4HJHP4ZECIAabT6ZOQGARnazKqhuBYI1EqjYjSxpsCt6gUaZr8cJoWSZRr0FiObcCIDNvhWoNJTgYjyxypxWhkw+jsiHJsQjVjPGZodMIxSQMBaVKLySIw+R/jxX5lXK2LFYDqK4/tLCeby+UadwA7XAzECj/Py7KcuXVZ5rnv+zHfmEXYzvbuUOwVyU+IGIYhxxLipp4ne15K2Dm/P0Y2ylV8tyQNWF+yEwS6ac4HYC9w0wLT5vr28tvgy7zD3msbhGHqRm369LZqW/Y4FiJxWR7LdQnBMFR6Ylss4KYkSZ4vYkujJ7bDhbjX6YAruGu9nLGW7THvj1Vo3GNzcrIsq64tFtH7YyeELuz3qaT9MQUrcZiKW3HYISw6MSvQddM0dT0gvbH4eIy7MLS41Who9r9nc+hoXX3Auazy/84HZSAmdjwQOriIHKmEDnuCx1ChA7LI0V3sT4XQ351vRIIkxg4KQCAAAAAASUVORK5CYII=);
    background-size: cover;
    border-radius: 2px;
    margin-right: 3px;
  }
  .more {
    position: absolute;
    z-index: 11;
    opacity: 0;
    transition: opacity 0.3s;
    bottom: 44px;
    right: 12px;
    font-size: 12px;
    padding: 4px 2px 4px 8px;
    background: rgba(0, 0, 0, 0.65);
    color: #fff;
    border-radius: 2px;
    display: flex;
    align-items: center;
    .icon {
      transform: rotate(-90deg) translateX(-1px);
      font-size: 16px;
    }
  }
  &:hover {
    .more {
      opacity: 1;
    }
  }
}
.recommend-box {
  position: relative;
  width: 1070px;
  height: 242px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
  .btn {
    opacity: 0;
    position: absolute;
    z-index: 3;
    top: 50%;
    margin-top: -35px;
    width: 32px;
    height: 70px;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    text-align: center;
    line-height: 70px;
    transition: opacity 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .icon {
      font-size: 30px;
    }
    .icon-right {
      transform: rotate(-90deg);
    }
    .icon-left {
      transform: rotate(90deg);
    }
  }
  .prev {
    border-radius: 0 2px 2px 0;
    left: 0;
  }
  .next {
    border-radius: 2px 0 0 2px;
    right: 0;
  }
  &:hover {
    .btn {
      opacity: 1;
    }
  }
}
.el-carousel__item {
  &::before {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 48px;
    border-radius: 2px;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAwCAYAAAGnNCAXAAAABGdBTUEAALGPC/xhBQAAAENJREFUCB1jYGBgYGICEpIgQgqNBRRi4MMmARYDyXKAWLwgggfOAnMJiIH0soJ0sMEJdlQWWBYshpAAK0ZwwSzS1AEAes8Ckyqvlc0AAAAASUVORK5CYII=);
    content: "";
  }
}
.extension {
  width: 1286px;
  .ext-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
.bypb-window {
  width: 320px;
  .online {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 3px;
    margin-bottom: 19px;
    height: 30px;
    border: 1px solid #e7e7e7;
    border-radius: 2px;
    background: #f4f4f4;
    color: #505050;
    line-height: 30px;
    a {
      flex: 1;
      text-align: center;
    }
  }
}
.operate-card {
  position: relative;
  display: block;
  img {
    width: 100%;
    border-radius: 2px;
    vertical-align: middle;
    border-style: none;
  }
  .gg-icon {
    position: absolute;
    left: 5px;
    bottom: 5px;
    width: 38px;
    height: 22px;
    margin-right: 3px;
    z-index: 1;
    vertical-align: middle;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAAAsCAMAAAD4va5DAAAAolBMVEX///8AAAAAAAAAAAAAAAACAgIAAAAAAAAGBgb5+fns7OwAAACBgYHq6ur9/f17e3tgYGD09PSoqKiLi4sAAAANDQ3V1dW6urqPj48DAwMAAAD////u7u7j4+MbGxv////b29vBwcH19fXt7e3GxsaLi4ukpKRTU1P4+Pjl5eXh4eHX19fLy8vb29v4+PisrKwvLy86Ojr7+/vy8vK4uLhVVVX0WqNFAAAANnRSTlOZAgULFR0IACCBYxIvW4sxJmk0HxoXU0grJQ6TZl0cj1RFcmtENTUmfGFYTUlGcT4rI4dyMhsJ24tXAAABiElEQVRIx+3XyW6DMBCA4WnAzrCUJUDYCpQAIWuTdHn/V6sNqZqFAwSfqv4HJHP4ZECIAabT6ZOQGARnazKqhuBYI1EqjYjSxpsCt6gUaZr8cJoWSZRr0FiObcCIDNvhWoNJTgYjyxypxWhkw+jsiHJsQjVjPGZodMIxSQMBaVKLySIw+R/jxX5lXK2LFYDqK4/tLCeby+UadwA7XAzECj/Py7KcuXVZ5rnv+zHfmEXYzvbuUOwVyU+IGIYhxxLipp4ne15K2Dm/P0Y2ylV8tyQNWF+yEwS6ac4HYC9w0wLT5vr28tvgy7zD3msbhGHqRm369LZqW/Y4FiJxWR7LdQnBMFR6Ylss4KYkSZ4vYkujJ7bDhbjX6YAruGu9nLGW7THvj1Vo3GNzcrIsq64tFtH7YyeELuz3qaT9MQUrcZiKW3HYISw6MSvQddM0dT0gvbH4eIy7MLS41Who9r9nc+hoXX3Auazy/84HZSAmdjwQOriIHKmEDnuCx1ChA7LI0V3sT4XQ351vRIIkxg4KQCAAAAAASUVORK5CYII=);
    background-size: cover;
  }
}
a {
  color: #505050;
  transition: color 0.3s;
  &:hover {
    color: #00a1d6;
  }
}
.storey-title {
  .no-link {
    color: #212121;
    cursor: default;
  }
  .text-info {
    display: flex;
    align-items: center;
    .text-info-link {
      margin-right: 10px;
    }
    .icon {
      color: #f0361b;
      width: 22px !important;
      height: 22px !important;
      transform: translateY(-2px);
      margin-right: 0 !important;
    }
  }
}
</style>

