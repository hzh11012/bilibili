<template>
  <div id="article-list" style="position:relative;">
    <div>
      <div class="total-wrap">
        <p
          class="total-text"
          v-if="showArticle"
        >共{{article.numResults!=1000?article.numResults:article.numResults+'+'}}条数据</p>
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
        <ul class="filter-type clearfix category_id" v-show="isMore">
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
      </div>
    </div>
    <ul v-if="showArticle">
      <article-card
        :up="articleDetail"
        :item="item"
        v-for="(item,index) in article.result"
        :key="index"
      ></article-card>
    </ul>
    <el-pagination
      v-show="showArticle"
      hide-on-single-page
      @current-change="currentChange"
      background
      layout="prev, pager, next"
      :page-size="20"
      :current-page="page"
      :total="article.numResults"
    ></el-pagination>

    <div v-if="!showArticle" class="flow-loader-state">
      <div class="flow-loader-state-loading">
        <div class="load-state">
          <span class="loading">正在加载...</span>
        </div>
      </div>
    </div>
    <div v-if="article.numResults==0&&showArticle" class="flow-loader-state">
      <div class="flow-loader-state-nothing">
        <div class="error-wrap error-0">
          <p class="text">没有相关数据</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import articleCard from "./ArticleCard.vue";
export default {
  props: ["searchKey"],
  data() {
    return {
      isMore: true, //是否显示  分区
      article: [], //所有数据
      showArticle: true, //显示articleList
      //排序
      orderList: [
        { name: "默认排序", key: "totalrank" },
        { name: "最新发布", key: "pubdate" },
        { name: "最多阅读", key: "click" },
        { name: "最多喜欢", key: "attention" },
        { name: "最多评论", key: "scores" },
      ],
      orderActive: "totalrank",
      //分区
      tidsList: [
        { name: "全部分区", key: "0" },
        { name: "动画", key: "2" },
        { name: "游戏", key: "1" },
        { name: "影视", key: "28" },
        { name: "生活", key: "3" },
        { name: "兴趣", key: "29" },
        { name: "轻小说", key: "16" },
        { name: "科技", key: "17" },
      ],
      tidsActive: "0",
      page: 1, //默认第一页
      ids: "", //拼接的所有文章id  用于获取详情
      articleDetail: [], //文章列表详情
    };
  },
  methods: {
    getArticle() {
      this.showArticle = false;
      this.$http
        .get(
          "/api/x/web-interface/search/type?search_type=article&keyword=" +
            this.searchKey +
            "&page=" +
            this.page +
            "&order=" +
            this.orderActive +
            "&category_id=" +
            this.tidsActive
        )
        .then((res) => {
          this.article = res.data.data;
          if (this.article.numResults != 0) {
            let str = "";
            this.article.result.forEach((element, index) => {
              if (index == 0) {
                str += element.id;
              } else {
                str += "," + element.id;
              }
            });
            this.ids = str;
            this.getArticleDetail();
          } else {
            this.showArticle = true;
          }
        });
    },
    getArticleDetail() {
      this.$http.get("/api/x/article/metas?ids=" + this.ids).then((res) => {
        if (res.data.code == -101) {
          this.showArticle = true;
          return null;
        } else if (res.data.data == null) {
          this.showArticle = true;
          return null;
        } else {
          this.articleDetail = res.data.data;
        }

        this.showArticle = true;
      });
    },
    //排序
    order(item) {
      this.orderActive = item.key;
      this.page = 1;
      this.getArticle();
    },
    //分区
    tids(item) {
      this.tidsActive = item.key;
      this.page = 1;
      this.getArticle();
    },
    //换页
    currentChange(page) {
      let el = document.getElementsByClassName("nav-header-box")[0];
      this.$nextTick(function () {
        window.scrollTo({ behavior: "smooth", top: el.offsetTop });
      });
      this.page = page;
      this.getArticle();
    },
  },
  created() {
    this.getArticle();
  },
  watch: {
    $route(newVal, oldVal) {
      if (newVal != oldVal) {
        this.page = 1;
        this.orderActive = "totalrank";
        this.tidsActive = "0";
        this.$store.commit("showNum", false);
        this.getArticle();
      }
    },
  },
  components: {
    articleCard,
  },
};
</script>

<style lang="less" scoped>
#article-list {
  margin-bottom: 30px;
}

i {
  display: inline-block;
}
</style>