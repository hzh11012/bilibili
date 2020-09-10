<template>
  <li class="article-item">
    <a href="/" :title="item.title | deleteHtml" target="_blank" class="poster">
      <img :src="item.image_urls[0]+'@234w_176h.webp'" alt />
    </a>
    <div class="content">
      <div class="headline">
        <a
          href="/"
          :title="item.title | deleteHtml"
          target="_blank"
          class="title"
          v-html="item.title"
        ></a>
      </div>
      <p class="desc oneline">{{item.desc}}</p>
      <div class="tags">
        <span title="up主" class="so-icon up">
          <a href="/" target="_blank">
            <img :src="up[item.id].author.face+'@96w_96h.webp'" class="up-pic" />
          </a>
          <a href="/" target="_blank" class="up-name oneline">{{up[item.id].author.name}}</a>
        </span>
        <span :title="item.category_name" class="so-icon article-type">
          <a href="/" target="_blank">{{item.category_name}}</a>
        </span>
        <span title="阅读" class="so-icon">
          <i class="icon-view"></i>
          {{item.view | setNum}}
        </span>
        <span title="喜欢" class="so-icon">
          <i class="icon-like"></i>
          {{item.like | setNum}}
        </span>
        <span title="评论" class="so-icon">
          <i class="icon-reply"></i>
          {{item.reply | setNum}}
        </span>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: ["item", "up"],
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
.article-item {
  box-sizing: content-box;
  position: relative;
  border-bottom: 1px solid #e5e9ef;
  padding: 20px 0;
  height: 90px;
  .poster {
    width: 117px;
    height: 88px;
    margin-left: 21px;
    border-radius: 4px;
    overflow: hidden;
    float: right;
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .content {
    overflow: hidden;
    .title {
      line-height: 18px;
      color: #222;
      font-size: 18px;
      &:hover {
        color: #00a1d6;
      }
    }
    .so-icon {
      padding-left: 23px;
      height: 16px;
      line-height: 16px;
      margin-right: 25px;
      a {
        color: #99a2aa;
        cursor: pointer;
      }
    }
    .up {
      padding-left: 29px;
      line-height: 17px;
    }
  }
  .desc {
    max-height: 18px;
    margin-top: 15px;
    color: #99a2aa;
    font-size: 12px;
    line-height: 18px;
  }
  .tags {
    position: absolute;
    bottom: 20px;
    left: 0;
    .up-name {
      display: inline-block;
      max-width: 132px;
      height: 16px;
      color: #99a2aa;
      cursor: pointer;
      &:hover {
        color: #00a1d6;
      }
    }
    .up-pic {
      width: 24px;
      height: 24px;
      position: absolute;
      left: 0;
      top: -4px;
      border-radius: 100%;
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
  .icon-view {
    background-position: -30px -30px;
  }
  .icon-like {
    background-position: -75px -30px;
  }
  .icon-view,
  .icon-like {
    background-image: url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/article.png);
    width: 16px;
    height: 16px;
  }
  .icon-reply {
    background-image: url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/article.png);
    width: 16px;
    height: 16px;
    background-position: -123px -30px;
  }
}
i {
  display: inline-block;
}
img {
  border: none;
  vertical-align: middle;
}

/deep/ .keyword {
  color: #f25d8e;
  font-weight: 400;
  font-style: normal;
}
</style>