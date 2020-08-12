<template>
  <div id="biliInformation">
    <div class="space-between">
      <div class="card-list">
        <header class="storey-title">
          <div class="l-con">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-information" />
            </svg>
            <a href="/" target="_blank" class="name">资讯</a>
          </div>
          <div class="exchange-btn">
            <div class="btn btn-change" @click="changeInformation">
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
          <div class="zone-list-box" v-if="isinformation">
            <common-card
              :showUp="true"
              :item="item"
              v-for="(item,index) in informationList"
              :key="index"
            ></common-card>
          </div>
        </div>
      </div>
      <div class="pgc-rank">
        <header class="rank-header">
          <span class="name">{{banner.name}}</span>
        </header>
        <div class="recommend-activity">
          <a href="/" target="_blank">
            <img :src="banner.pic + '@320w_330h_1c_100q.webp'" alt />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import commonCard from "../VideoCard/commonCard.vue";
import rankList from "../Storey/rankList.vue";
export default {
  data() {
    return {
      informationList: [], //时尚 数据列表
      isinformation: false, //是否显示时尚 数据列表
      banner: [], // 排行榜数据
      isbanner: false, //是否显示排行榜
    };
  },
  methods: {
    getInformation() {
      this.$http
        .get("/api/x/web-interface/dynamic/region?ps=12&rid=202")
        .then((res) => {
          this.informationList = res.data.data.archives;
          this.isinformation = true;
        });
    },
    getBanner() {
      this.$http
        .get("/api/x/web-show/res/locs?pf=0&ids=4082%2C4084")
        .then((res) => {
          this.banner = res.data.data[4084][0];
          this.isbanner = true;
        });
    },
    changeInformation() {
      this.isinformation = false;
      this.getInformation();
    },
    handleScroll() {
      let el = document.getElementById("biliInformation");
      let scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      let clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      if (scrollTop > el.offsetTop - clientHeight) {
        this.getInformation();
        this.getBanner();
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
.recommend-activity {
  img {
    width: 100%;
    height: 314px !important;
  }
}
@media screen and (max-width: 1438px) {
  .recommend-activity {
    img {
      width: 265px !important;
      height: 274px !important;
    }
  }
}
</style>