<template>
  <div id="biliReport">
    <div class="space-between">
      <div class="card-list">
        <header class="storey-title">
          <div class="l-con">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-tebietuijian" />
            </svg>
            <a href="/" target="_blank" class="name">特别推荐</a>
          </div>
        </header>
        <div class="zone-list-box">
          <div class="zone-list-box" v-if="isreport">
            <div class="video-card-common1" v-for="(item,index) in reportList" :key="index">
              <div class="card-pic">
                <a href="/" target="_blank">
                  <img :src="item.pic+'@412w_232h_1c_100q.jpeg'" width="206" height="116" />
                  <div class="count">
                    <div class="left">
                      <span>
                        <svg class="icon" aria-hidden="true">
                          <use xlink:href="#icon-bofangshu" />
                        </svg>
                        {{item.play | setNum}}
                      </span>
                      <span>
                        <svg class="icon" aria-hidden="true">
                          <use xlink:href="#icon-dianzanshu" />
                        </svg>
                        {{item.like | setNum}}
                      </span>
                    </div>
                    <div class="right">
                      <span>{{item.duration}}</span>
                    </div>
                  </div>
                </a>
                <watch-later></watch-later>
              </div>
              <a href="/" target class="ex-title">{{item.title}}</a>
              <a href="/" target="_blank" class="ex-up">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-up" />
                </svg>
                {{item.author}}
              </a>
            </div>
          </div>
        </div>
      </div>
      <a href="/" target="_blank" class="operate-card gg">
        <img
          src="//i0.hdslb.com/bfs/archive/31b8d2617cb8d6b01e98425b7eba39ae9f973c20.png"
          alt="游戏赛事库"
        />
      </a>
    </div>
  </div>
</template>

<script>
import commonCard from "../VideoCard/commonCard.vue";
import watchLater from "../VideoCard/watchLater.vue";
export default {
  data() {
    return {
      reportList: [], //特别推荐 数据列表
      isreport: false, //是否显示特别推荐 数据列表
    };
  },
  methods: {
    getReport() {
      this.$http.get("/bili/index/recommend.json").then((res) => {
        this.reportList = res.data.list;
        this.isreport = true;
      });
    },
    handleScroll() {
      let el = document.getElementById("biliReport");
      let scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      let clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      if (scrollTop > el.offsetTop - clientHeight) {
        this.getReport();
        window.removeEventListener("scroll", this.handleScroll, true);
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  components: {
    commonCard,
    watchLater,
  },
};
</script>

<style lang="less" scoped>
.zone-list-box {
  height: 202px !important;
  min-height: 180px !important;
}
.video-card-common1 {
  width: 206px;
  cursor: pointer;
  .card-pic {
    position: relative;
    width: 100%;
    height: 116px;
    a {
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABHCAMAAAB4UkqjAAAAh1BMVEUAAADd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d0UCIZXAAAALHRSTlMAoJDx4OYL/DcGF+6+JNi4ycSIT2k6LPeWfRzTVPXPszEQrV0hpo12cEZAZFpRNIQAAAJVSURBVFjD7dbZcpswGIbhHwwSi81q8Ib33fnu//oatRIpmliDhQ/aaZ+TKInnjVgkhb4RJMhP9Fzo8PiD+vEA+JPnqS0+1dRHBJhibAzh2HNeekxP9Z8XBSMZM6SmRBYx65QeM6XsY3rKPqanLGMWqeDmOh0b/Io9+YHi3gKtdExgLznSlyjFMGnUphIMlcgY22C4DSPBxTu4IrXDe+yI6IDWbPSqGVoHoohDyip6XZVB4hFN1TgPyUaYQ5rSWQ0nZGcC6UyJukKypa4yIXX3HLLlqCdHX++HLRfS/9bbWvvHLSLNR3N6tRXdFwdxejekiYF4fDnWYa/WqSm2PqRCSy0hrbP5RxAaW8141N17tVbZ+S1fFYbWFF2+1lqg62BoBdAsqWOLroWhxTh+M8vmWuuaxp1WaWjRSn43yl35sHTLUjxiaWlqnYE4LZoJme3v13MibqepFZRL6otV5V+/Hv+xVvi+FsvZG1qh/LQ7uFXnF/HlwcEfYlDktW2r5EARUiXWc1xRWAC8tGwxsdJ9dcRnYrddMdtrjDZyAy3kXrSJ7O89u8zEZAIKxBRnFzbonWD3ZkfCrrmzP+6979nicjAnW3NZ4OS1R6GtVBa8drTek539up3NAgMvcv51WNZQitCiFBZQaqIMSrx1XrWNoWTy/w1r+hk+xjuMSVjGGC6WZ3S1xlDriqTKxzB+Ra3I4bDHne62drqmied57QR9z0D94dHnOEmvJ/pWAMm4ovL2TTcJ5cRyMlHrbkdG5c/5r82fYqt+K/iR89m2JrP9PEZyI80PsPxVT0P3FAEAAAAASUVORK5CYII=);
      background-repeat: no-repeat;
      background-position: 50%;
      &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 48px;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAwCAYAAAGnNCAXAAAABGdBTUEAALGPC/xhBQAAAENJREFUCB1jYGBgYGICEpIgQgqNBRRi4MMmARYDyXKAWLwgggfOAnMJiIH0soJ0sMEJdlQWWBYshpAAK0ZwwSzS1AEAes8Ckyqvlc0AAAAASUVORK5CYII=);
        background-repeat: repeat-x;
        bottom: 0;
        left: 0;
        border-radius: 2px;
      }
      img {
        width: 100%;
        height: 100%;
        border-radius: 2px;
      }
      .count,
      .count .left,
      .count .left span {
        display: flex;
        align-items: center;
      }
      .count {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 6px 8px;
        justify-content: space-between;
        color: #fff;
        line-height: 16px;
        .left {
          span {
            &:first-child {
              margin-right: 10px;
            }
          }
          .icon {
            font-size: 16px;
            margin-right: 4px;
            vertical-align: middle;
            transform: translateY(-1px);
          }
        }
      }
      .crown {
        position: absolute;
        left: 0;
        top: 0;
        width: 40px;
        height: 24px;
        background-size: contain;
      }
      .silver {
        background-image: url(//s1.hdslb.com/bfs/static/jinkela/international-home/asserts/icon_silver.png);
      }
      .gold {
        background-image: url(//s1.hdslb.com/bfs/static/jinkela/international-home/asserts/icon_gold.png);
      }
    }
    &:hover {
      /deep/ .watch-later-video {
        transition-delay: 0.2s;
        opacity: 1;
      }
    }
  }
  .ex-title {
    display: block;
    font-size: 14px;
    line-height: 20px;
    margin: 10px 0 8px;
    height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-weight: 500;
    padding-right: 12px;
  }
  .ex-up {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #999;
    .icon {
      color: #999;
      vertical-align: middle;
      margin-right: 3px;
      font-size: 20px;
      transition: color 0.3s;
      transform: translateX(-2px);
    }
    &:hover {
      color: #00a1d6;
      .icon {
        color: #00a1d6;
      }
    }
  }
}
.operate-card {
  position: relative;
  display: block;
  img {
    width: 100%;
    border-radius: 2px;
  }
}
.gg {
  width: 320px;
  margin-top: 52px;
}

@media screen and (max-width: 1870px) {
  .zone-list-box {
    .video-card-common1 {
      &:nth-child(n + 6) {
        display: none;
      }
    }
  }
}
@media screen and (max-width: 1654px) {
  .zone-list-box {
    .video-card-common1 {
      &:nth-child(n + 5) {
        display: none;
      }
    }
  }
}
@media screen and (max-width: 1438px) {
  .zone-list-box {
    height: 180px !important;
  }
  .operate-card {
    width: 265px;
  }
}
</style>