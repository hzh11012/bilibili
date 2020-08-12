<template>
  <div id="biliLive">
    <gg-card v-if="isGG" :item="gg[0]"></gg-card>
    <div class="space-between">
      <div class="live-list">
        <header class="storey-title">
          <div class="l-con">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-live" />
            </svg>
            <a href="/" target="_blank" class="name">正在直播</a>
            <div class="text-info">
              <span>当前共有 {{live.online_total?live.online_total:'0'}} 个在线直播</span>
            </div>
          </div>
          <div class="exchange-btn">
            <div class="btn btn-change" @click="changeLive">
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
          <div class="zone-list-box" v-if="islive">
            <live-card :item="item" v-for="(item,index) in live.recommend_room_list" :key="index"></live-card>
          </div>
        </div>
      </div>
      <div class="live-tabs">
        <div class="tab-switch">
          <div class="tab-switch-item" :class="tab_active==0?'on':''" @click="changeTab(0)">直播排行</div>
          <div
            class="tab-switch-item"
            :class="tab_active==1?'on':''"
            @click="changeTab(1)"
            @click.once="getGuanzhu"
          >关注的主播</div>
          <div class="tab-switch-item" :class="tab_active==2?'on':''" @click="changeTab(2)">为你推荐</div>
        </div>
        <div class="live-rank" v-show="tab_active==0">
          <a
            href="/"
            v-for="(item,index) in live.ranking_list"
            :key="index"
            target="_blank"
            class="live-rank-item"
          >
            <div class="rank-face">
              <span class="number" :class="index<3?'on':''">{{index+1}}</span>
              <img :src="item.face+'@44w_44h_1c_100q.webp'" />
              <div class="txt">
                <p>{{item.uname}}</p>
                <p class="p2">{{item.title}}</p>
              </div>
            </div>
            <div class="count-box">
              <div class="count">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-renqi" />
                </svg>
                {{item.online | setNum}}
              </div>
            </div>
          </a>
        </div>
        <div class="empty-state" v-show="$store.state.isLogin == -101 && tab_active==1">
          <span>没有数据(-_-#)</span>
        </div>
        <div class="live-rank" v-show="tab_active==1 && $store.state.isLogin == 0">
          <a href="/" v-for="(item,index) in guanzhuList" :key="index" class="live-rank-item">
            <div class="rank-face">
              <img :src="item.face+'@44w_44h_1c_100q.webp'" />
              <div class="txt">
                <p>{{item.uname}}</p>
                <p class="p2">{{item.title}}</p>
              </div>
            </div>
            <div class="count-box">
              <div class="count">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-renqi" />
                </svg>
                {{item.online | setNum}}
              </div>
            </div>
          </a>
        </div>
        <div class="recommend-activity" v-show="tab_active==2">
          <el-carousel trigger="click" arrow="never">
            <el-carousel-item v-for="(item,index) in live.preview_banner_list" :key="index">
              <a href="/" target="_blank">
                <img :src="item.pic+'@320w_330h_1c_100q.webp'" :alt="item.name" />
                <p class="title">{{item.title}}</p>
              </a>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ggCard from "../GgCard.vue";
import liveCard from "../VideoCard/liveCard.vue";
export default {
  data() {
    return {
      tab_active: 2, //默认选中 第三项---为你推荐
      gg: [{ url: "", pic: "" }], //广告内容
      isGG: false, //是否显示广告
      live: [], //直播模块 里面需要的所有数据
      islive: false, //是否显示 直播card数据
      guanzhuList: [], //关注的主播
    };
  },
  methods: {
    //获取广告
    getGG() {
      this.$http.get("/api/x/web-show/res/locs?pf=0&ids=40").then((res) => {
        this.gg = res.data.data[40];
        if (this.gg[0].url == "") {
          this.isGG = false;
        } else {
          this.isGG = true;
        }
      });
    },
    //获取正在直播 模块的数据
    getLive() {
      this.$http
        .get("/live/xlive/web-interface/v1/webMain/getList?platform=web")
        .then((res) => {
          this.live = res.data.data;
          this.islive = true;
        });
    },
    changeTab(index) {
      this.tab_active = index;
    },
    //获取自己的关注
    getGuanzhu() {
      this.$http
        .get("/live/relation/v1/feed/feed_list?pagesize=6&page=1")
        .then((res) => {
          this.guanzhuList = res.data.data.list;
        });
    },
    //获取新的正在直播列表
    changeLive() {
      this.islive = false;
      this.$http
        .get("/live/xlive/web-interface/v1/webMain/getMoreRecList?platform=web")
        .then((res) => {
          this.live.recommend_room_list = res.data.data.recommend_room_list;
          this.islive = true;
        });
    },
  },
  created() {
    this.getGG();
    this.getLive();
  },
  components: {
    ggCard,
    liveCard,
  },
};
</script>

<style lang="less" scoped>
.live-tabs {
  width: 320px;
  .tab-switch {
    display: flex;
    height: 36px;
    margin-right: 16px;
    margin-bottom: 16px;
    align-items: center;
    .tab-switch-item {
      font-size: 12px;
      line-height: 18px;
      height: 22px;
      margin-right: 12px;
      cursor: pointer;
    }
    .on {
      border-bottom: 1px solid #00a1d6;
      color: #00a1d6;
    }
  }
}
.live-rank {
  .live-rank-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 22px;
    .rank-face {
      display: flex;
      align-items: center;
    }
    .number {
      font-size: 14px;
      color: #999;
      width: 18px;
      height: 18px;
      text-align: center;
      line-height: 18px;
      background: #fff;
      border-radius: 2px;
      display: inline-block;
      margin-right: 12px;
    }
    .on {
      color: #fff;
      background: #00a1d6;
    }
    img {
      width: 44px;
      height: 44px;
      border-radius: 44px;
      margin-right: 12px;
    }
    .txt {
      display: inline-block;
      margin-right: 10px;
      width: 158px;
      vertical-align: middle;
      p {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &:first-child {
          font-size: 14px;
          font-weight: 500;
        }
      }
      .p2 {
        color: #505050;
        line-height: 18px;
        margin-top: 2px;
      }
    }
    .count-box {
      color: #999;
      font-size: 12px;
      display: flex;
      align-items: start;
      white-space: nowrap;
      padding-top: 4px;
      .count {
        display: flex;
        align-items: center;
      }
      .icon {
        color: #999;
        font-size: 22px;
      }
    }
  }
}
.empty-state {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
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