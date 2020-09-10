<template>
  <li class="video-item" :class="type=='matrix'?'matrix':'list'">
    <a :href="'#/video?id='+item.bvid" :title="item.title | deleteHtml" target="_blank" class="img-anchor">
      <div class="img">
        <div class="lazy-img">
          <img :src="item.pic+'@320w_200h.webp'" alt />
        </div>
        <span class="so-imgTah-rb">{{item.duration | setTime1}}</span>
        <watch-later></watch-later>
        <span class="mask-video"></span>
      </div>
    </a>
    <div class="info">
      <div class="headline clearfix">
        <span class="type hide">{{item.typename}}</span>
        <a :href="'#/video?id='+item.bvid" :title="item.description" target="_blank" class="title" v-html="item.title"></a>
      </div>
      <div class="des hide">{{item.description}}</div>
      <div class="tags">
        <span title="观看" class="so-icon watch-num">
          <i class="icon-playtime"></i>
          {{item.play | setNum}}
        </span>
        <span title="弹幕" class="so-icon hide">
          <i class="icon-subtitle"></i>
          {{item.video_review | setNum}}
        </span>
        <span title="上传时间" class="so-icon time">
          <i class="icon-date"></i>
          {{item.pubdate*1000 | formatDate}}
        </span>
        <span title="up主" class="so-icon">
          <i class="icon-uper"></i>
          <a href="/" target="_blank" class="up-name">{{item.author}}</a>
        </span>
      </div>
    </div>
  </li>
</template>

<script>
import { formatDate } from "../../assets/js/date.js";
import watchLater from "../Home/VideoCard/watchLater.vue";
export default {
  props: ["item", "type"],
  components: {
    watchLater,
  },
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
.video-item {
  box-sizing: content-box;
  z-index: 0;
  .so-imgTah-rb {
    position: absolute;
    right: 0;
    bottom: 0;
    line-height: 18px;
    padding: 0 5px;
    color: #fff;
    background-color: #333;
    background-color: rgba(0, 0, 0, 0.5);
    border-top-left-radius: 4px;
  }
  .so-icon.watch-num {
    white-space: nowrap;
  }
  .so-icon {
    .up-name {
      display: inline-block;
      max-width: 132px;
      height: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:hover {
        color: #00a1d6;
      }
    }
  }
  .so-icon > a {
    color: #99a2aa;
    cursor: pointer;
  }
}
.img-anchor {
  &:hover {
    /deep/ .watch-later-video {
      transition-delay: 0.3s;
      opacity: 1;
    }
    .so-imgTah-rb {
      display: none;
    }
    .mask-video {
      opacity: 1 !important;
    }
  }
}
.video-item.matrix {
  position: relative;
  height: 208px;
  width: 168px;
  border: 1px solid #e5e9ef;
  border-radius: 4px;
  .img {
    height: 100px;
    position: relative;
    .mask-video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .mask-video {
      opacity: 0;
      background: rgba(0, 0, 0, 0.2);
      transition: opacity 0.3s;
      pointer-events: none;
    }
  }
  .info {
    padding: 8px 10px 0;
    .so-icon {
      margin-right: 8px;
      margin-bottom: 12px;
      float: left;
    }
    .so-icon.watch-num {
      width: 41px;
      overflow: inherit;
    }
    .time {
      margin-right: 0;
      width: 67px;
    }
  }
  .headline {
    margin-bottom: 12px;
    height: 40px;
    overflow: hidden;
  }
  .hide {
    display: none;
  }
  .title {
    font-size: 12px;
    line-height: 20px;
    color: #222;
    &:hover {
      color: #00a1d6;
    }
  }
}
.video-item.list {
  position: relative;
  height: 100px;
  width: 808px;
  padding: 20px 0 20px 172px;
  border-bottom: 1px solid #e5e9ef;
  .img {
    position: absolute;
    left: 0;
    top: 20px;
    height: 100px;
    width: 160px;
    .mask-video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .mask-video {
      opacity: 0;
      background: rgba(0, 0, 0, 0.2);
      transition: opacity 0.3s;
      pointer-events: none;
    }
  }
  .headline {
    height: 24px;
    font-size: 0;
    line-height: 23px;
  }
  .type {
    float: left;
    border-radius: 12px;
    padding: 0 10px;
    border: 1px solid #e5e9ef;
    color: #6d757a;
    text-align: center;
    margin-right: 10px;
    font-size: 12px;
    display: block;
  }
  .title {
    margin-right: 6px;
    font-size: 16px;
    color: #222;
    max-width: 592px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    float: left;
  }
  .des {
    margin-top: 14px;
    width: 762px;
    max-height: 36px;
    overflow: hidden;
    color: #99a2aa;
    line-height: 18px;
    display: block;
  }
  .tags {
    position: absolute;
    bottom: 20px;
    left: 172px;
  }
  .so-icon {
    margin-right: 20px;
  }
}
.hide {
  display: none;
}
.so-icon {
  box-sizing: content-box;
  i {
    position: absolute;
    left: 0;
    top: 0;
    background-image: url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/sprite-690be8a6ea.png);
    width: 11px;
    height: 11px;
  }
  .icon-playtime {
    background-position: -485px -543px;
  }
  .icon-subtitle {
    background-image: url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/sprite-690be8a6ea.png);
    background-position: -442px -124px;
    width: 11px;
    height: 11px;
  }
  .icon-date {
    background-position: -442px -165px;
  }
  .icon-uper {
    background-position: -442px -83px;
  }
}

i {
  display: inline-block;
}
/deep/ .keyword {
  color: #f25d8e;
  font-style: normal;
  font-weight: 400;
}
</style>