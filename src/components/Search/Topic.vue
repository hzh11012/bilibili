<template>
  <div id="topic-list" style="position:relative;">
    <div>
      <div class="total-wrap">
        <p
          class="total-text"
          v-if="showTopic"
        >共{{topic.numResults!=1000?topic.numResults:topic.numResults+'+'}}条数据</p>
        <p class="total-text" v-else>共0条数据</p>
      </div>
    </div>
    <ul v-if="showTopic">
      <topic-card :item="item" v-for="(item,index) in topic.result" :key="index"></topic-card>
    </ul>
    <el-pagination
      v-show="showTopic"
      hide-on-single-page
      @current-change="currentChange"
      background
      layout="prev, pager, next"
      :page-size="20"
      :current-page="page"
      :total="topic.numResults"
    ></el-pagination>

    <div v-if="!showTopic" class="flow-loader-state">
      <div class="flow-loader-state-loading">
        <div class="load-state">
          <span class="loading">正在加载...</span>
        </div>
      </div>
    </div>
    <div v-if="topic.numResults==0&&showTopic" class="flow-loader-state">
      <div class="flow-loader-state-nothing">
        <div class="error-wrap error-0">
          <p class="text">没有相关数据</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import topicCard from "./TopicCard.vue";
export default {
  props: ["searchKey"],
  data() {
    return {
      topic: [], //所有数据
      showTopic: true, //显示topicList
      page: 1, //默认第一页
    };
  },
  methods: {
    getTopic() {
      this.showTopic = false;
      this.$http
        .get(
          "/api/x/web-interface/search/type?search_type=topic&highlight=1&keyword=" +
            this.searchKey +
            "&page=" +
            this.page
        )
        .then((res) => {
          this.topic = res.data.data;
          this.showTopic = true;
        });
    }, //换页
    currentChange(page) {
      let el = document.getElementsByClassName("nav-header-box")[0];
      this.$nextTick(function () {
        window.scrollTo({ behavior: "smooth", top: el.offsetTop });
      });
      this.page = page;
      this.getTopic();
    },
  },
  created() {
    this.getTopic();
  },
  watch: {
    $route(newVal, oldVal) {
      if (newVal != oldVal) {
        this.page = 1;
        this.$store.commit("showNum", false);
        this.getTopic();
      }
    },
  },
  components: {
    topicCard,
  },
};
</script>
