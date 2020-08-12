<template>
  <div id="biliGuochuang">
    <div class="guochuang">
      <div class="space-between">
        <div class="time-line">
          <header class="storey-title">
            <div class="l-con">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-guochuang" />
              </svg>
              <a href="/" target="_blank" class="name">国创</a>
              <div class="tab-switch">
                <div class="tab-switch-item" :class="active==0?'on':''" @click="select(0)">最新</div>
                <div class="tab-switch-item" :class="active==1?'on':''" @click="select(1)">周一</div>
                <div class="tab-switch-item" :class="active==2?'on':''" @click="select(2)">周二</div>
                <div class="tab-switch-item" :class="active==3?'on':''" @click="select(3)">周三</div>
                <div class="tab-switch-item" :class="active==4?'on':''" @click="select(4)">周四</div>
                <div class="tab-switch-item" :class="active==5?'on':''" @click="select(5)">周五</div>
                <div class="tab-switch-item" :class="active==6?'on':''" @click="select(6)">周六</div>
                <div class="tab-switch-item" :class="active==7?'on':''" @click="select(7)">周日</div>
              </div>
            </div>
            <a href="/" target="_blank" class="tl-link">
              新番时间表
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiala" />
              </svg>
            </a>
          </header>
          <div class="zone-list-box" v-if="isguochuang ">
            <div class="time-line-card item" v-for="(item,index) in list" :key="index">
              <a href="/" target="_blank" :title="item.title" class="pic">
                <img :src="item.square_cover+'@70w_70h_1c_100q.webp'" :alt="item.title" />
              </a>
              <div class="txt">
                <a href="/" target="_blank" :title="item.title" class="title">{{item.title}}</a>
                <p class="update">
                  <a href="/" target="_blank" class="published">{{item.pub_index}}</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="r-con">
          <div class="pgc-rank">
            <header class="rank-header">
              <span class="name">排行榜</span>
              <a href="/" target="_blank" class="more">
                更多
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-xiala" />
                </svg>
              </a>
            </header>
            <div v-if="isrank">
              <div class="pgc-rank-wrap" v-for="(item,index) in rankList" :key="index">
                <span class="number" :class="index<3?'on':''">{{index + 1}}</span>
                <a href="/" target="_blank" class="link">
                  <p class="txt">
                    <span :title="item.title" class="title">{{item.title}}</span>
                    <span class="update">{{item.new_ep.index_show}}</span>
                  </p>
                </a>
              </div>
            </div>
          </div>
          <div class="banner">
            <el-carousel trigger="click" arrow="never">
              <el-carousel-item v-for="(item,index) in banner" :key="index">
                <a href="/" target="_blank">
                  <img :src="item.img+'@320w_330h_1c_100q.webp'" />
                  <p class="title">{{item.title}}</p>
                </a>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </div>
      <div class="space-between">
        <div class="card-list">
          <header class="storey-title">
            <div class="l-con">
              <a href="/" target="_blank" class="name">国产原创相关</a>
            </div>
            <div class="exchange-btn">
              <div class="btn btn-change" @click="changeGc">
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
          <div class="zone-list-box">
            <div class="zone-list-box" v-if="isguochuangDy">
              <common-card
                :showUp="true"
                :item="item"
                v-for="(item,index) in guochuangDy"
                :key="index"
              ></common-card>
            </div>
          </div>
        </div>
        <rank-list :isShow="isrank1" :list="rankList1"></rank-list>
      </div>
    </div>
  </div>
</template>

<script>
import commonCard from "../VideoCard/commonCard.vue";

import rankList from "../Storey/rankList.vue";
export default {
  data() {
    return {
      active: 0,
      list: [], //显示的数据
      guochuang: [], //国创上部模块 全部内容数据
      isguochuang: false, //是否显示国创
      rankList: [], //国创 排行榜
      isrank: false, //是否显示国创 排行榜
      banner: [], //右侧小banner
      guochuangDy: [], //国创相关 数据
      isguochuangDy: false, //是否显示国创相关 数据
      rankList1: [], //国创相关 排行榜
      isrank1: false, //是否显示国创相关 排行榜
    };
  },
  methods: {
    //获取国创
    getGuochuang() {
      this.$http.get("/api/pgc/web/timeline/v2?season_type=4").then((res) => {
        this.list = res.data.result.latest;
        this.guochuang = res.data.result;
        this.isguochuang = true;
      });
    },
    //获取右侧排行榜
    getRank() {
      this.$http
        .get("/api/pgc/season/rank/web/list?season_type=4&day=3")
        .then((res) => {
          this.rankList = res.data.data.list.slice(0, 7);
          this.isrank = true;
        });
    },
    //获取 国创相关
    getGuochuangDy() {
      this.$http
        .get("/api/x/web-interface/dynamic/region?ps=12&rid=168")
        .then((res) => {
          this.guochuangDy = res.data.data.archives;
          this.isguochuangDy = true;
        });
    },
    //换一换 国创相关
    changeGc() {
      this.isguochuangDy = false;
      this.getGuochuangDy();
    },
    //获取右侧小banner
    getBanner() {
      this.$http
        .get("/api/pgc/operation/api/slideshow?position_id=101")
        .then((res) => {
          this.banner = res.data.result;
        });
    },
    select(index) {
      this.active = index;
      if (index == 0) {
        this.list = this.guochuang.latest;
      } else {
        for (let i = 0; i < 7; i++) {
          if (this.guochuang.timeline[i].day_of_week == index) {
            this.list = this.guochuang.timeline[i].episodes;
          }
        }
      }
    },
    getRank1() {
      this.$http
        .get("/api/x/web-interface/ranking/region?rid=168&day=3&original=0")
        .then((res) => {
          this.rankList1 = res.data.data;
          this.isrank1 = true;
        });
    },
    handleScroll() {
      let el = document.getElementById("biliGuochuang");
      let scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      let clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      if (scrollTop > el.offsetTop - clientHeight) {
        this.getGuochuang();
        this.getRank();
        this.getBanner();
        this.getGuochuangDy();
        this.getRank1();
        window.removeEventListener("scroll", this.handleScroll, true);
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  components: {
    commonCard,
    rankList,
  },
};
</script>

<style lang="less" scoped>
.guochuang {
  .r-con {
    width: 320px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
.pgc-rank {
  width: 320px;
}
.time-line {
  .tab-switch {
    display: flex;
    margin-left: 4px;
    .tab-switch-item {
      font-size: 14px;
      line-height: 30px;
      height: 30px;
      margin-right: 24px;
      cursor: pointer;
    }
    .on {
      border-bottom: 1px solid #00a1d6;
      color: #00a1d6;
    }
  }
  .tl-link {
    width: 112px;
    height: 30px;
    border: 1px solid #00a1d6;
    border-radius: 2px;
    background: #fff;
    text-align: center;
    line-height: 27px;
    padding: 0 0 0 14px;
    font-size: 14px;
    color: #00a1d6;
    display: flex;
    align-items: center;
    transition: all 0.2s;
    line-height: 16px;
    .icon {
      font-size: 16px;
      color: #00a1d6;
      transform: rotate(-90deg);
      margin-left: 2px;
    }
    &:hover {
      color: #fff;
      background: #00a1d6;
    }
  }
  .zone-list-box {
    width: 1287px;
    height: 376px !important;
    min-height: 376px;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: flex-start;
    overflow: auto;
    .item {
      margin: 0 30px 24px 0;
    }
  }
}
.time-line-card {
  width: 227px;
  height: 70px;
  display: flex;
  justify-content: space-between;
  .pic {
    margin-right: 12px;
    img {
      width: 70px;
      height: 70px;
      border-radius: 2px;
    }
  }
  .txt {
    width: 152px;
    font-weight: 500;
    .title {
      display: inline-block;
      font-size: 14px;
      height: 37px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      margin: 2px 0 12px;
    }
    .update {
      .published {
        color: #00a1d6;
      }
      a {
        width: 100%;
        color: #999;
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-weight: 400;
      }
    }
  }
}
.banner {
  position: relative;
  width: 320px;
  height: 110px;
  margin-top: 20px;
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
  img {
    width: 100%;
    height: 100%;
    border-radius: 2px;
  }
}
/deep/ .el-carousel__container {
  height: 110px !important;
}
</style>