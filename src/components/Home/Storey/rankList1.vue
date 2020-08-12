<template>
  <div class="rank-list">
    <header class="rank-header">
      <span class="name">排行榜</span>
      <a href="/" target="_blank" class="more">
        更多
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiala" />
        </svg>
      </a>
    </header>
    <div v-if="isShow">
      <div class="rank-wrap">
        <span class="number on">1</span>
        <div class="preview">
          <div class="pic">
            <a href="/" target="_blank" class="link">
              <img :src="list[0].image_urls[0]+'@112w_63h_1c_100q.webp'" :alt="list[0].title" />
            </a>
          </div>
          <div class="txt">
            <a href="/" target="_blank" class="link">
              <p :title="list[0].title">{{list[0].title}}</p>
            </a>
            <span>综合得分：{{list[0].score | setNum}}</span>
          </div>
        </div>
      </div>
      <div class="rank-wrap" v-for="(item,index) in list.slice(1,10)" :key="index">
        <span class="number" :class="index<2?'on':''">{{index+2}}</span>
        <a href="/" target="_blank" class="link">
          <p class="title" :title="item.title">{{item.title}}</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import watchLater from "../VideoCard/watchLater.vue";
export default {
  props: ["list", "isShow"],
  components: {
    watchLater,
  },
};
</script>

<style lang="less" scoped>
.rank-list {
  width: 320px;
}
.rank-wrap {
  display: flex;
  justify-content: space-between;
  margin-bottom: 18px;
  position: relative;
  .number {
    font-size: 14px;
    color: #999;
    width: 18px;
    height: 18px;
    text-align: center;
    line-height: 18px;
    background: #fff;
    border-radius: 2px;
    display: inline-block;
  }
  .on {
    color: #fff;
    background: #00a1d6;
  }
  .preview {
    position: relative;
    width: 290px;
    display: flex;
    font-weight: 500;
    .txt {
      margin-left: 12px;
      p {
        font-size: 14px;
        height: 40px;
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        margin-bottom: 5px;
      }
      span {
        color: #999;
        white-space: nowrap;
      }
    }
    .link {
      display: inline-block;
    }
    .pic {
      position: relative;
    }
    img {
      width: 112px;
      height: 63px;
      border-radius: 2px;
    }
  }
  .title {
    width: 290px;
    font-size: 14px;
    line-height: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 500;
  }
  &:last-child {
    margin-bottom: 0;
  }
}
@media screen and (max-width: 1438px) {
  .rank-list {
    width: 265px;
    .preview,
    .title {
      width: 235px;
    }
    .rank-wrap {
      &:nth-child(n + 9) {
        display: none;
      }
    }
  }
}
</style>