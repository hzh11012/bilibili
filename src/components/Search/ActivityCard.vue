<template>
  <li v-if="item.id!=0" class="activity-item">
    <a href="/" target="_blank" class="cover-img" :title="item.title">
      <div class="lazy-img">
        <img :src="item.cover+'@520w_300h.webp'" alt />
      </div>
    </a>
    <div class="info">
      <div class="headline cardhead">
        <span class="type">活动</span>
        <a :title="item.title" href="/" target="_blank" class="title">{{item.title}}</a>
      </div>
      <p class="desc">{{item.desc}}</p>
    </div>
  </li>
</template>

<script>
export default {
  props: ["item"],
};
</script>

<style lang="less" scoped>
.activity-item {
  box-sizing: content-box;
  height: 150px;
  padding: 20px 0;
  width: inherit;
  position: relative;
  border-bottom: 1px solid #e5e9ef;
  .cover-img {
    display: block;
    float: left;
    width: 260px;
    height: 150px;
    margin-right: 20px;
  }
  .info {
    overflow: hidden;
    .type {
      vertical-align: top;
      display: inline-block;
      line-height: 23px;
      border-radius: 12px;
      padding: 0 10px;
      border: 1px solid #e5e9ef;
      color: #6d757a;
      text-align: center;
      margin-right: 10px;
      font-size: 12px;
    }
    .title {
      font-size: 20px;
      color: #212121;
      display: inline-block;
      line-height: 24px;
      &:hover {
        color: #00a1d6;
      }
    }
  }
  .desc {
    font-size: 13px;
    color: #999;
    margin-top: 20px;
  }
}
</style>