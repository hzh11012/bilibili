<template>
  <div id="biliDigital">
    <div class="space-between">
      <div class="card-list">
        <header class="storey-title">
          <div class="l-con">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-digital" />
            </svg>
            <a href="/" target="_blank" class="name">数码</a>
          </div>
          <div class="exchange-btn">
            <div class="btn btn-change" @click="changeDigital">
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
          <div class="zone-list-box" v-if="isdigital">
            <common-card :showUp="true" :item="item" v-for="(item,index) in digitalList" :key="index"></common-card>
          </div>
        </div>
      </div>
      <rank-list :isShow="isrankList" :list="rankList"></rank-list>
    </div>
  </div>
</template>

<script>
import commonCard from "../VideoCard/commonCard.vue";
import rankList from "../Storey/rankList.vue";
export default {
  data() {
    return {
      digitalList: [], //数码 数据列表
      isdigital: false, //是否显示数码 数据列表
      rankList: [], // 排行榜数据
      isrankList: false, //是否显示排行榜
    };
  },
  methods: {
    getDigital() {
      this.$http 
        .get("/api/x/web-interface/dynamic/region?ps=12&rid=188")
        .then((res) => {
          this.digitalList = res.data.data.archives;
          this.isdigital = true;
        });
    },
    getRank() {
      this.$http
        .get("/api/x/web-interface/ranking/region?rid=188&day=3&original=0")
        .then((res) => {
          this.rankList = res.data.data;
          this.isrankList = true;
        });
    },
    changeDigital() {
      this.isdigital = false;
      this.getDigital();
    },
    handleScroll() {
      let el = document.getElementById("biliDigital");
      let scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      let clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      if (scrollTop > el.offsetTop - clientHeight) {
        this.getDigital();
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