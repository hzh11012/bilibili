<template>
  <div id="live-list" style="position:relative">
    <div class="live-tabs clearfix">
      <a class="router-link-active" @click="activeTab(0)" :class="active==0?'active':''">全部</a>
      <a class="router-link-active" @click="activeTab(1)" :class="active==1?'active':''">主播</a>
    </div>
    <div class="flow-loader" style="position:relative">
      <div v-if="active==0 && showLive && live.numResults!=0">
        <div v-if="live.pageinfo.live_user.numResults != 0" class="headline-live clearfix">
          <h3>
            主播
            <div class="num-txt">
              <span class="num">({{live.pageinfo.live_user.numResults}})个</span>
            </div>
          </h3>
          <a class="user-more router-link-active" @click="activeTab(1)">更多&gt;&gt;</a>
        </div>
        <ul v-if="live.pageinfo.live_user.numResults != 0" class="live-user-wrap clearfix">
          <live-user :item="item" v-for="(item,index) in liveUser" :key="index"></live-user>
        </ul>
        <div v-if="live.pageinfo.live_room.numResults != 0" class="headline-room clearfix">
          <h3>
            直播间
            <div class="num-txt">
              <span class="num">({{live.pageinfo.live_room.numResults}})个</span>
            </div>
          </h3>
          <div class="filter face-filter">
            <a class="cover-btn" :class="livePicActive==0?'active':''" @click="livePicActive=0">
              <i class="icon-live-face"></i>
              封面图
            </a>
            <a class="frame-btn" :class="livePicActive==1?'active':''" @click="livePicActive=1">
              <i class="icon-live-frame"></i>
              关键帧
            </a>
          </div>
          <div class="filter sort-filter">
            <a class="popular-btn" @click="order(0)" :class="liveOrderActive==0?'active':''">人气直播</a>
            <a class="latest-btn" @click="order(1)" :class="liveOrderActive==1?'active':''">最新开播</a>
          </div>
        </div>
        <ul v-if="live.pageinfo.live_room.numResults != 0" class="live-room-wrap clearfix">
          <live-room
            :pic="livePicActive"
            :item="item"
            v-for="(item,index) in liveRoom"
            :key="index"
          ></live-room>
        </ul>
        <el-pagination
          v-show="showLive"
          hide-on-single-page
          @current-change="currentChange"
          background
          layout="prev, pager, next"
          :page-size="40"
          :current-page="page"
          :total="live.pageinfo.live_room.numResults"
        ></el-pagination>
      </div>

      <div v-if="active==1 && showLive && live.numResults!=0">
        <ul class="live-user-wrap clearfix">
          <live-user :item="item" v-for="(item,index) in liveUser" :key="index"></live-user>
        </ul>
        <el-pagination
          v-show="showLive"
          hide-on-single-page
          @current-change="currentChange1"
          background
          layout="prev, pager, next"
          :page-size="40"
          :current-page="page"
          :total="live.numResults"
        ></el-pagination>
      </div>

      <div v-if="!showLive" class="flow-loader-state">
        <div class="flow-loader-state-loading">
          <div class="load-state">
            <span class="loading">正在加载...</span>
          </div>
        </div>
      </div>
      <div v-if="live.numResults==0&&showLive && active==0" class="flow-loader-state">
        <div class="flow-loader-state-nothing">
          <div class="error-wrap error-0">
            <p class="text">没有相关数据</p>
          </div>
        </div>
      </div>
      <div v-if="live.numResults==0&&showLive && active==1" class="flow-loader-state">
        <div class="flow-loader-state-nothing">
          <div class="error-wrap error-0">
            <p class="text">没有相关数据</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import liveUser from "./LiveUser.vue";
import liveRoom from "./LiveRoom.vue";
export default {
  props: ["searchKey"],
  data() {
    return {
      active: 0, //选中的tab 全部-0  主播-1
      page: 1, //默认第一页
      live: [], //所有数据
      liveUser: [], //主播列表
      liveRoom: [], //直播间列表
      roomNum: "", //直播间数目
      livePicActive: 0, //直播间图片 0为封面图 1为关键帧
      liveOrderActive: 0, //直播间排序 0为人气直播 1为最新开播
      showLive: true, //显示liveList
    };
  },
  methods: {
    getLiveCreate() {
      this.showLive = false;
      this.$http
        .get(
          "/api/x/web-interface/search/type?search_type=live&keyword=" +
            this.searchKey +
            "&page=" +
            this.page
        )
        .then((res) => {
          this.live = res.data.data;
          this.liveUser = res.data.data.result.live_user;
          this.liveRoom = res.data.data.result.live_room;
          this.showLive = true;
        });
    },
    getLiveCreate1() {
      this.showLive = false;
      this.$http
        .get(
          "/api/x/web-interface/search/type?search_type=live_user&keyword=" +
            this.searchKey +
            "&page=" +
            this.page
        )
        .then((res) => {
          this.live = res.data.data;
          this.liveUser = res.data.data.result;
          this.showLive = true;
        });
    },
    currentChange(page) {
      let el = document.getElementsByClassName("nav-header-box")[0];
      this.$nextTick(function () {
        window.scrollTo({ behavior: "smooth", top: el.offsetTop });
      });
      this.page = page;
      this.getLiveCreate();
    },
    currentChange1(page) {
      let el = document.getElementsByClassName("nav-header-box")[0];
      this.$nextTick(function () {
        window.scrollTo({ behavior: "smooth", top: el.offsetTop });
      });
      this.page = page;
      this.getLiveCreate1();
    },
    order(active) {
      this.liveOrderActive = active;
      let order = "";
      if (this.liveOrderActive == 0) {
        order = "online";
      } else {
        order = "live_time";
      }
      this.showLive = false;
      this.$http
        .get(
          "/api/x/web-interface/search/type?search_type=live&keyword=" +
            this.searchKey +
            "&page=" +
            this.page +
            "&order=" +
            order
        )
        .then((res) => {
          this.live = res.data.data;
          this.liveUser = res.data.data.result.live_user;
          this.liveRoom = res.data.data.result.live_room;
          this.showLive = true;
        });
    },
    activeTab(active) {
      this.page = 1;
      this.active = active;
      if (this.active == 0) {
        this.getLiveCreate();
      } else {
        this.getLiveCreate1();
      }
    },
  },
  created() {
    this.getLiveCreate();
  },
  watch: {
    $route(newVal, oldVal) {
      if (newVal != oldVal) {
        this.page = 1;
        this.$store.commit("showNum", false);
        if (this.active == 1) {
          this.getLiveCreate1();
        } else {
          this.getLiveCreate();
        }
      }
    },
  },
  components: {
    liveUser,
    liveRoom,
  },
};
</script>

<style lang="less" scoped>
#live-list {
  .live-tabs {
    margin-top: 47px;
    margin-bottom: 39px;
    a {
      float: left;
      width: 74px;
      line-height: 30px;
      text-align: center;
      color: #222;
    }
    .active {
      color: #00a1d6;
      border-bottom: 2px solid #00a1d6;
    }
  }
  .headline-live {
    line-height: 16px;
    h3 {
      float: left;
      font-size: 16px;
      font-weight: 400;
      color: #646c7a;
      .num-txt {
        display: inline-block;
        margin-left: 10px;
        color: #aaa;
      }
    }
    .user-more {
      float: right;
      font-size: 14px;
      color: #646c7a;
    }
  }
  .live-user-wrap {
    padding: 0 3px;
    .live-user-item {
      float: left;
      margin-top: 20px;
      margin-right: 19px;
      &:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
  .headline-room {
    line-height: 16px;
    margin-top: 39px;
    margin-bottom: 20px;
    h3 {
      float: left;
      font-size: 16px;
      font-weight: 400;
      color: #646c7a;
      .num-txt {
        display: inline-block;
        margin-left: 10px;
        color: #aaa;
      }
    }
    .filter {
      float: right;
      &:last-child {
        margin-right: 41px;
      }
      a {
        color: #222 !important;
        margin-right: 31px;
        &:last-child {
          margin-right: 0;
        }
        &:hover {
          color: #00a1d6 !important;
        }
        i {
          transform: translateY(-2px);
          margin-right: 5px;
          vertical-align: bottom;
        }
      }
      .cover-btn.active {
        .icon-live-face {
          background-position: -192px -468px;
        }
      }
      .cover-btn:hover {
        .icon-live-face {
          background-position: -192px -468px;
        }
      }
      .frame-btn:hover {
        .icon-live-frame {
          background-position: -148px -512px;
        }
      }
      .frame-btn.active {
        .icon-live-frame {
          background-position: -148px -512px;
        }
      }
      .active {
        color: #00a1d6 !important;
      }
    }
    .icon-live-face {
      background-image: url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/sprite-690be8a6ea.png);
      background-position: -148px -468px;
      width: 14px;
      height: 14px;
    }
    .icon-live-frame {
      background-image: url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/sprite-690be8a6ea.png);
      background-position: -34px -531px;
      width: 14px;
      height: 14px;
    }
  }
  .live-room-wrap {
    .live-room-item {
      margin-bottom: 20px;
      margin-right: 45px;
      float: left;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
i {
  display: inline-block;
}


</style>