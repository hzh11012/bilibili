<template>
  <div id="bangumi-list" style="position:relative;">
    <div>
      <div class="total-wrap">
        <p
          class="total-text"
          v-if="showBangumi"
        >共{{bangumi.numResults!=1000?bangumi.numResults:bangumi.numResults+'+'}}条数据</p>
        <p class="total-text" v-else>共0条数据</p>
      </div>
    </div>
    <ul v-if="showBangumi">
      <bangumi-card :item="item" v-for="(item,index) in bangumi.result" :key="index"></bangumi-card>
    </ul>
    <el-pagination
      v-show="showBangumi"
      hide-on-single-page
      @current-change="currentChange"
      background
      layout="prev, pager, next"
      :page-size="20"
      :current-page="page"
      :total="bangumi.numResults"
    ></el-pagination>

    <div v-if="!showBangumi" class="flow-loader-state">
      <div class="flow-loader-state-loading">
        <div class="load-state">
          <span class="loading">正在加载...</span>
        </div>
      </div>
    </div>
    <div v-if="bangumi.numResults==0&&showBangumi" class="flow-loader-state">
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
      bangumi: [], //所有数据
      page: 1, //默认第一页
      showBangumi: true, //显示bangumiList
    };
  },
  methods: {
    getBangumi() {
      this.showBangumi = false;
      this.$http
        .get(
          "/api/x/web-interface/search/type?search_type=media_bangumi&keyword=" +
            this.searchKey +
            "&page=" +
            this.page
        )
        .then((res) => {
          this.bangumi = res.data.data;
          this.showBangumi = true;
        });
    },
    currentChange(page) {
      let el = document.getElementsByClassName("nav-header-box")[0];
      this.$nextTick(function () {
        window.scrollTo({ behavior: "smooth", top: el.offsetTop });
      });
      this.page = page;
      this.getBangumi();
    },
  },
  created() {
    this.getBangumi();
  },
  watch: {
    $route(newVal, oldVal) {
      if (newVal != oldVal) {
        this.page = 1;
        this.$store.commit("showNum", false);
        this.getBangumi();
      }
    },
  },
  components: {
    bangumiCard,
  },
};
</script>

<style lang="less" scoped>
</style>