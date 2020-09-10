<template>
  <div @click="hideSuggest" class="bottom-filling">
    <nav-header :hideSearch="true" class="inter-header"></nav-header>
    <div class="search-box" id="bili-search">
      <div class="search-contain">
        <div class="head-contain">
          <div class="search-wrap">
            <div :class="fixedTop?'fixed-top':''">
              <div class="logo-input clearfix">
                <a href="#/search" class="search-logo"></a>
                <div class="search-block">
                  <div class="input-wrap">
                    <input
                      type="text"
                      maxlength="100"
                      autocomplete="off"
                      v-model="searchKey"
                      @keyup.enter="search"
                      @click.stop="focus"
                    />
                    <div class="suggest-wrap" v-if="isShowSuggestPop" id="suggestPop1">
                      <div class="hotword-wrap">
                        <ul class="horizontal" v-if="status==1">
                          <li
                            @click="toSearch(item.keyword)"
                            v-for="(item,index) in hotList.slice(0,10)"
                            :key="index"
                          >
                            <a href="javascript:;" class="hz-text">{{item.keyword}}</a>
                          </li>
                        </ul>
                        <ul class="vertical" v-if="status==0">
                          <li class="title">
                            <span>热搜榜</span>
                          </li>
                          <li
                            @click="toSearch(item.keyword)"
                            v-for="(item,index) in hotList.slice(0,10)"
                            :key="index"
                          >
                            <a href="javascript:;" class="vt-text">
                              <span class="rank">{{index+1}}</span>
                              {{item.keyword}}
                            </a>
                          </li>
                        </ul>
                      </div>
                      <ul class="history-wrap" v-if="status==1">
                        <li class="title">
                          <span>搜索历史</span>
                        </li>
                        <li
                          @click="toSearch(item.value)"
                          class="history-li"
                          v-for="(item,index) in searchKeyArr"
                          :key="index"
                        >
                          <a class="vt-text">{{item.value}}</a>
                          <i class="clear" @click.stop="clearHistory(index)"></i>
                        </li>
                        <li class="clearAll">
                          <a @click="clearAllHistory">清空搜索历史</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="search-button" @click="search">
                    <i class="icon-search-white"></i>
                    <span class="search-text">搜索</span>
                  </div>
                  <div class="search-loupe" @click="search">
                    <i class="icon-loupe"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="navigator">
            <div class="v-switcher v-switcher-header-warp">
              <div class="v-switcher-header-tabs">
                <ul class="v-switcher-header">
                  <li class="v-switcher-header-item" v-for="(item,index) in tabsList" :key="index">
                    <a
                      @mouseenter="mouseenter(index)"
                      @mouseleave="mouseleave"
                      @click="tabs(item,index)"
                      :style="tabActive.name == item.key?'color: #00a1d6;':''"
                    >
                      {{item.name}}
                      <span
                        v-if="$store.state.showNum"
                        class="num"
                      >{{$store.state.allNum[item.num]>99?'99+':$store.state.allNum[item.num]}}</span>
                    </a>
                  </li>
                  <li
                    class="v-switcher-header-anchor"
                    :style="'transform: translateX('+(37+tabActive.index*114)+'px)'"
                  ></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="body-contain">
          <router-view @allToOther="allToOther" :searchKey="this.searchKey"></router-view>
        </div>
        <rocket></rocket>
      </div>
    </div>
    <inter-footer></inter-footer>
  </div>
</template>


<script>
import navHeader from "../components/Nav/Nav.vue";
import interFooter from "../components/InterFooter.vue";
import rocket from "../components/Rocket.vue";
export default {
  data() {
    return {
      searchKey: "", //input 输入的 搜索词
      searchKeyArr: [], // 历史搜索记录
      hotList: [], //热搜词 列表
      status: 0, // 0状态 只显示vt热搜榜  有搜索记录则为1状态 显示 hor热搜榜和搜索历史
      isShowSuggestPop: false, //是否显示input 下拉框
      tabsList: [
        { name: "综合", key: "all", num: "all" },
        { name: "视频", key: "video", num: "video" },
        { name: "番剧", key: "bangumi", num: "media_bangumi" },
        { name: "影视", key: "pgc", num: "media_ft" },
        { name: "直播", key: "live", num: "live_room" },
        { name: "专栏", key: "article", num: "article" },
        { name: "话题", key: "topic", num: "topic" },
        { name: "用户", key: "upuser", num: "bili_user" },
        { name: "相簿", key: "photo", num: "photo" },
      ], //tabs选项卡数据
      tabActive: {}, //选中tab的 子路由
      active: "",
      fixedTop: false, //搜索栏 是否固定在顶部 跟随滚动
    };
  },
  methods: {
    focus() {
      this.isShowSuggestPop = true;
    },
    //搜索
    search() {
      if (this.searchKey == "") {
        this.$router.push("/search");
        return null;
      }
      let serarch_History = JSON.parse(localStorage.getItem("serarch_History"));
      if (serarch_History == null) {
        let li = [];
        li.unshift({
          value: this.searchKey,
          isHistory: 1,
          timestamp: new Date().getTime(),
        });
        localStorage.setItem("serarch_History", JSON.stringify(li));
        this.status = 1;
      } else {
        let obj = JSON.parse(localStorage.getItem("serarch_History"));
        if (!obj.find((v) => v.value === this.searchKey)) {
          if (this.searchKeyArr.length > 9) {
            this.searchKeyArr.pop();
          }
          let li = this.searchKeyArr;
          li.unshift({
            value: this.searchKey,
            isHistory: 1,
            timestamp: new Date().getTime(),
          });
          localStorage.setItem("serarch_History", JSON.stringify(li));
          this.status = 1;
        }
      }

      this.$router.push(
        "/searchresult/" + this.tabActive.name + "?keyword=" + this.searchKey
      );
    },
    //点击其他地方 隐藏下拉框
    hideSuggest() {
      let e = document.getElementById("suggestPop1");
      if (e) {
        if (!e.contains(event.target)) {
          this.isShowSuggestPop = false;
        }
      }
    },
    //删除搜索历史记录
    clearHistory(id) {
      for (let i = 0; i < this.searchKeyArr.length; i++) {
        if (i == id) {
          this.searchKeyArr.splice(i, 1);
        }
      }
      let li = this.searchKeyArr;
      localStorage.setItem("serarch_History", JSON.stringify(li));
      if (li == "") {
        this.status = 0;
      }
    },
    //删除所有搜索历史记录
    clearAllHistory() {
      this.searchKeyArr = [];
      this.status = 0;
      localStorage.setItem(
        "serarch_History",
        JSON.stringify(this.searchKeyArr)
      );
    },
    //切换选项卡
    tabs(item, index) {
      this.tabActive = { name: item.key, index: index };
      this.active = index;
      this.$router.push(
        "/searchresult/" + item.key + "?keyword=" + this.$route.query.keyword
      );
    },
    toSearch(key) {
      this.searchKey = key;
      let serarch_History = JSON.parse(localStorage.getItem("serarch_History"));
      if (serarch_History == null) {
        let li = [];
        li.unshift({
          value: key,
          isHistory: 1,
          timestamp: new Date().getTime(),
        });
        localStorage.setItem("serarch_History", JSON.stringify(li));
        this.status = 1;
      } else {
        let obj = JSON.parse(localStorage.getItem("serarch_History"));
        if (!obj.find((v) => v.value === key)) {
          if (this.searchKeyArr.length > 9) {
            this.searchKeyArr.pop();
          }
          let li = this.searchKeyArr;
          li.unshift({
            value: key,
            isHistory: 1,
            timestamp: new Date().getTime(),
          });
          localStorage.setItem("serarch_History", JSON.stringify(li));
          this.status = 1;
        }
      }
      this.$router.push(
        "/searchresult/" + this.tabActive.name + "?keyword=" + key
      );
      this.isShowSuggestPop = false;
    },
    //滚动监听
    scrollToTops(e) {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > 150) {
        this.fixedTop = true;
      } else {
        this.fixedTop = false;
      }
    },
    mouseenter(index) {
      this.tabActive = { name: this.tabActive.name, index: index };
    },
    mouseleave() {
      this.tabActive = { name: this.tabActive.name, index: this.active };
    },
    allToOther(active) {
      this.tabs(active, active.index);
    },
  },
  created() {
    if (localStorage.getItem("serarch_History") !== null) {
      this.searchKeyArr = JSON.parse(localStorage.getItem("serarch_History"));
      if (this.searchKeyArr.length != 0) {
        this.status = 1;
      }
    } else {
      const li = [];
      localStorage.setItem("serarch_History", JSON.stringify(li));
    }

    let rt = this.$route.path.slice(this.$route.path.lastIndexOf("/") + 1);
    let index = 0;
    for (let i = 0; i < this.tabsList.length; i++) {
      if (rt == this.tabsList[i].key) {
        index = i;
      }
    }
    this.$store.commit("router", { name: rt, index: index });
    this.tabActive = this.$store.state.router;
    this.active = this.tabActive.index;
    this.searchKey = this.$route.query.keyword;
    //获取热搜词
    this.$http.get("/search/main/hotword").then((res) => {
      this.hotList = res.data.list;
    });
  },
  mounted() {
    this.$nextTick(function () {
      window.addEventListener("scroll", this.scrollToTops, true);
    });
  },
  destroyed() {
    window.addEventListener("scroll", this.scrollToTops, true);
  },
  components: {
    navHeader,
    interFooter,
    rocket,
  },
  // watch: {
  //   $route(newVal, oldVal) {
  //     if (newVal != oldVal) {
  //       // tabsList.forEach((item, index) => {
  //       //   item.key == newVal.path.slice(14);
  //       //   const indexs = index;
  //       // });
  //       // this.tabActive = { name: newVal.path.slice(14), index: indexs };
  //       // console.log(newVal.path.slice(14)+indexs);
  //     }
  //   },
  // },
};
</script>

<style lang="less" scoped>
.inter-header {
  position: relative;
  height: 57px;
  /deep/ a {
    color: #212121 !important;
    text-shadow: none !important;
  }
  /deep/ .txt {
    color: #212121 !important;
    text-shadow: none !important;
  }
  /deep/ .icon {
    color: #00a1d6;
  }
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
}
.bottom-filling {
  height: 100%;
  &::after {
    height: 278px;
    display: block;
    content: "";
  }
}

.search-contain {
  width: 980px;
  margin: 0 auto;
}
.head-contain {
  padding-top: 40px;
}
.search-wrap {
  height: 44px;
  margin: 0 auto;
  position: relative;
  width: 587px;
  .search-logo {
    background-image: url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/sprite-690be8a6ea.png);
    background-position: -261px -72px;
    width: 131px;
    height: 37px;
    float: left;
    margin-top: 7px;
  }
  .search-block {
    width: 430px;
    float: left;
    margin-left: 26px;
    .input-wrap {
      position: relative;
      background: #fff;
      border-radius: 4px;
      float: left;
      width: 330px;
      margin-right: 10px;
      input {
        box-sizing: content-box;
        height: 18px;
        box-shadow: none;
        padding: 11px 15px;
        background: transparent;
        width: 296px;
        border: 2px solid #ccd0d7;
        border-radius: 4px;
        font-size: 16px;
        color: #222;
        &:focus {
          border: 2px solid #222;
        }
      }
    }
    .search-button {
      cursor: pointer;
      float: left;
      color: #fff;
      background: #00a1d6;
      font-size: 16px;
      letter-spacing: 2px;
      line-height: 44px;
      text-align: center;
      width: 90px;
      border-radius: 4px;
      .icon-search-white {
        background-image: url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/sprite-690be8a6ea.png);
        background-position: -148px -327px;
        width: 18px;
        vertical-align: middle;
        margin-top: -2px;
        height: 19px;
        display: inline-block;
      }
      .search-text {
        margin-left: 7px;
      }
    }
  }
}

.suggest-wrap {
  box-sizing: content-box;
  border: 1px solid #e5e9ef;
  position: absolute;
  width: 327px;
  border-radius: 4px;
  text-align: center;
  padding: 10px 0;
  color: #222;
  background: #fff;
  z-index: 100;
  overflow: hidden;
  margin-top: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);
  .horizontal {
    padding: 0 20px;
    max-height: 84px;
    overflow: hidden;
    .hz-text {
      box-sizing: content-box;
      border-radius: 4px;
      margin-right: 15px;
      margin-bottom: 10px;
      border: 1px solid #e5e9ef;
      color: #222;
      height: 18px;
      padding: 7px 8px;
      float: left;
      text-align: center;
      font-size: 14px;
      &:hover {
        border-color: #00a1d6;
        color: #00a1d6;
      }
    }
  }
  .vertical {
    margin-top: 10px;
  }
  .vt-text {
    height: 32px;
    display: block;
    line-height: 32px;
    font-size: 14px;
    position: relative;
    text-align: left;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: pointer;
    color: #222;
    padding: 0 20px;
    margin: 0 0 4px;
    .rank {
      margin-right: 10px;
      color: #b8c0cc;
    }
    &:hover {
      background-color: #e5e9ef;
    }
  }
  .vertical > li:nth-child(2) .rank {
    color: #e84242;
  }
  .vertical > li:nth-child(3) .rank {
    color: #ff6a22;
  }
  .vertical > li:nth-child(4) .rank {
    color: #e39423;
  }
  .history-wrap {
    margin-top: 20px;
    position: relative;
    padding-bottom: 20px;
    .history-li {
      position: relative;
      margin: 0;
      .clear {
        position: absolute;
        right: 20px;
        top: 10px;
        background-image: url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/sprite-690be8a6ea.png);
        background-position: -485px -41px;
        width: 12px;
        height: 12px;
        cursor: pointer;
      }
    }
    .clearAll {
      position: absolute;
      bottom: 0;
      right: 20px;
      font-size: 12px;
      color: #00a1d6;
      a {
        cursor: pointer;
      }
    }
  }
  .title {
    border-top: 1px solid #e5e9ef;
    height: 10px;
    line-height: 10px;
    margin: 0 20px;
    span {
      display: inline-block;
      font-size: 12px;
      color: #99a2aa;
      padding: 0 10px;
      text-align: center;
      background: #fff;
      position: relative;
      top: -6px;
    }
  }
}
#navigator {
  overflow: hidden;
  margin-top: 18px;
  .v-switcher {
    margin-left: -37px;
    margin-right: -9px;
  }
  .v-switcher-header-item {
    border-bottom: 1px solid #ccd0d7;
    box-sizing: border-box;
    a {
      font-size: 16px;
      color: #000;
      display: block;
      cursor: pointer;
      span {
        position: absolute;
        margin-left: 6px;
        font-size: 12px;
        color: #6d757a;
      }
      &:hover {
        color: #00a1d6;
      }
    }
  }
  .v-switcher-header-anchor {
    background-color: #00a1d6;
    height: 2px;
    top: 54px;
  }
}
.v-switcher-header-warp {
  height: 56px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}
.v-switcher-header-tabs {
  overflow: hidden;
  height: 100%;
  flex-grow: 1;
}
.v-switcher-header {
  position: relative;
  font-size: 0;
  z-index: 1;
  padding: 0;
  margin: 0;
  white-space: nowrap;
  flex-grow: 1;
}
.v-switcher-header-item {
  display: inline-block;
  text-align: center;
  font-size: 15px;
  color: #657786;
  vertical-align: middle;
  white-space: nowrap;
  height: 56px;
  line-height: 56px;
  width: 11.11111111111111%;
}
.v-switcher-header-anchor {
  display: block;
  position: absolute;
  left: 0;
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-property: width, height, transform;
  will-change: transform;
  pointer-events: none;
  width: 40px;
  transition-duration: 200ms;
}

//下拉一定距离 搜索栏目 固定在顶部
.search-wrap .fixed-top {
  animation: fadeIn 0.5s;
  width: 100%;
  z-index: 10000;
  position: fixed;
  top: 0;
  left: 0;
  background: hsla(0, 0%, 100%, 0.9);
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.15);
  height: 50px;
  .logo-input {
    width: 960px;
    height: 50px;
    margin: 0 auto;
    text-align: center;
    position: relative;
  }
  .search-block {
    position: absolute;
    height: 30px;
    width: 330px;
    bottom: 10px;
    left: 300px;
    border-radius: 4px;
    .input-wrap {
      height: 100%;
      position: relative;
      background: #fff;
      border-radius: 4px;
      width: 330px;
      margin-right: 10px;
      input {
        width: 279px;
        height: 14px;
        border: 2px solid #ccd0d7;
        border-radius: 4px;
        font-size: 16px;
        padding: 8px 32px 8px 15px;
        &:focus {
          border: 2px solid #222;
        }
      }
    }
    .search-button {
      display: none;
    }
    .search-loupe {
      display: block;
      .icon-loupe {
        background-image: url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/sprite-690be8a6ea.png);
        background-position: -261px -376px;
        width: 32px;
        height: 32px;
        display: block;
        position: absolute;
        right: 4px;
        top: -1px;
        z-index: 10;
        cursor: pointer;
        &:hover {
          background-position: -380px -137px;
        }
      }
    }
  }
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

//子组件css
/deep/ .total-wrap {
  position: relative;
  margin-top: 10px;
  .total-text {
    display: inline-block;
    line-height: 16px;
    color: #99a2aa;
  }
}
/deep/ .lazy-img {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABHCAMAAAB4UkqjAAAAh1BMVEUAAADd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d0UCIZXAAAALHRSTlMAoJDx4OYL/DcGF+6+JNi4ycSIT2k6LPeWfRzTVPXPszEQrV0hpo12cEZAZFpRNIQAAAJVSURBVFjD7dbZcpswGIbhHwwSi81q8Ib33fnu//oatRIpmliDhQ/aaZ+TKInnjVgkhb4RJMhP9Fzo8PiD+vEA+JPnqS0+1dRHBJhibAzh2HNeekxP9Z8XBSMZM6SmRBYx65QeM6XsY3rKPqanLGMWqeDmOh0b/Io9+YHi3gKtdExgLznSlyjFMGnUphIMlcgY22C4DSPBxTu4IrXDe+yI6IDWbPSqGVoHoohDyip6XZVB4hFN1TgPyUaYQ5rSWQ0nZGcC6UyJukKypa4yIXX3HLLlqCdHX++HLRfS/9bbWvvHLSLNR3N6tRXdFwdxejekiYF4fDnWYa/WqSm2PqRCSy0hrbP5RxAaW8141N17tVbZ+S1fFYbWFF2+1lqg62BoBdAsqWOLroWhxTh+M8vmWuuaxp1WaWjRSn43yl35sHTLUjxiaWlqnYE4LZoJme3v13MibqepFZRL6otV5V+/Hv+xVvi+FsvZG1qh/LQ7uFXnF/HlwcEfYlDktW2r5EARUiXWc1xRWAC8tGwxsdJ9dcRnYrddMdtrjDZyAy3kXrSJ7O89u8zEZAIKxBRnFzbonWD3ZkfCrrmzP+6979nicjAnW3NZ4OS1R6GtVBa8drTek539up3NAgMvcv51WNZQitCiFBZQaqIMSrx1XrWNoWTy/w1r+hk+xjuMSVjGGC6WZ3S1xlDriqTKxzB+Ra3I4bDHne62drqmied57QR9z0D94dHnOEmvJ/pWAMm4ovL2TTcJ5cRyMlHrbkdG5c/5r82fYqt+K/iR89m2JrP9PEZyI80PsPxVT0P3FAEAAAAASUVORK5CYII=)
    50% no-repeat;
  width: 100%;
  height: 100%;
  display: inline-block;
  border-radius: 4px;
  overflow: hidden;
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
/deep/ .filter-wrap {
  height: auto;
  padding: 20px 0 10px;
  position: relative;
  border-bottom: 1px solid #e5e9ef;
  display: table;
  width: 100%;
  .filter-type {
    padding-bottom: 10px;
  }
  .tids_1 {
    position: relative;
  }
  .filter-item {
    float: left;
    padding-left: 8px;
    padding-right: 8px;
    border-radius: 4px;
    margin-right: 15px;
    a {
      color: #222;
      font-size: 12px;
      line-height: 20px;
    }
    &:not(.active):hover {
      a {
        color: #00a1d6;
      }
    }
  }
  .active {
    background-color: #00a1d6;
    a {
      color: #fff;
    }
  }
  .tids_1 > .filter-item {
    margin-right: 8px;
    &:nth-child(2) {
      margin-left: 6px;
    }
  }
  .fold {
    cursor: pointer;
    position: absolute;
    border-radius: 4px;
    line-height: 24px;
    font-size: 12px;
    color: #6d757a;
    right: 0;
    display: inline-block;
    width: 74px;
    text-align: center;
    &:hover {
      background-color: #e5e9ef;
      color: #00a1d6;
    }
  }
  .up {
    bottom: 18px;
  }
  .down {
    left: 416px;
    top: 18px;
  }
}
/deep/.arrow-up,
/deep/.arrow-down {
  background-image: url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/sprite-690be8a6ea.png);
  width: 12px;
  height: 6px;
  vertical-align: middle;
  margin-top: -2px;
  margin-left: 3px;
}
/deep/.arrow-down {
  background-position: -442px -439px;
}
/deep/.arrow-up {
  background-position: -442px -403px;
}

/deep/ .el-pagination {
  padding: 30px 27px 35px;
  text-align: center;
}
/deep/ .load-state {
  box-sizing: content-box;
  text-align: center;
  padding: 10px 0;
  color: #99a2aa;
  height: 540px;
  display: table;
  width: 100%;
  .loading {
    vertical-align: middle;
    display: table-cell;
    &::before {
      content: "";
      display: inline-block;
      vertical-align: middle;
      background-repeat: no-repeat;
      margin-right: 5px;
      width: 24px;
      height: 24px;
      margin-top: -5px;
      background-image: url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/loading.gif);
      text-align: center;
    }
  }
}
/deep/ .error-wrap {
  width: 100%;
  margin-top: 20px;
  border: 1px solid #e5e9ef;
  background: url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/no_more.png)
    50% 100% no-repeat;
  background-color: #fff;
  line-height: 440px;
  text-align: center;
  height: inherit;
  color: #777;
  position: relative;
  .text {
    font-size: 25px;
  }
}

/deep/ .is-background {
  .el-pager li {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    width: 36px;
    background-color: #fff !important;
    border: 1px solid #ddd;
    border-radius: 4px !important;
    transition: all 0.2s;
    &:not(.disabled):hover {
      color: #fff !important;
      background-color: #00a1d6 !important;
      border: 1px solid #00a1d6 !important;
    }
    &:not(.disabled).active {
      color: #fff !important;
      background-color: #00a1d6 !important;
      border: 1px solid #00a1d6 !important;
    }
  }
  .btn-next:disabled,
  .btn-prev:disabled {
    display: none;
  }
}
/deep/ .btn-prev,
/deep/ .btn-next {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  width: 36px;
  background-color: #fff !important;
  border: 1px solid #ddd;
  border-radius: 4px !important;
  transition: all 0.2s;
  &:hover {
    background-color: #00a1d6 !important;
    color: #fff !important;
    border: 1px solid #00a1d6;
  }
}
</style>