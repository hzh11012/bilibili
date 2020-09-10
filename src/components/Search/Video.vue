<template>
  <div id="video-list" style="position:relative;">
    <div>
      <div class="total-wrap">
        <p
          class="total-text"
          v-if="showVideo"
        >共{{video.numResults!=1000?video.numResults:video.numResults+'+'}}条数据</p>
        <p class="total-text" v-else>共0条数据</p>
      </div>
      <div class="filter-wrap">
        <ul class="filter-type clearfix order">
          <li
            class="filter-item"
            :class="orderActive==item.key?'active':''"
            v-for="(item,index) in orderList"
            :key="index"
          >
            <a @click="order(item)" href="javascript:;">{{item.name}}</a>
          </li>
        </ul>
        <ul class="filter-type clearfix duration" v-show="isMore">
          <li
            class="filter-item"
            :class="durationActive==item.key?'active':''"
            v-for="(item,index) in durationList"
            :key="index"
          >
            <a @click="duration(item)" href="javascript:;">{{item.name}}</a>
          </li>
        </ul>
        <ul class="filter-type clearfix tids_1" v-show="isMore">
          <li
            class="filter-item"
            :class="tidsActive==item.key?'active':''"
            v-for="(item,index) in tidsList"
            :key="index"
          >
            <a @click="tids(item)" href="javascript:;">{{item.name}}</a>
          </li>
        </ul>
        <a class="fold up" @click="isMore=!isMore" v-show="isMore">
          <span>收起</span>
          <i class="arrow-up"></i>
        </a>
        <a class="fold down" @click="isMore=!isMore" v-show="!isMore">
          <span>更多筛选</span>
          <i class="arrow-down"></i>
        </a>
        <div class="switch-wrap">
          <div
            class="aver type"
            :class="typeActive=='matrix'?'typeactive':''"
            @click="changeType('matrix')"
          >
            <i class="icon-aver"></i>
          </div>
          <div
            class="imgleft type"
            :class="typeActive=='list'?'typeactive':''"
            @click="changeType('list')"
          >
            <i class="icon-imgleft"></i>
          </div>
        </div>
      </div>
    </div>
    <ul v-if="showVideo" class="video-list clearfix">
      <video-card :type="typeActive" :item="item" v-for="(item,index) in video.result" :key="index"></video-card>
    </ul>
    <el-pagination
      v-show="showVideo"
      hide-on-single-page
      @current-change="currentChange"
      background
      layout="prev, pager, next"
      :page-size="20"
      :current-page="page"
      :total="video.numResults"
    ></el-pagination>

    <div v-if="!showVideo" class="flow-loader-state">
      <div class="flow-loader-state-loading">
        <div class="load-state">
          <span class="loading">正在加载...</span>
        </div>
      </div>
    </div>
    <div v-if="video.numResults==0&&showVideo" class="flow-loader-state">
      <div class="flow-loader-state-nothing">
        <div class="error-wrap error-0">
          <p class="text">没有相关数据</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setCookie, getCookie } from "../../assets/js/cookie.js";
import videoCard from "./VideoCard.vue";
export default {
  props: ["searchKey"],
  data() {
    return {
      isMore: true, //是否显示  时长 分区
      //排序
      orderList: [
        { name: "综合排序", key: "totalrank" },
        { name: "最多点击", key: "click" },
        { name: "最新发布", key: "pubdate" },
        { name: "最多弹幕", key: "dm" },
        { name: "最多收藏", key: "stow" },
      ],
      orderActive: "totalrank",
      //时长
      durationList: [
        { name: "全部时长", key: "0" },
        { name: "10分钟以下", key: "1" },
        { name: "10-30分钟", key: "2" },
        { name: "30-60分钟", key: "3" },
        { name: "60分钟以上", key: "4" },
      ],
      durationActive: "0",
      //分区
      tidsList: [
        { name: "全部分区", key: "0" },
        { name: "动画", key: "1" },
        { name: "番剧", key: "13" },
        { name: "国创", key: "167" },
        { name: "音乐", key: "3" },
        { name: "舞蹈", key: "129" },
        { name: "游戏", key: "4" },
        { name: "知识", key: "36" },
        { name: "数码", key: "188" },
        { name: "生活", key: "160" },
        { name: "鬼畜", key: "119" },
        { name: "时尚", key: "155" },
        { name: "咨询", key: "202" },
        { name: "娱乐", key: "5" },
        { name: "影视", key: "181" },
        { name: "纪录片", key: "177" },
        { name: "电影", key: "23" },
        { name: "电视剧", key: "11" },
      ],
      tidsActive: "0",
      video: [], //所有数据
      page: 1, //默认第一页
      typeActive:
        getCookie("arrange") == false ? "matrix" : getCookie("arrange"), //列表为matrix 还是 list
      showVideo: true, //显示videoList
    };
  },
  methods: {
    getVideo() {
      this.showVideo = false;
      this.$http
        .get(
          "/api/x/web-interface/search/type?search_type=video&keyword=" +
            this.searchKey +
            "&page=" +
            this.page +
            "&order=" +
            this.orderActive +
            "&duration=" +
            this.durationActive +
            "&tids=" +
            this.tidsActive
        )
        .then((res) => {
          this.video = res.data.data;
          this.showVideo = true;
        });
    },
    //排序
    order(item) {
      this.orderActive = item.key;
      this.page = 1;
      this.getVideo();
    },
    //时长
    duration(item) {
      this.durationActive = item.key;
      this.page = 1;
      this.getVideo();
    },
    //分区
    tids(item) {
      this.tidsActive = item.key;
      this.page = 1;
      this.getVideo();
    },
    //切换card还是list 类型
    changeType(type) {
      this.typeActive = type;
      setCookie("arrange", type);
    },
    currentChange(page) {
      let el = document.getElementsByClassName("nav-header-box")[0];
      this.$nextTick(function () {
        window.scrollTo({ behavior: "smooth", top: el.offsetTop });
      });
      this.page = page;
      this.getVideo();
    },
  },
  created() {
    this.getVideo();
  },
  watch: {
    $route(newVal, oldVal) {
      if (newVal != oldVal) {
        this.page = 1;
        this.orderActive = "totalrank";
        this.durationActive = "0";
        this.tidsActive = "0";
        this.$store.commit("showNum", false);
        this.getVideo();
      }
    },
  },
  components: {
    videoCard,
  },
};
</script>

<style lang="less" scoped>
#video-list {
  margin-bottom: 30px;
}

i {
  display: inline-block;
}
.switch-wrap {
  position: absolute;
  top: 10px;
  right: 0;
  z-index: 999;
  .aver {
    right: 26px;
    &:hover {
      i {
        background-position: -206px -185px;
      }
    }
  }
  .imgleft {
    right: 0;
    &:hover {
      i {
        background-position: -196px -327px;
      }
    }
  }
  .aver.typeactive i {
    background-position: -206px -139px;
  }
  .imgleft.active:hover i,
  .imgleft.typeactive i {
    background-position: -206px -231px;
  }
  .type {
    position: absolute;
    top: 0;
    cursor: pointer;
  }
  i {
    background-image: url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/sprite-690be8a6ea.png);
    width: 16px;
    height: 16px;
  }
  .icon-aver {
    background-position: -194px -376px;
  }
  .icon-imgleft {
    background-position: -148px -376px;
  }
}

.video-list {
  margin-right: -32px;
}
.video-list {
  /deep/ .video-item.matrix {
    float: left;
    margin-right: 32px;
    margin-top: 20px;
  }
}
</style>