<template>
  <div id="biliDouga" class="space-between">
    <div class="card-list">
      <header class="storey-title">
        <div class="l-con">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-douga" />
          </svg>
          <a href="/" target="_blank" class="name">动画</a>
        </div>
        <div class="exchange-btn">
          <div class="btn btn-change" @click="changeDouga">
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
        <div class="zone-list-box" v-if="isarchives">
          <common-card :showUp="true" :item="item" v-for="(item,index) in archives" :key="index"></common-card>
        </div>
      </div>
    </div>
    <rank-list :isShow="isrankList" :list="rankList"></rank-list>
  </div>
</template>

<script>
import commonCard from "../VideoCard/commonCard.vue";
import rankList from "../Storey/rankList.vue";
export default {
  data() {
    return {
      archives: [], //动画数据
      isarchives: false, //当动画数据获取到时再进行展示
      rankList: [], // 排行榜数据
      isrankList: false, //是否显示排行榜
    };
  },
  methods: {
    getDouga() {
      this.$http
        .get("/api/x/web-interface/dynamic/region?ps=12&rid=1")
        .then((res) => {
          this.archives = res.data.data.archives;
          this.isarchives = true;
        });
    },
    getRank() {
      this.$http
        .get("/api/x/web-interface/ranking/region?rid=1&day=3&original=0")
        .then((res) => {
          this.rankList = res.data.data;
          this.isrankList = true;
        });
    },
    changeDouga() {
      this.isarchives = false;
      this.getDouga();
    },
    handleScroll() {
      let el = document.getElementById("biliDouga");
      let scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      let clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      if (scrollTop > el.offsetTop - clientHeight) {
        this.getDouga();
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
    rankList,
  },
};
</script>

<style lang="less" scoped>
</style>