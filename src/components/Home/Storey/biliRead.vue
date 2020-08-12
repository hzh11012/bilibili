<template>
  <div id="biliRead">
    <div class="space-between">
      <div class="article-list">
        <header class="storey-title">
          <div class="l-con">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-read" />
            </svg>
            <a href="/" target="_blank" class="name">专栏</a>
          </div>
          <div class="exchange-btn">
            <div class="btn btn-change" @click="changeRead">
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
          <div class="zone-list-box" v-if="isread">
            <div class="article-card" v-for="(item,index) in readlList" :key="index">
              <a href="/" class="pic">
                <img :src="item.image_urls[0]+'@120w_90h_1c_100q.webp'" alt />
              </a>
              <div class="r-con">
                <a href="/" class="title" :title="item.title">{{item.title}}</a>
                <a href="/" class="up">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-up" />
                  </svg>
                  {{item.author.name}}
                </a>
                <p class="count">
                  <span>
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-yuedushu" />
                    </svg>
                    {{item.stats.view | setNum}}
                  </span>
                  <span>
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-pinglunshu" />
                    </svg>
                    {{item.stats.reply | setNum}}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <rank-list :isShow="isrankList" :list="rankList"></rank-list>
    </div>
  </div>
</template>

<script>
import rankList from "../Storey/rankList1.vue";
export default {
  data() {
    return {
      readlList: [], //娱乐 数据列表
      isread: false, //是否显示娱乐 数据列表
      rankList: [], // 排行榜数据
      isrankList: false, //是否显示排行榜
    };
  },
  methods: {
    getRead() {
      this.$http.get("/api/x/article/recommends?ps=8").then((res) => {
        this.readlList = res.data.data;
        this.isread = true;
      });
    },
    getRank() {
      this.$http.get("/api/x/article/rank/list?cid=3").then((res) => {
        this.rankList = res.data.data;
        this.isrankList = true;
      });
    },
    changeRead() {
      this.isread = false;
      this.getRead();
    },
    handleScroll() {
      let el = document.getElementById("biliRead");
      let scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      let clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      if (scrollTop > el.offsetTop - clientHeight) {
        this.getRead();
        this.getRank();
        window.removeEventListener("scroll", this.handleScroll, true);
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  components: {
    rankList,
  },
};
</script>

<style lang="less" scoped>
.article-card {
  display: flex;
  width: 623px;
  height: 90px;
  .pic {
    display: block;
    width: 120px;
    height: 90px;
    margin-right: 16px;
    img {
      width: 120px;
      height: 90px;
      border-radius: 2px;
    }
  }
  .r-con {
    .title {
      display: block;
      font-size: 14px;
      line-height: 20px;
      margin: 0 0 8px;
      height: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      font-weight: 500;
    }
    .up {
      color: #999;
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      &:hover {
        .icon {
          color: #00a1d6;
        }
        color: #00a1d6;
      }
    }
    .count {
      color: #999;
      display: flex;
      span {
        display: flex;
        width: 80px;
        align-items: center;
      }
    }
    .icon {
      color: #999;
      font-size: 20px;
      transition: color 0.3s;
      margin-right: 3px;
    }
  }
}
</style>