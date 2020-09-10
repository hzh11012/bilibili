<template>
  <li class="upuser-item">
    <div class="up-face">
      <a href="/" target="_blank" :title="item.uname" class="face-img">
        <div class="lazy-img">
          <img alt :src="item.upic+'@180w_180h.webp'" />
        </div>
      </a>
      <i
        :title="item.official_verify.type==0?'个人认证':(item.official_verify.type==1?'企业/团体认证':'')"
        class="verify-icon"
        :class="item.official_verify.type==0?'icon-individual':(item.official_verify.type==1?'icon-official':'')"
      ></i>
    </div>
    <div class="info-wrap">
      <div class="headline">
        <a href="/" :title="item.uname" target="_blank" class="title">{{item.uname}}</a>
        <i class="lv" :class="'icon-lv'+item.level"></i>
        <a
          class="attention-btn followed"
          v-if="relation[item.mid]!=null && relation!=null"
          @mouseover.stop="mouseover($event)"
          @mouseleave.stop="mouseleave($event)"
        >已关注</a>
        <a class="attention-btn" v-else>+关注</a>
      </div>
      <div class="up-info clearfix">
        <span>稿件：{{item.videos | setNum}}</span>
        <span>粉丝：{{item.fans | setNum}}</span>
      </div>
      <div
        class="desc"
      >{{item.official_verify.type==127?(item.usign==''?'此用户没有个性签名啊啊啊':item.usign):item.official_verify.desc}}</div>
      <div class="up-videos clearfix">
        <div class="video-item" v-for="(item1,index) in item.res" :key="index">
          <a href="/" target="_blank" class="video-pic default-img-small">
            <div class="lazy-img">
              <img :src="item1.pic+'@160w_100h.webp'" alt />
            </div>
            <watch-later></watch-later>
          </a>
          <div class="video-info">
            <a href="/" target="_blank" class="video-desc">{{item1.title}}</a>
            <span class="ptime">{{item1.pubdate*1000 | formatDate}}</span>
          </div>
          <div class="video-pop">
            <div class="v-title">{{item1.title}}</div>
            <div class="v-info">
              <span class="name">{{item.uname}}</span>
              <span class="line"></span>
              <span class="time">{{item1.pubdate*1000 | formatDate}}</span>
            </div>
            <div class="v-preview clearfix">
              <div class="lazy-img">
                <img :src="item1.pic+'@160w_100h.webp'" alt />
              </div>
              <p class="txt">{{item1.desc}}</p>
            </div>
            <div class="v-data">
              <span class="play">
                <i class="icon"></i>
                {{item1.play | setNum}}
              </span>
              <span class="danmu">
                <i class="icon"></i>
                {{item1.dm | setNum}}
              </span>
              <span class="star">
                <i class="icon"></i>
                {{item1.fav | setNum}}
              </span>
              <span class="coin">
                <i class="icon"></i>
                {{item1.coin | setNum}}
              </span>
            </div>
          </div>
        </div>
        <a href="/" target="_blank" class="video-more" v-if="item.videos>3">全部{{item.videos}}个稿件></a>
      </div>
    </div>
  </li>
</template>

<script>
import { formatDate } from "../../assets/js/date.js";
import watchLater from "../Home/VideoCard/watchLater.vue";
export default {
  props: ["item", "relation"],
  methods: {
    mouseover(e) {
      e.target.innerText = "取消关注";
    },
    mouseleave(e) {
      e.target.innerText = "已关注";
    },
  },
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
.upuser-item {
  position: relative;
  padding: 20px 0 20px 102px;
  border-bottom: 1px solid #e5e9ef;
  z-index: 1;
  .up-face {
    position: absolute;
    width: 90px;
    height: 90px;
    left: 0;
    top: 20px;
    .face-img {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
    }
    .verify-icon {
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
  .headline {
    margin-bottom: 12px;
    .lv {
      margin-right: 12px;
    }
  }
  .title {
    display: inline-block;
    line-height: 21px;
    vertical-align: middle;
    font-size: 16px;
    color: #222;
    margin-right: 14px;
    font-weight: 700;
    &:hover {
      color: #00a1d6;
    }
  }
  .up-info {
    margin-bottom: 10px;
  }
  .up-info > span {
    float: left;
    margin-right: 15px;
    font-size: 12px;
    line-height: 12px;
    color: #6d757a;
  }
  .up-videos {
    position: relative;
    .video-item {
      float: left;
      position: relative;
      width: 138px;
      height: 50px;
      padding-left: 92px;
      margin-right: 30px;
      .video-desc {
        position: absolute;
        height: 36px;
        top: -3px;
        line-height: 18px;
        font-size: 12px;
        color: #222;
        overflow: hidden;
        &:hover {
          color: #00a1d6;
        }
      }
      .video-pic {
        position: absolute;
        top: 0;
        left: 0;
        width: 80px;
        height: 50px;
        border-radius: 4px;
        .lazy-img {
          background-size: contain;
        }
      }
      &:hover {
        .video-pop {
          display: block;
        }
      }
    }
    .video-info {
      position: relative;
      height: 100%;
    }
    .ptime {
      position: absolute;
      left: 0;
      bottom: 0;
      line-height: 12px;
      color: #99a2aa;
    }
    .video-more {
      position: absolute;
      right: 0;
      bottom: 0;
      line-height: 12px;
      &:hover {
        color: #f25d8e;
      }
    }
    .video-pop {
      display: none;
      position: absolute;
      top: -192px;
      left: 0;
      width: 320px;
      border: 1px solid #ccd0d7;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);
      box-sizing: border-box;
      z-index: 10020;
      overflow: hidden;
      background-color: #fff;
      padding: 12px;
    }
  }
  .desc {
    margin-bottom: 14px;
    width: 750px;
    font-size: 12px;
    color: #6d757a;
    line-height: 16px;
  }
  .attention-btn {
    width: 64px;
    height: 24px;
    text-align: center;
    background: #00a1d6;
    color: #fff;
    line-height: 24px;
    border-radius: 4px;
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
    &:hover {
      background: #00b5e5;
    }
  }
  .followed,
  .followed:hover {
    background: #e5e9ef;
    color: #6d757a;
  }
}
.video-item {
  box-sizing: content-box;
  z-index: 0;
}
.video-pop {
  .v-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 20px;
    line-height: 12px;
  }
  .v-info {
    color: #99a2aa;
    padding: 4px 0 6px;
    span {
      display: inline-block;
      vertical-align: top;
      height: 16px;
      line-height: 12px;
    }
    .name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 150px;
    }
    .line {
      display: inline-block;
      border-left: 1px solid #99a2aa;
      height: 12px;
      margin: 1px 10px 0;
    }
    .time {
      display: inline-block;
      vertical-align: top;
      height: 16px;
      line-height: 12px;
    }
  }
  .v-preview {
    box-sizing: content-box;
    padding: 8px 0 12px;
    border-top: 1px solid #e5e9ef;
    height: 64px;
    .lazy-img {
      width: auto;
      float: left;
      margin-right: 8px;
      margin-top: 4px;
      height: auto;
      border-radius: 4px;
      overflow: hidden;
      width: 96px;
      height: 60px;
    }
    .txt {
      margin-top: 4px;
      height: 60px;
      overflow: hidden;
      line-height: 21px;
      word-wrap: break-word;
      word-break: break-all;
      color: #99a2aa;
    }
  }
  .v-data {
    border-top: 1px solid #e5e9ef;
    padding-top: 10px;
    span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: inline-block;
      width: 70px;
      color: #99a2aa;
      line-height: 12px;
      .icon {
        margin-right: 4px;
        vertical-align: top;
        display: inline-block;
        width: 12px;
        height: 12px;
      }
    }
    .play .icon {
      background-position: -282px -90px;
    }
    .danmu .icon {
      background-position: -282px -218px;
    }
    .star .icon {
      background-position: -282px -346px;
    }
    .coin .icon {
      background-position: -282px -410px;
    }
  }
  .icon {
    background-image: url(//static.hdslb.com/images/base/icons.png);
  }
}
.icon-individual,
.icon-official {
  background-image: url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/sprite-690be8a6ea.png);
  width: 20px;
  height: 20px;
}
.icon-individual {
  background-position: -198px -277px;
}
.icon-official {
  background-position: -148px -277px;
}
i {
  display: inline-block;
}
.lv {
  background-image: url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/sprite-690be8a6ea.png);
  width: 28px;
  height: 16px;
  display: inline-block;
  line-height: 16px;
  vertical-align: middle;
}
//等级0图标
.icon-lv0 {
  background-position: -148px -231px;
}
//等级1图标
.icon-lv1 {
  background-position: -148px -185px;
}
//等级2图标
.icon-lv2 {
  background-position: -148px -139px;
}
//等级3图标
.icon-lv3 {
  background-position: -365px -438px;
}
//等级4图标
.icon-lv4 {
  background-position: -319px -536px;
}
//等级5图标
.icon-lv5 {
  background-position: -261px -536px;
}
//等级6图标
.icon-lv6 {
  background-position: -377px -490px;
}

//稍后再看
.video-pic {
  /deep/ .black {
    width: 20px;
    height: 20px;
    right: 5px;
    bottom: 5px;
  }
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
</style>