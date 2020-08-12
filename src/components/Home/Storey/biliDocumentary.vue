<template>
  <div id="biliDocumentary">
    <div class="space-between">
      <div class="card-list">
        <header class="storey-title">
          <div class="l-con">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-documentary" />
            </svg>
            <a href="/" target="_blank" class="name">纪录片</a>
          </div>
          <div class="exchange-btn">
            <div class="btn btn-change" @click="changeDocumentary">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shuaxin" />
              </svg>
              换一换
            </div>
            <a href="/" target="_blank" class="btn more">
              更多
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiala" />
              </svg>
            </a>
          </div>
        </header>
        <div class="zone-list-box">
          <div class="zone-list-box" v-if="isdocumentary">
            <common-card :showUp="true" :item="item" v-for="(item,index) in documentaryList" :key="index"></common-card>
          </div>
        </div>
      </div>
      <div class="pgc-rank">
        <header class="rank-header">
          <span class="name">排行榜</span>
          <a href="/" target="_blank" class="more">
            更多
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiala" />
            </svg>
          </a>
        </header>
        <div v-if="isrankList">
          <div class="pgc-rank-wrap" v-for="(item,index) in rankList" :key="index">
            <span class="number" :class="index<3?'on':''">{{index + 1}}</span>
            <a href="/" target="_blank" class="link">
              <p class="txt">
                <span :title="item.title" class="title">{{item.title}}</span>
                <span class="update">{{item.new_ep.index_show}}</span>
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import commonCard from "../VideoCard/commonCard.vue";
export default {
  data() {
    return {
      documentaryList: [], //纪录片 数据列表
      isdocumentary: false, //是否显示纪录片 数据列表
      rankList: [], // 排行榜数据
      isrankList: false, //是否显示排行榜
    };
  },
  methods: {
    getDocumentary() {
      this.$http
        .get("/api/x/web-interface/dynamic/region?ps=12&rid=177")
        .then((res) => {
          this.documentaryList = res.data.data.archives;
          this.isdocumentary = true;
        });
    },
    getRank() {
      this.$http
        .get("/api/pgc/season/rank/web/list?season_type=3&day=3")
        .then((res) => {
          this.rankList = res.data.data.list.slice(0, 10);
          this.isrankList = true;
        });
    },
    changeDocumentary() {
      this.isdocumentary = false;
      this.getDocumentary();
    },
    handleScroll() {
      let el = document.getElementById("biliDocumentary");
      let scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      let clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      if (scrollTop > el.offsetTop - clientHeight) {
        this.getDocumentary();
        this.getRank();
        window.removeEventListener("scroll", this.handleScroll, true);
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  components: {
    commonCard,
  },
};
</script>

<style lang="less" scoped>
</style>