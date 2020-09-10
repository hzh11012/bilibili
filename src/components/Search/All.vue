<template>
  <div class="all" style="position:relative;">
    <div>
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
    <ul v-if="showAll" class="video-lsit clearfix">
      <ul id="all-list">
        <div
          :id="item.result_type"
          v-show="item.data!='' && item.result_type!='card' && item.result_type!='user'&& item.result_type!='star'"
          v-for="(item,index) in all.result"
          :key="index"
        >
          <component
            :is="item.result_type | cardType"
            :type="typeActive"
            :relation="retationDetail"
            :item="item1"
            v-for="(item1,index) in item.data"
            :key="index"
          ></component>
          <li
            class="card-more"
            v-if="$store.state.allNum[item.result_type]>3 && item.result_type!='video' && item.result_type!='bili_user'"
          >
            共找到{{$store.state.allNum[item.result_type]}}部相关{{item.result_type | typeName}}，
            <a
              @click="tabs(item.result_type)"
            >点击查看</a>
          </li>
        </div>
      </ul>
    </ul>

    <el-pagination
      v-show="showAll"
      hide-on-single-page
      @current-change="currentChange"
      background
      layout="prev, pager, next"
      :page-size="20"
      :current-page="page"
      :total="all.numResults"
    ></el-pagination>

    <div v-if="!showAll" class="flow-loader-state">
      <div class="flow-loader-state-loading">
        <div class="load-state">
          <span class="loading">正在加载...</span>
        </div>
      </div>
    </div>
    <div v-if="all.numResults==0&&showAll" class="flow-loader-state">
      <div class="flow-loader-state-nothing">
        <div class="error-wrap error-0">
          <div class="no-content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setCookie, getCookie } from "../../assets/js/cookie.js";
import bangumiCard from "./BangumiCard.vue";
import videoCard from "./VideoCard.vue";
import upuserCard from "./UpuserCard.vue";
import gameCard from "./GameCard.vue";
import activityCard from "./ActivityCard.vue";
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
      all: [], //所有数据
      page: 1, //默认第一页
      typeActive:
        getCookie("arrange") == false ? "matrix" : getCookie("arrange"), //列表为matrix 还是 list
      showAll: true, //显示allList
      keyword: "", //搜索关键词
      retationDetail: [], //关注用户 详情
      showVideoOther: true,
    };
  },
  methods: {
    getAll() {
      this.showAll = false;
      this.keyword = this.$route.query.keyword;
      this.$store.commit("showNum", false);
      this.$http
        .get(
          "api/x/web-interface/search/all/v2?highlight=1&keyword=" +
            this.$route.query.keyword
        )
        .then((res) => {
          this.all = res.data.data;
          this.all.result.forEach((item) => {
            if (item.result_type == "bili_user" && item.data != "") {
              this.getRetation(item.data[0].mid);
            }
          });
          this.$store.commit("allNum", this.all.top_tlist);
          this.all.numResults = this.$store.state.allNum['video'];
          this.$store.commit("showNum", true);
          this.showAll = true;
        });
    },
    getRetation(id) {
      this.$http.get("/api/x/relation/relations?fids=" + id).then((res) => {
        if (res.data.code == -101) {
          this.showUpuser = true;
          return null;
        } else if (res.data.data == null) {
          this.showUpuser = true;
          return null;
        } else {
          this.retationDetail = res.data.data;
        }
      });
    },
    getVideo() {
      this.showAll = false;
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
          this.all.numResults = res.data.data.numResults;
          for (let i = 0; i < 8; i++) {
            this.all.result[i].data = [];
          }
          this.all.result[8].data = res.data.data.result;
          this.showAll = true;
        });
    },
    //排序
    order(item) {
      this.orderActive = item.key;
      this.page = 1;
      if (
        this.orderActive == "totalrank" &&
        this.durationActive == "0" &&
        this.tidsActive == "0"
      ) {
        this.getAll();
      } else {
        this.getVideo();
      }
    },
    //时长
    duration(item) {
      this.durationActive = item.key;
      this.page = 1;
      if (
        this.orderActive == "totalrank" &&
        this.durationActive == "0" &&
        this.tidsActive == "0"
      ) {
        this.getAll();
      } else {
        this.getVideo();
      }
    },
    //分区
    tids(item) {
      this.tidsActive = item.key;
      this.page = 1;
      if (
        this.orderActive == "totalrank" &&
        this.durationActive == "0" &&
        this.tidsActive == "0"
      ) {
        this.getAll();
      } else {
        this.getVideo();
      }
    },
    //切换card还是list 类型
    changeType(type) {
      this.typeActive = type;
      setCookie("arrange", type);
    },
    //计算板块 url
    linkName(type) {
      switch (type) {
        case "media_bangumi":
          return { key: "bangumi", index: "2" };
          break;
        case "media_ft":
          return { key: "pgc", index: "3" };
          break;
        case "bili_user":
          return { key: "upuser", index: "7" };
          break;
      }
    },
    tabs(type) {
      this.$emit("allToOther", this.linkName(type));
    },
    //换页
    currentChange(page) {
      let el = document.getElementsByClassName("nav-header-box")[0];
      this.$nextTick(function () {
        window.scrollTo({ behavior: "smooth", top: el.offsetTop });
      });
      this.page = page;
      if (page != 1) {
        this.getVideo();
      } else {
        this.getAll();
      }
    },
  },
  created() {
    this.getAll();
  },
  watch: {
    $route(newVal, oldVal) {
      if (newVal != oldVal) {
        this.page = 1;
        this.orderActive = "totalrank";
        this.durationActive = "0";
        this.tidsActive = "0";
        this.$store.commit("showNum", false);
        this.getAll();
      }
    },
  },
  components: {
    bangumiCard,
    videoCard,
    upuserCard,
    gameCard,
    activityCard,
  },
  filters: {
    //返回子组件的名字 以便于循环组件
    cardType(type) {
      switch (type) {
        case "bili_user":
          return "upuserCard";
          break;
        case "media_bangumi":
          return "bangumiCard";
          break;
        case "video":
          return "videoCard";
          break;
        case "media_ft":
          return "bangumiCard";
          break;
        case "web_game":
          return "gameCard";
          break;
        case "activity":
          return "activityCard";
          break;
      }
    },
    //根据子组件的名字 返回对应的 汉字名称
    typeName(type) {
      switch (type) {
        case "media_bangumi":
          return "番剧";
          break;
        case "media_ft":
          return "影视作品";
          break;
      }
    },
  },
};
</script>

<style lang="less" scoped>
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
/deep/ .video-lsit {
  margin-right: -32px;
}

/deep/ .video-item.matrix {
  float: left;
  margin-right: 32px;
  margin-top: 20px;
}

/deep/.bangumi-item {
  border-bottom: none;
}
/deep/.upuser-item {
  border-bottom: none;
}
/deep/.game-item {
  border-bottom: none;
}
/deep/.activity-item {
  border-bottom: none;
}
#all-list {
  div {
    &:not(:last-child) {
      border-bottom: 1px solid #e5e9ef;
    }
  }
  .card-more {
    padding-bottom: 15px;
    padding-right: 8px;
    line-height: 12px;
    color: #99a2aa;
    text-align: right;
  }
}
#bili_user,
#web_game,
#media_bangumi,
#media_ft {
  margin-right: 32px !important;
}
.no-content {
  background: url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/no-data.png)
    no-repeat 50% 50%;
  height: 440px;
  line-height: 440px;
  text-align: center;
  margin-top: 20px;
}
/deep/ .switch-wrap {
  top: 20px;
}
</style>