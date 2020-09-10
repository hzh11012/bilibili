<template>
  <li class="photo-item">
    <a href="/" target="_blank" :title="item.title | deleteHtml">
      <div class="img">
        <img :src="item.cover+'@336w_336h_1e_1c.jpg'" alt />
        <span class="so-imgTag_rb" v-if="item.count>1">{{item.count}}P</span>
      </div>
    </a>
    <div class="info">
      <div class="headline clearfix">
        <a
          href="/"
          target="_blank"
          :title="item.title | deleteHtml"
          class="title"
          v-html="item.title"
        ></a>
      </div>
      <div class="tags">
        <div title="up主" class="so-icon up">
          <i class="icon-uper"></i>
          <a href="/" target="_blank" class="up-name" v-html="item.uname"></a>
        </div>
        <div title="浏览count" class="so-icon watch-num">
          <i class="icon-view"></i>
          {{item.view | setNum}}
        </div>
        <div title="收藏count" class="so-icon fav">
          <i class="icon-fav"></i>
          {{item.like | setNum}}
        </div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: ["item"],
  filters: {
    //去除返回数据中的html标签
    deleteHtml(title) {
      var t = title.replace(/<[^>]*>/g, "");
      return t;
    },
  },
};
</script>

<style lang="less" scoped>
.photo-item {
  box-sizing: content-box;
  height: 256px;
  width: 168px;
  border: 1px solid #e5e9ef;
  border-radius: 4px;
  .img {
    height: 168px;
    border-radius: 4px 4px 0 0;
    position: relative;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .so-imgTag_rb {
    position: absolute;
    right: 0;
    bottom: 0;
    line-height: 18px;
    padding: 0 5px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 4px 0 0 0;
  }
  .info {
    padding: 9px 10px 0;
  }
  .headline {
    margin-bottom: 12px;
    height: 16px;
  }
  .title {
    font-size: 12px;
    color: #222;
    width: 150px;
    line-height: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
    &:hover {
      color: #00a1d6;
    }
  }
  .so-icon {
    line-height: 16px;
    padding-left: 18px;
    margin-right: 8px;
  }
  .so-icon > a {
    color: #99a2aa;
    cursor: pointer;
  }
  .so-icon.up {
    display: block;
    max-width: 132px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 8px;
    padding-left: 20px;
    height: auto;
    .icon-uper {
      top: 2px;
      left: 3px;
    }
    &:hover {
      a {
        color: #00a1d6;
      }
    }
  }
  .so-icon.watch-num {
    white-space: nowrap;
    margin-bottom: 0;
    width: 41px;
    overflow: inherit;
    padding-left: 20px;
    .icon-view {
      margin-right: 3px;
    }
  }
  .so-icon.fav {
    .icon-fav {
      top: 2px;
      margin-right: 3px;
    }
  }
}
.so-icon {
  i {
    position: absolute;
    left: 0;
    top: 0;
    background-image: url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/sprite-690be8a6ea.png);
    width: 11px;
    height: 11px;
  }
  i.icon-uper {
    background-position: -442px -83px;
  }
  i.icon-view {
    background-position: -30px -30px;
    background-image: url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/article.png);
    width: 16px;
    height: 16px;
  }
  i.icon-fav {
    background-position: -442px -42px;
  }
}
i {
  display: inline-block;
}
/deep/ .keyword {
  color: #f25d8e;
  font-style: normal;
}
</style>