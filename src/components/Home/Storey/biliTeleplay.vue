<template>
  <div id="biliTeleplay">
    <div class="space-between">
      <div class="card-list">
        <header class="storey-title">
          <div class="l-con">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-teleplay" />
            </svg>
            <a href="/" target="_blank" class="name">电视剧</a>
          </div>
          <div class="exchange-btn">
            <div class="btn btn-change" @click="changeTeleplay">
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
          <div class="zone-list-box" v-if="isteleplay">
            <common-card :showUp="true" :item="item" v-for="(item,index) in teleplayList" :key="index"></common-card>
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
      teleplayList: [], //电视剧 数据列表
      isteleplay: false, //是否显示电视剧 数据列表
      rankList: [], // 排行榜数据
      isrankList: false, //是否显示排行榜
    };
  },
  methods: {
    getTeleplay() {
      this.$http
        .get("/api/x/web-interface/dynamic/region?ps=12&rid=11")
        .then((res) => {
          this.teleplayList = res.data.data.archives;
          this.isteleplay = true;
        });
    },
    getRank() {
      this.$http
        .get("/api/pgc/web/rank/list?season_type=5&day=3")
        .then((res) => {
          this.rankList = res.data.result.list.slice(0, 10);
          this.isrankList = true;
        });
    },
    changeTeleplay() {
      this.isteleplay = false;
      this.getTeleplay();
    },
    handleScroll() {
      let el = document.getElementById("biliTeleplay");
      let scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      let clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      if (scrollTop > el.offsetTop - clientHeight) {
        this.getTeleplay();
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