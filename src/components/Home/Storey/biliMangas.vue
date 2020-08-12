<template>
  <div id="biliManga">
    <gg-card v-if="isGG" :item="gg[0]"></gg-card>
    <div class="space-between">
      <div class="manga-panel">
        <header class="storey-title">
          <div class="l-con">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-manhua" />
            </svg>
            <a href="/" target="_blank" class="name">漫画</a>
            <div class="left-slot">
              <div class="tab-switch">
                <div class="tab-switch-item" :class="active==0?'on':''" @click="switchTab(0)">人气推荐</div>
                <div class="tab-switch-item" :class="active==1?'on':''" @click="switchTab(1)">免费漫画推荐</div>
              </div>
              <a href="/" target="_blank" class="app-download-link">
                下载APP
                <span>领卷免费看</span>
              </a>
            </div>
          </div>
          <div class="exchange-btn">
            <div class="btn btn-change" @click="changeManga">
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
        <div class="manga-list-box">
          <div class="manga-list-box" v-if="iscomics">
            <a
              href="/"
              target="_blank"
              class="manga-card"
              v-for="(item,index) in list"
              :key="index"
            >
              <img :src="item.vertical_cover+'@206w_275h_1c_90q.webp'" />
              <p title="超品战兵" class="manga-title">{{item.title}}</p>
              <p
                class="manga-tag"
                v-if="active==0"
              >{{item.styles.length>1?(item.styles[0] +' '+ item.styles[1]):item.styles[0]}}</p>
              <p
                class="manga-tag"
                v-else
              >{{item.styles.length>1?(item.styles[0].name +' '+ item.styles[1].name):item.styles[0].name}}</p>
            </a>
          </div>
        </div>
      </div>
      <div class="manga-rank">
        <header class="rank-header">
          <span class="name">排行榜</span>
          <div class="tab-switch">
            <div class="tab-switch-item" :class="active1==0?'on':''" @click="switchTab1(0)">月票</div>
            <div class="tab-switch-item" :class="active1==1?'on':''" @click="switchTab1(1)">应援</div>
            <div class="tab-switch-item" :class="active1==2?'on':''" @click="switchTab1(2)">飙升</div>
          </div>
          <a href="/" target="_blank" class="more">
            更多
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiala" />
            </svg>
          </a>
        </header>
        <div class="manga-rank-wrap">
          <div class="manga-rank-list">
            <div v-if="isRank">
              <div class="manga-rank-item">
                <span class="rank-number on">1</span>
                <div class="preview">
                  <a href="/" target="_blank" class="preview-link">
                    <img :src="rank[0].vertical_cover+'@112w_149h_1c_100q.webp'" />
                    <div class="preview-desc">
                      <p :title="rank[0].title" class="title">{{rank[0].title}}</p>
                      <p
                        class="style"
                      >{{rank[0].styles.length>1?(rank[0].styles[0].name +' '+ rank[0].styles[1].name):rank[0].styles[0].name}}</p>
                      <p
                        :title="'更新至'+ (rank[0].last_short_title.indexOf('话')!=-1 || rank[0].last_short_title.indexOf('回')!=-1?rank[0].last_short_title:(rank[0].last_short_title+'话'))"
                        class="update"
                      >更新至{{rank[0].last_short_title.indexOf('话')!=-1 || rank[0].last_short_title.indexOf('回')!=-1?rank[0].last_short_title:(rank[0].last_short_title+'话')}}</p>
                    </div>
                  </a>
                </div>
              </div>
              <div class="manga-rank-item" v-for="(item,index) in rank.slice(1)" :key="index">
                <span class="rank-number" :class="index<2?'on':''">{{index+2}}</span>
                <a href="/" target="_blank" class="other-link">
                  <p :title="item.title" class="title">{{item.title}}</p>
                  <p
                    :title="'更新至'+ (item.last_short_title.indexOf('话')!=-1 || item.last_short_title.indexOf('回')!=-1?item.last_short_title:(item.last_short_title+'话'))"
                    class="update"
                  >更新至{{item.last_short_title.indexOf('话')!=-1 || item.last_short_title.indexOf('回')!=-1?item.last_short_title:(item.last_short_title+'话')}}</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ggCard from "../GgCard.vue";
export default {
  data() {
    return {
      active: 0, //左侧漫画 tab
      active1: 0, //右侧排行榜 tab
      list: [], //显示的漫画列表
      comics: [], //漫画  人气推荐
      freecomics: [], //漫画  免费漫画推荐
      iscomics: false, //是否显示漫画
      rank: [], //右侧 排行榜
      isRank: false, //是否显示 月票排行榜
      sjNum: 0, //随机数
      gg: [], //广告内容
      isGG: false, //是否显示广告
    };
  },
  methods: {
    //获取广告
    getGG() {
      this.$http.get("/api/x/web-show/res/locs?pf=0&ids=44").then((res) => {
        this.gg = res.data.data[44];
        if (this.gg[0].url == "") {
          this.isGG = false;
        } else {
          this.isGG = true;
        }
      });
    },
    //获取 人气漫画
    getManga() {
      this.$http
        .post("/manga/twirp/comic.v1.Comic/GetRecommendComics", {
          page_num: 1,
          page_size: 12,
          type: 1,
        })
        .then((res) => {
          this.list = res.data.data.comics;
          this.comics = res.data.data.comics;
          this.iscomics = true;
        });
    },
    //换一换 漫画
    changeManga() {
      this.iscomics = false;
      if (this.active == 0) {
        this.getManga();
      } else {
        this.sjNum = Math.floor(Math.random() * 38);
        this.list = this.freecomics.slice(this.sjNum, this.sjNum + 12);
        this.iscomics = true;
      }
    },
    //左侧漫画切换
    switchTab(index) {
      this.active = index;
      if (index == 0) {
        this.list = this.comics;
      } else {
        this.list = this.freecomics.slice(this.sjNum, this.sjNum + 12);
      }
    },
    //右侧排行榜切换
    switchTab1(index) {
      this.active1 = index;
      this.isRank = false;
      if (index == 0) {
        this.getMonth();
      } else if (index == 1) {
        this.getYingyuan();
      } else {
        this.getHot();
      }
    },
    //获取 免费漫画
    getFreeMg() {
      this.$http
        .post("/manga/twirp/comic.v1.Comic/HomeHot", { type: 1 })
        .then((res) => {
          this.sjNum = Math.floor(Math.random() * 38);
          this.freecomics = res.data.data;
          this.iscomics = true;
        });
    },
    //获取 月票排行
    getMonth() {
      this.$http
        .post("/manga/twirp/comic.v1.Comic/HomeFans", {
          last_month_offset: 0,
          type: 1,
        })
        .then((res) => {
          this.rank = res.data.data.comics.slice(0, 14);
          this.isRank = true;
        });
    },
    //获取 应援排行
    getYingyuan() {
      this.$http
        .post("/manga/twirp/comic.v1.Comic/HomeFans", {
          last_month_offset: 0,
        })
        .then((res) => {
          this.rank = res.data.data.comics.slice(0, 14);
          this.isRank = true;
        });
    },
    //获取 飙升排行
    getHot() {
      this.$http
        .post("/manga/twirp/comic.v1.Comic/HomeHot", {
          type: 2,
        })
        .then((res) => {
          this.rank = res.data.data.slice(0, 14);
          this.isRank = true;
        });
    },
    handleScroll() {
      let el = document.getElementById("biliManga");
      let scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      let clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      if (scrollTop > el.offsetTop - clientHeight) {
        this.getGG();
        this.getManga();
        this.getMonth();
        this.getFreeMg();
        window.removeEventListener("scroll", this.handleScroll, true);
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  components: {
    ggCard,
  },
};
</script>

<style lang="less" scoped>
.manga-panel {
  .left-slot,
  .tab-switch {
    display: flex;
  }
  .tab-switch {
    margin-left: 4px;
    margin-top: 1px;
    .tab-switch-item {
      margin-right: 12px;
      height: 30px;
      font-size: 12px;
      line-height: 30px;
      cursor: pointer;
    }
    .on {
      border-bottom: 1px solid #00a1d6;
      color: #00a1d6;
    }
  }
  .app-download-link {
    position: relative;
    height: 30px;
    color: #505050;
    text-align: center;
    font-size: 12px;
    line-height: 32px;
    cursor: pointer;
    span {
      position: absolute;
      top: -10px;
      right: -54px;
      width: 72px;
      height: 20px;
      border-radius: 10px;
      background: #fa5a57;
      color: #fff;
      font-size: 12px;
      line-height: 19px;
      text-align: center;
    }
  }
  .manga-list-box {
    display: flex;
    align-content: space-between;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 1270px;
    height: 682px;
    .manga-card {
      width: 206px;
      margin-bottom: 24px;
      .manga-title {
        max-width: 206px;
        margin: 10px 0 8px;
        color: #212121;
        font-weight: 500;
        font-size: 14px;
        transition: 0.3s;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: left;
      }
      .manga-tag {
        color: #999;
        font-size: 12px;
        overflow: hidden;
        line-height: 16px;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .manga-card > img {
      display: block;
      width: 206px;
      height: 275px;
      background-repeat: no-repeat;
      background-position: 50%;
      border-radius: 2px;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABHCAMAAAB4UkqjAAAAh1BMVEUAAADd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d0UCIZXAAAALHRSTlMAoJDx4OYL/DcGF+6+JNi4ycSIT2k6LPeWfRzTVPXPszEQrV0hpo12cEZAZFpRNIQAAAJVSURBVFjD7dbZcpswGIbhHwwSi81q8Ib33fnu//oatRIpmliDhQ/aaZ+TKInnjVgkhb4RJMhP9Fzo8PiD+vEA+JPnqS0+1dRHBJhibAzh2HNeekxP9Z8XBSMZM6SmRBYx65QeM6XsY3rKPqanLGMWqeDmOh0b/Io9+YHi3gKtdExgLznSlyjFMGnUphIMlcgY22C4DSPBxTu4IrXDe+yI6IDWbPSqGVoHoohDyip6XZVB4hFN1TgPyUaYQ5rSWQ0nZGcC6UyJukKypa4yIXX3HLLlqCdHX++HLRfS/9bbWvvHLSLNR3N6tRXdFwdxejekiYF4fDnWYa/WqSm2PqRCSy0hrbP5RxAaW8141N17tVbZ+S1fFYbWFF2+1lqg62BoBdAsqWOLroWhxTh+M8vmWuuaxp1WaWjRSn43yl35sHTLUjxiaWlqnYE4LZoJme3v13MibqepFZRL6otV5V+/Hv+xVvi+FsvZG1qh/LQ7uFXnF/HlwcEfYlDktW2r5EARUiXWc1xRWAC8tGwxsdJ9dcRnYrddMdtrjDZyAy3kXrSJ7O89u8zEZAIKxBRnFzbonWD3ZkfCrrmzP+6979nicjAnW3NZ4OS1R6GtVBa8drTek539up3NAgMvcv51WNZQitCiFBZQaqIMSrx1XrWNoWTy/w1r+hk+xjuMSVjGGC6WZ3S1xlDriqTKxzB+Ra3I4bDHne62drqmied57QR9z0D94dHnOEmvJ/pWAMm4ovL2TTcJ5cRyMlHrbkdG5c/5r82fYqt+K/iR89m2JrP9PEZyI80PsPxVT0P3FAEAAAAASUVORK5CYII=);
    }
  }
}
.manga-rank {
  overflow: hidden;
  width: 320px;
  .tab-switch {
    display: flex;
    flex: 1;
    margin-left: 20px;
    .tab-switch-item {
      margin-right: 12px;
      height: 21px;
      font-size: 12px;
      line-height: 16px;
      cursor: pointer;
    }
    .on {
      border-bottom: 1px solid #00a1d6;
      color: #00a1d6;
    }
  }
  .manga-rank-wrap {
    display: flex;
    width: 100%;
  }
  .manga-rank-list {
    width: 320px;
    flex-shrink: 0;
  }
}
.manga-rank-item {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  padding: 9px 0;
  .preview {
    position: relative;
    width: 290px;
  }
  .rank-number {
    display: inline-block;
    flex-shrink: 0;
    margin-right: 12px;
    width: 18px;
    height: 18px;
    border-radius: 2px;
    background: #fff;
    color: #999;
    text-align: center;
    font-size: 14px;
    line-height: 18px;
    cursor: default;
  }
  .on {
    background: #00a1d6;
    color: #fff;
  }
  .other-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    line-height: 18px;
    .title {
      overflow: hidden;
      width: 198px;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
    }
    .update {
      overflow: hidden;
      min-width: 80px;
      height: 18px;
      color: #999;
      text-align: right;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 12px;
    }
  }
  .preview-link {
    display: flex;
    img {
      flex-shrink: 0;
      width: 112px;
      height: 149px;
      background-repeat: no-repeat;
      background-position: 50%;
      border-radius: 2px;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABHCAMAAAB4UkqjAAAAh1BMVEUAAADd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d0UCIZXAAAALHRSTlMAoJDx4OYL/DcGF+6+JNi4ycSIT2k6LPeWfRzTVPXPszEQrV0hpo12cEZAZFpRNIQAAAJVSURBVFjD7dbZcpswGIbhHwwSi81q8Ib33fnu//oatRIpmliDhQ/aaZ+TKInnjVgkhb4RJMhP9Fzo8PiD+vEA+JPnqS0+1dRHBJhibAzh2HNeekxP9Z8XBSMZM6SmRBYx65QeM6XsY3rKPqanLGMWqeDmOh0b/Io9+YHi3gKtdExgLznSlyjFMGnUphIMlcgY22C4DSPBxTu4IrXDe+yI6IDWbPSqGVoHoohDyip6XZVB4hFN1TgPyUaYQ5rSWQ0nZGcC6UyJukKypa4yIXX3HLLlqCdHX++HLRfS/9bbWvvHLSLNR3N6tRXdFwdxejekiYF4fDnWYa/WqSm2PqRCSy0hrbP5RxAaW8141N17tVbZ+S1fFYbWFF2+1lqg62BoBdAsqWOLroWhxTh+M8vmWuuaxp1WaWjRSn43yl35sHTLUjxiaWlqnYE4LZoJme3v13MibqepFZRL6otV5V+/Hv+xVvi+FsvZG1qh/LQ7uFXnF/HlwcEfYlDktW2r5EARUiXWc1xRWAC8tGwxsdJ9dcRnYrddMdtrjDZyAy3kXrSJ7O89u8zEZAIKxBRnFzbonWD3ZkfCrrmzP+6979nicjAnW3NZ4OS1R6GtVBa8drTek539up3NAgMvcv51WNZQitCiFBZQaqIMSrx1XrWNoWTy/w1r+hk+xjuMSVjGGC6WZ3S1xlDriqTKxzB+Ra3I4bDHne62drqmied57QR9z0D94dHnOEmvJ/pWAMm4ovL2TTcJ5cRyMlHrbkdG5c/5r82fYqt+K/iR89m2JrP9PEZyI80PsPxVT0P3FAEAAAAASUVORK5CYII=);
    }
    .preview-desc {
      margin-left: 12px;
      .title {
        font-weight: 500;
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        margin-bottom: 10px;
        text-overflow: ellipsis;
        font-size: 14px;
        line-height: 20px;
        -webkit-line-clamp: 2;
      }
      .style,
      .update {
        color: #999;
        line-height: 18px;
      }
    }
  }
}
a {
  &:hover {
    .manga-title {
      color: #00a1d6 !important;
    }
  }
}
</style>