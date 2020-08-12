<template>
  <div id="biliAnime">
    <gg-card v-if="isGG" :item="gg[0]"></gg-card>
    <div class="anime">
      <div class="space-between">
        <div class="time-line">
          <header class="storey-title">
            <div class="l-con">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-anime" />
              </svg>
              <a href="/" target="_blank" class="name">番剧</a>
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
          <div class="zone-list-box" v-if="isanime">
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
      </div>
      <div class="space-between">
        <div class="crad-list">
          <header class="storey-title">
            <div class="l-con">
              <a href="/" target="_blank" class="name">番剧动态</a>
            </div>
            <div class="exchange-btn">
              <div class="btn btn-change" @click="changeAd">
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
            <div class="zone-list-box" v-if="isanimeDy">
              <common-card :item="item" v-for="(item,index) in animeDy" :key="index"></common-card>
            </div>
          </div>
        </div>
        <div class="pgc-rank">
          <header class="rank-header">
            <span class="name">排行榜</span>
          </header>
          <div class="recommend-activity">
            <el-carousel trigger="click" arrow="never">
              <el-carousel-item v-for="(item,index) in animeBanner" :key="index">
                <a href="/" target="_blank">
                  <img :src="item.img+'@320w_330h_1c_100q.webp'" />
                  <p class="title">{{item.title}}</p>
                </a>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ggCard from "../GgCard.vue";
import commonCard from "../VideoCard/commonCard.vue";
export default {
  data() {
    return {
      active: 0, //默认选中的为最新
      gg: [], //广告内容
      isGG: false, //是否显示广告
      list: [], //显示的数据
      anime: [], //番剧上部模块 全部内容数据
      isanime: false, //是否显示番剧
      rankList: [], //番剧排行榜
      isrank: false, //是否显示排行榜
      animeDy: [], //番剧动态数据
      isanimeDy: false, //是否显示动态数据
      animeBanner: [], //番剧推荐banner
      isanimeBr: false, //是否显示番剧推荐banner
    };
  },
  methods: {
    //获取广告
    getGG() {
      this.$http.get("/api/x/web-show/res/locs?pf=0&ids=42").then((res) => {
        this.gg = res.data.data[42];
        if (this.gg[0].url == "") {
          this.isGG = false;
        } else {
          this.isGG = true;
        }
      });
    },
    //获取番剧
    getAnime() {
      this.$http.get("/api/pgc/web/timeline/v2?season_type=1").then((res) => {
        this.list = res.data.result.latest;
        this.anime = res.data.result;
        this.isanime = true;
      });
    },
    //获取右侧排行榜
    getRank() {
      this.$http
        .get("/api/pgc/web/rank/list?season_type=1&day=3")
        .then((res) => {
          this.rankList = res.data.result.list.slice(0, 10);
          this.isrank = true;
        });
    },
    //获取番剧动态
    getAnimeDy() {
      this.$http
        .get("/api/x/web-interface/dynamic/region?ps=12&rid=13")
        .then((res) => {
          this.animeDy = res.data.data.archives;
          this.isanimeDy = true;
        });
    },
    //换一换 番剧动态
    changeAd() {
      this.isanimeDy = false;
      this.getAnimeDy();
    },
    //获取番剧动态右侧 推荐 banner
    getAnimeBanner() {
      this.$http
        .get("/api/pgc/operation/api/slideshow?position_id=104")
        .then((res) => {
          this.animeBanner = res.data.result;
        });
    },
    select(index) {
      this.active = index;
      if (index == 0) {
        this.list = this.anime.latest;
      } else {
        for (let i = 0; i < 7; i++) {
          if (this.anime.timeline[i].day_of_week == index) {
            this.list = this.anime.timeline[i].episodes;
          }
        }
      }
    },
    handleScroll() {
      let el = document.getElementById("biliAnime");
      let scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      let clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      if (scrollTop > el.offsetTop - clientHeight) {
        this.getGG();
        this.getAnime();
        this.getRank();
        this.getAnimeDy();
        this.getAnimeBanner();
        window.removeEventListener("scroll", this.handleScroll, true);
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  components: {
    ggCard,
    commonCard,
  },
};
</script>

<style lang="less" scoped>
.anime {
  .zone-list-box {
    height: 376px;
    min-height: 332px;
  }
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
    height: 376px;
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
.recommend-activity {
  position: relative;
  height: 330px;
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
  height: 330px !important;
}
</style>