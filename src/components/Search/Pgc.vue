<template>
  <div id="pgc-list" style="position:relative;">
    <div>
      <div class="total-wrap">
        <p
          class="total-text"
          v-if="showPgc"
        >共{{pgc.numResults!=1000?pgc.numResults:pgc.numResults+'+'}}条数据</p>
        <p class="total-text" v-else>共0条数据</p>
      </div>
    </div>
    <ul v-if="showPgc">
      <bangumi-card :item="item" v-for="(item,index) in pgc.result" :key="index"></bangumi-card>
    </ul>
    <el-pagination
      v-show="showPgc"
      hide-on-single-page
      @current-change="currentChange"
      background
      layout="prev, pager, next"
      :page-size="20"
      :current-page="page"
      :total="pgc.numResults"
    ></el-pagination>

    <div v-if="!showPgc" class="flow-loader-state">
      <div class="flow-loader-state-loading">
        <div class="load-state">
          <span class="loading">正在加载...</span>
        </div>
      </div>
    </div>
    <div v-if="pgc.numResults==0&&showPgc" class="flow-loader-state">
      <div class="flow-loader-state-nothing">
        <div class="error-wrap error-0">
          <p class="text">没有相关数据</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bangumiCard from "./BangumiCard.vue";
export default {
  props: ["searchKey"],
  data() {
    return {
      pgc: [], //所有数据
      page: 1, //默认第一页
      showPgc: true, //显示pgcList
    };
  },
  methods: {
    getPgc() {
      this.showPgc = false;
      this.$http
        .get(
          "/api/x/web-interface/search/type?search_type=media_ft&keyword=" +
            this.searchKey +
            "&page=" +
            this.page
        )
        .then((res) => {
          this.pgc = res.data.data;
          this.showPgc = true;
        });
    },
    currentChange(page) {
      let el = document.getElementsByClassName("nav-header-box")[0];
      this.$nextTick(function () {
        window.scrollTo({ behavior: "smooth", top: el.offsetTop });
      });
      this.page = page;
      this.getPgc();
    },
  },
  created() {
    this.getPgc();
  },
  watch: {
    $route(newVal, oldVal) {
      if (newVal != oldVal) {
        this.page = 1;
        this.$store.commit("showNum", false);
        this.getPgc();
      }
    },
  },
  components: {
    bangumiCard,
  },
};
</script>

