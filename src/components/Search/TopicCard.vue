<template>
  <li class="topic-item clearfix">
    <a href="/" :title="item.title | deleteHtml" target="_blank" class="poster">
      <div class="lazy-img">
        <img alt :src="item.cover" />
      </div>
    </a>
    <div class="content">
      <div class="headline oneline">
        <a href="/" :title="item.title | deleteHtml" target="_blank" v-html="item.title"></a>
      </div>
      <p class="desc twoline" v-html="item.description!=''?item.description:'暂无简介'"></p>
      <div class="detail">
        <div title="创建时间" class="so-icon">
          <i class="icon-date"></i>
          <span v-if="item.pubdate!=0">{{item.pubdate*1000 | formatDate}}</span>
          <span v-else>暂无时间</span>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import { formatDate } from "../../assets/js/date.js";
export default {
  props: ["item"],
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    },
    //去除返回数据中的html标签
    deleteHtml(title) {
      var t = title.replace(/<[^>]*>/g, "");
      return t;
    },
  },
};
</script>

<style lang="less" scoped>
.topic-item {
  position: relative;
  padding: 20px 0;
  border-bottom: 1px solid #e5e9ef;
  .poster {
    display: block;
    height: 120px;
    width: 90px;
    float: left;
    margin-right: 12px;
  }
  .content {
    overflow: hidden;
    height: 120px;
    .headline {
      display: inline-block;
      height: 24px;
      vertical-align: middle;
      max-width: 600px;
      margin-bottom: 14px;
      a {
        color: #222;
        font-weight: 700;
        line-height: 24px;
        font-size: 16px;
      }
    }
    .desc {
      width: 762px;
      height: 36px;
      color: #99a2aa;
      font-size: 12px;
      line-height: 18px;
      margin-bottom: 7px;
    }
    .detail {
      position: absolute;
      left: 102px;
      bottom: 18px;
    }
  }
}
.so-icon {
  i {
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    background-image: url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/sprite-690be8a6ea.png);
    width: 11px;
    height: 11px;
  }
  .icon-date {
    background-position: -442px -165px;
  }
}
/deep/ .keyword {
  color: #f25d8e;
  font-style: normal;
}
</style>