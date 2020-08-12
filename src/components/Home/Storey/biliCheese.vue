<template>
  <div id="biliCheese">
    <div class="space-between">
      <div class="card-list">
        <header class="storey-title">
          <div class="l-con">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-zhishi" />
            </svg>
            <a href="/" target="_blank" class="name">课堂</a>
          </div>
          <div class="exchange-btn">
            <div class="btn btn-change" @click="changeCheese">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shuaxin" />
              </svg>
              换一换
            </div>
            <a href="/" target="_blank" class="btn more">
              更多
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiala" />
              </svg>
            </a>
          </div>
        </header>
        <div class="zone-list-box cheese">
          <div class="zone-list-box cheese" v-if="ischeese">
            <div class="video-card-common1" v-for="(item,index) in cheeseList" :key="index">
              <div class="card-pic">
                <a href="/" target="_blank">
                  <img :src="item.cover+'@206w_116h_1c_100q.webp'" width="206" height="116" />
                  <div class="count">
                    <div class="left">
                      <span>
                        <svg class="icon" aria-hidden="true">
                          <use xlink:href="#icon-bofangshu" />
                        </svg>
                        {{item.play | setNum}}
                      </span>
                    </div>
                  </div>
                </a>
              </div>
              <a href="/" :title="item.title" class="cheese_title">{{item.title}}</a>
              <p class="update_info">{{item.update_info}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="pgc-rank">
        <header class="rank-header">
          <span class="name">{{banner.title}}</span>
        </header>
        <div class="recommend-activity">
          <a href="/" target="_blank">
            <img
              src="https://i0.hdslb.com/bfs/activity-plat/static/20200714/953d0bfef678072bd11ec5fb6ff04190/nMOp2aGOf.png@320w_330h_1c_100q.webp"
              alt
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import commonCard from "../VideoCard/commonCard.vue";
export default {
  data() {
    return {
      cheeseList: [], //课堂列表
      ischeese: false, //是否显示课堂
      banner: [], //右侧 banner
      isbanner: false, //是否显示banner
    };
  },
  methods: {
    getCheese() {
      this.$http
        .get("/api/pugv/app/web/floor/switch?load_type=1")
        .then((res) => {
          this.cheeseList = res.data.data.season;
          this.ischeese = true;
        });
    },
    getBanner() {
      this.$http
        .get("/api/pugv/app/web/floor/switch?load_type=2")
        .then((res) => {
          this.banner = res.data.data.recommend;
        });
    },
    changeCheese() {
      this.ischeese = false;
      this.getCheese();
    },
    handleScroll() {
      let el = document.getElementById("biliCheese");
      let scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      let clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      if (scrollTop > el.offsetTop - clientHeight) {
        this.getCheese();
        this.getBanner();
        window.removeEventListener("scroll", this.handleScroll, true);
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  components: {
    commonCard,
  },
};
</script>

<style lang="less" scoped>
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
    }
  }
  .cheese_title {
    display: block;
    margin: 10px 0 4px;
    white-space: nowrap;
    word-break: break-all;
    font-size: 14px;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 500;
    padding-right: 12px;
  }
  .update_info {
    color: #999;
    font-size: 12px;
    line-height: 16px;
  }
}
.cheese {
  height: 364px !important;
  min-height: 322px !important;
}
.recommend-activity {
  img {
    width: 100%;
    height: 314px !important;
  }
}
@media screen and (max-width: 1438px) {
  .recommend-activity {
    img {
      width: 265px !important;
      height: 274px !important;
    }
  }
}
</style>