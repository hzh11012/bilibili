<template>
  <div id="photo-list" style="position: relative;">
    <div>
      <div class="total-wrap">
        <p
          class="total-text"
          v-if="showPhoto"
        >共{{photo.numResults!=1000?photo.numResults:photo.numResults+'+'}}条数据</p>
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
    <ul  v-if="showPhoto"  class="clearfix">
      <photo-card :item="item" v-for="(item,index) in photo.result" :key="index"></photo-card>
    </ul>
    <el-pagination
      v-show="showPhoto"
      hide-on-single-page
      @current-change="currentChange"
      background
      layout="prev, pager, next"
      :page-size="20"
      :current-page="page"
      :total="photo.numResults"
    ></el-pagination>

    <div v-if="!showPhoto" class="flow-loader-state">
      <div class="flow-loader-state-loading">
        <div class="load-state">
          <span class="loading">正在加载...</span>
        </div>
      </div>
    </div>
    <div v-if="photo.numResults==0&&showPhoto" class="flow-loader-state">
      <div class="flow-loader-state-nothing">
        <div class="error-wrap error-0">
          <p class="text">没有相关数据</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import photoCard from "./PhotoCard.vue";
export default {
  props: ["searchKey"],
  data() {
    return {
      isMore: true, //是否显示  分区
      photo: [], //所有数据
      showPhoto: true, //显示photoList
      //排序
      orderList: [
        { name: "默认排序", key: "totalrank" },
        { name: "最多收藏", key: "stow" },
        { name: "最新发布", key: "pubdate" },
      ],
      orderActive: "totalrank",
      //分区
      tidsList: [
        { name: "全部分区", key: "0" },
        { name: "画友", key: "1" },
        { name: "摄影", key: "2" },
      ],
      tidsActive: "0",
      page: 1, //默认第一页
    };
  },
  methods: {
    getPhoto() {
      this.showPhoto = false;
      this.$http
        .get(
          "/api/x/web-interface/search/type?search_type=photo&highlight=1&keyword=" +
            this.searchKey +
            "&page=" +
            this.page +
            "&order=" +
            this.orderActive +
            "&category_id=" +
            this.tidsActive
        )
        .then((res) => {
          this.photo = res.data.data;
          this.showPhoto = true;
        });
    },
    //排序
    order(item) {
      this.orderActive = item.key;
      this.page = 1;
      this.getPhoto();
    },
    //分区
    tids(item) {
      this.tidsActive = item.key;
      this.page = 1;
      this.getPhoto();
    },
    //换页
    currentChange(page) {
      let el = document.getElementsByClassName("nav-header-box")[0];
      this.$nextTick(function () {
        window.scrollTo({ behavior: "smooth", top: el.offsetTop });
      });
      this.page = page;
      this.getPhoto();
    },
  },
  created() {
    this.getPhoto();
  },
  watch: {
    $route(newVal, oldVal) {
      if (newVal != oldVal) {
        this.page = 1;
        this.orderActive = "totalrank";
        this.tidsActive = "0";
        this.$store.commit("showNum", false);
        this.getPhoto();
      }
    },
  },
  components: {
    photoCard,
  },
};
</script>

<style lang="less" scoped>
i {
  display: inline-block;
}
#photo-list {
  margin-bottom: 30px;
  .photo-item {
    float: left;
    margin-right: 32.5px;
    margin-top: 20px;
    &:nth-child(5n) {
      margin-right: 0;
    }
  }
}
</style>