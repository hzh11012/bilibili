<template>
  <div @click="hideSuggest" class="bottom-filling">
    <nav-header :hideSearch="true" class="inter-header"></nav-header>
    <div class="bili-search">
      <div class="search-home-wrap">
        <div>
          <div class="search-home-logo"></div>
          <div class="search-home-input clearfix">
            <div class="type" :class="isShowList?'selected':''" @click="isShowList = !isShowList;">
              <span class="default">{{defaultKey}}</span>
              <i class="arrow-down"></i>
            </div>
            <ul class="list" v-show="isShowList">
              <li
                v-show="defaultKey != item.name"
                v-for="(item,index) in selected"
                :key="index"
                @click="defaultKey = item.name;$store.commit('router',{'name':item.key,index:index});isShowList=false"
              >{{item.name}}</li>
            </ul>
            <div class="input-suggest">
              <input
                class="content"
                type="text"
                maxlength="100"
                autocomplete="off"
                placeholder="搜索你想要的内容..."
                v-model="searchKey"
                @keyup.enter="search"
                @click.stop="focus"
              />
              <div class="suggest-wrap" v-if="isShowSuggestPop" id="suggestPop">
                <div class="hotword-wrap">
                  <ul class="horizontal" v-if="status==1">
                    <li
                      @click="toSearch(item.keyword,true)"
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
                      @click="toSearch(item.keyword,true)"
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
                    class="history-li"
                    @click="toSearch(item.value,true)"
                    v-for="(item,index) in searchKeyArr"
                    :key="index"
                  >
                    <a class="vt-text">{{item.value}}</a>
                    <i class="clear" @click="clearHistory(index)"></i>
                  </li>
                  <li class="clearAll">
                    <a @click="clearAllHistory">清空搜索历史</a>
                  </li>
                </ul>
              </div>
            </div>
            <a href="javascript:;" @click="search" class="searchBtn">搜索</a>
          </div>
          <div class="search-home-tips">
            <ul class="tips-link">
              <li class="tip-item" v-for="(item,index) in tipsList" :key="index">
                <a href="/">
                  <i class="search-icons" :class="item.class"></i>
                  <span class="text">{{item.name}}</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="search-home-suggest clearfix">
            <div class="hot-search">
              <div class="title">
                <i class="title-icon hot"></i>
                热门搜索
                <span class="subtitle">Daily Hot</span>
              </div>
              <ul class="hotlist">
                <li
                  class="item"
                  @click="toSearch(item.keyword,false)"
                  v-for="(item,index) in hotList.slice(0,10)"
                  :key="index"
                >
                  <span class="num" :class="index<3?'special':''">{{index+1}}</span>
                  <span class="word">{{item.keyword}}</span>
                </li>
              </ul>
              <div class="hotlist">
                <li
                  class="item"
                  @click="toSearch(item.keyword,false)"
                  v-for="(item,index) in hotList.slice(10)"
                  :key="index"
                >
                  <span class="num">{{index+11}}</span>
                  <span class="word">{{item.keyword}}</span>
                </li>
              </div>
            </div>
            <div class="history" :class="searchKeyArr==''?'no-bg':''">
              <div class="title">
                <i class="title-icon time"></i>搜索历史
                <span class="delete-history" @click="clearAllHistory">
                  <i class="icon-garbage"></i>清空
                </span>
                <span class="subtitle">History</span>
              </div>
              <ul class="list" v-show="searchKeyArr!=''">
                <li
                  class="item"
                  @click="toSearch(item.value)"
                  v-for="(item,index) in searchKeyArr"
                  :key="index"
                >
                  <a href="javascript:;">{{item.value}}</a>
                </li>
              </ul>
              <div class="no-history" v-show="searchKeyArr==''">
                <span>没有历史记录</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <inter-footer></inter-footer>
  </div>
</template>

<script>
import navHeader from "../components/Nav/Nav.vue";
import interFooter from "../components/InterFooter.vue";
export default {
  data() {
    return {
      searchKey: "", //input 输入的 搜索词
      searchKeyArr: [], // 历史搜索记录
      defaultKey: "综合", //下拉列表默认词
      isShowList: false, //默认不显示 下拉列表
      selected: [
        { name: "综合", key: "all" },
        { name: "视频", key: "video" },
        { name: "番剧", key: "bangumi" },
        { name: "影视", key: "pgc" },
        { name: "直播", key: "live" },
        { name: "专栏", key: "article" },
        { name: "话题", key: "topic" },
        { name: "用户", key: "upuser" },
        { name: "相簿", key: "photo" },
      ], //下拉列表数据
      hotList: [], //热搜词 列表
      status: 0, // 0状态 只显示vt热搜榜  有搜索记录则为1状态 显示 hor热搜榜和搜索历史
      isShowSuggestPop: false, //是否显示input 下拉框
      tipsList: [
        { name: "动画番剧", class: "icons-bangumi", href: "/" },
        { name: "最新话题", class: "icons-nowtopic", href: "/" },
        { name: "全站排行", class: "icons-allwebsite", href: "/" },
      ], //input搜索框下面的 tips按钮列表数据
    };
  },
  methods: {
    focus() {
      this.isShowSuggestPop = true;
    },
    //搜索
    search() {
      if (this.searchKey == null) {
        return;
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

      this.$router.push({
        path: "/searchresult/" + this.$store.state.router.name,
        query: { keyword: this.searchKey },
      });
    },
    //点击其他地方 隐藏下拉框
    hideSuggest() {
      let e = document.getElementById("suggestPop");
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
    //跳转到搜索结果页面
    toSearch(key, selected) {
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

      if (selected) {
        this.$router.push({
          path: "/searchresult/" + this.$store.state.router.name,
          query: { keyword: key },
        });
      } else {
        this.$router.push({
          path: "/searchresult/all",
          query: { keyword: key },
        });
      }
    },
  },
  components: {
    navHeader,
    interFooter,
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
    this.searchKey = this.$route.query.keyword;
    //获取热搜词
    this.$http.get("/search/main/hotword").then((res) => {
      this.hotList = res.data.list;
      console.log(res.data.list);
    });
  },
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
.search-home-wrap {
  width: 980px;
  margin: 0 auto;
  .search-home-logo {
    text-align: center;
    margin: 40px auto 20px;
    width: 284px;
    height: 68px;
    background: transparent
      url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/search_index_logo_v2.4.png)
      no-repeat 50%;
  }
  .search-home-input {
    width: 632px;
    margin: 0 auto 15px;
    position: relative;
    .type {
      box-sizing: content-box;
      width: 100px;
      height: 40px;
      line-height: 40px;
      border-radius: 4px 0 0 4px;
      text-align: center;
      float: left;
      border: 1px solid #ccd0d7;
      transition: border 0.1s linear;
      vertical-align: middle;
      background-color: #fff;
      cursor: pointer;
      padding: 0 7px;
      &:hover {
        border: 1px solid #aaa;
        background-image: linear-gradient(0deg, #f8f8f8, #fff);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);
      }
    }
    .selected {
      border: 1px solid #aaa;
      background-image: linear-gradient(0deg, #f8f8f8, #fff);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);
    }
    .default {
      display: inline-block;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      vertical-align: top;
      cursor: pointer;
    }
    .list {
      position: absolute;
      background: #fff;
      border: 1px solid #ccd0d7;
      border-top: 0;
      z-index: 5000;
      border-radius: 0 0 4px 4px;
      top: 40px;
      li {
        cursor: pointer;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 114px;
        text-align: center;
        height: 40px;
        line-height: 40px;
        &:hover {
          background-color: #e5e9ef;
        }
      }
    }
    .content {
      box-sizing: content-box;
      float: left;
      border: 1px solid #ddd;
      border-left: 0;
      border-right: 0;
      padding: 0 10px;
      height: 40px;
      color: #222;
      width: 374px;
      &:focus {
        height: 38px;
        border: 2px solid #222;
        border-radius: 5px;
        padding: 0 8px;
      }
    }
    .searchBtn {
      box-sizing: content-box;
      float: left;
      text-align: center;
      line-height: 40px;
      font-size: 16px;
      font-weight: bolder;
      background-color: #00a1d6;
      color: #fff;
      border: 1px solid #008cd2;
      width: 120px;
      height: 40px;
      border-radius: 0 4px 4px 0;
    }
  }
  .suggest-wrap {
    top: 42px;
    left: 115px;
    width: 393px;
  }
  .tips-link {
    text-align: center;
    .tip-item {
      display: inline-block;
      width: 150px;
      height: 24px;
      line-height: 24px;
      vertical-align: middle;
      text-align: center;
      a {
        &:hover {
          .text {
            color: #f25d8e;
          }
          .icons-bangumi {
            background-position: -3px -27px;
          }
          .icons-nowtopic {
            background-position: -3px -74px;
          }
          .icons-allwebsite {
            background-position: -3px -126px;
          }
        }
      }
    }

    .text {
      line-height: 24px;
      vertical-align: middle;
      padding: 4px 5px;
      color: #00a1d6;
    }
    .search-icons {
      background: transparent
        url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/search_icon.png)
        no-repeat 50%;
      width: 24px;
      height: 24px;
      vertical-align: middle;
      display: inline-block;
    }
    .icons-bangumi {
      background-position: -3px -2px;
    }
    .icons-nowtopic {
      background-position: -3px -49px;
    }
    .icons-allwebsite {
      background-position: -3px -101px;
    }
  }
  .search-home-suggest {
    width: 980px;
    padding-top: 81px;
    margin-top: -5px;
    margin-bottom: 45px;
    background: transparent
      url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/search_2233_bg.png)
      no-repeat top;
    .hot-search {
      box-sizing: content-box;
      float: left;
      width: 390px;
      height: 340px;
      padding: 20px 10px 20px 20px;
      margin-right: 10px;
      margin-left: 155px;
      border: 1px solid #ddd;
      .item {
        cursor: pointer;
      }
    }
    .title {
      position: relative;
      font-size: 20px;
      margin-left: 23px;
      .title-icon {
        position: absolute;
        display: inline-block;
        right: 100%;
        width: 34px;
        height: 28px;
        background: url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/search_title_icon.png)
          no-repeat;
      }
      .hot {
        background-position: -1px -1px;
      }
      .time {
        background-position: -1px -38px;
      }
      .subtitle {
        font-size: 12px;
        color: #aaa;
        display: block;
        margin-bottom: 20px;
      }
      .delete-history {
        font-size: 12px;
        color: #aaa;
        margin-left: 22px;
        cursor: pointer;
        vertical-align: middle;
        .icon-garbage {
          background: transparent
            url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/search_icon.png)
            no-repeat 0 -150px;
          width: 10px;
          height: 12px;
          margin-bottom: 3px;
          margin-right: 2px;
          vertical-align: middle;
          display: inline-block;
        }
      }
    }
    .hotlist {
      width: 160px;
      float: left;
      margin-right: 35px;
      .item {
        width: 160px;
        border-bottom: 1px dotted #eee;
        line-height: 17px;
        padding-bottom: 5px;
        margin-bottom: 5px;
        float: left;
      }
      .num {
        display: inline-block;
        vertical-align: middle;
        width: 16px;
        color: #fff;
        line-height: 16px;
        font-family: Arial, sans-serif;
        background-color: #aaa;
        margin-right: 8px;
        text-align: center;
      }
      .special {
        background-color: #f489ad;
      }
    }
    .history {
      box-sizing: content-box;
      float: left;
      width: 175px;
      height: 340px;
      padding: 20px;
      border: 1px solid #ddd;
      .list .item {
        width: 150px;
        border-bottom: 1px dotted #eee;
        padding-bottom: 5px;
        padding-left: 10px;
        margin-bottom: 5px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        cursor: pointer;
        a {
          color: #222;
        }
      }
    }
    .no-bg {
      background: transparent
        url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/no2233.png)
        no-repeat 100% 100%;
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

.arrow-down {
  background-image: url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/sprite-690be8a6ea.png);
  width: 12px;
  height: 6px;
  background-position: -442px -439px;
  vertical-align: middle;
  margin-top: -2px;
  margin-left: 5px;
  display: inline-block;
}

.bottom-filling {
  &::after {
    height: 258px;
    display: block;
    content: "";
  }
}
</style>