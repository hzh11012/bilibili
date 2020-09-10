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
            <a :href="'#/video?id='+list[0].bvid" target="_blank" class="link">
              <img :src="list[0].pic+'@112w_63h_1c_100q.webp'" :alt="list[0].title" />
            </a>
            <watch-later></watch-later>
          </div>
          <div class="txt">
            <a :href="'#/video?id='+list[0].bvid" target="_blank" class="link">
              <p :title="list[0].title">{{list[0].title}}</p>
            </a>
            <span>综合得分：{{list[0].pts | setNum}}</span>
          </div>
        </div>
        <div class="popover-video-card pvc">
          <div class="content">
            <img :src="list[0].pic+'@112w_63h_1c_100q.webp'" />
            <div class="info">
              <p class="f-title">{{list[0].title}}</p>
              <p class="subtitle">
                <span class="name">{{list[0].author}}</span>
                <span class="point">·</span>
                <span class="time">{{list[0].create.slice(0,10)}}</span>
              </p>
            </div>
          </div>
          <div class="count">
            <ul>
              <li>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-bofangshu" />
                </svg>
                <span>{{list[0].play | setNum}}</span>
              </li>
              <li>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-danmushu" />
                </svg>
                <span>{{list[0].video_review | setNum}}</span>
              </li>
              <li>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-shoucangshu" />
                </svg>
                <span>{{list[0].favorites | setNum}}</span>
              </li>
              <li>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-yingbi" />
                </svg>
                <span>{{list[0].coins | setNum}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="rank-wrap" v-for="(item,index) in list.slice(1,10)" :key="index">
        <span class="number" :class="index<2?'on':''">{{index+2}}</span>
        <a :href="'#/video?id='+item.bvid" target="_blank" class="link">
          <p class="title" :title="item.title">{{item.title}}</p>
        </a>
        <div class="popover-video-card pvc">
          <div class="content">
            <img :src="item.pic+'@112w_63h_1c_100q.webp'" />
            <div class="info">
              <p class="f-title">{{item.title}}</p>
              <p class="subtitle">
                <span class="name">{{item.author}}</span>
                <span class="point">·</span>
                <span class="time">{{item.create.slice(0,10)}}</span>
              </p>
            </div>
          </div>
          <div class="count">
            <ul>
              <li>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-bofangshu" />
                </svg>
                <span>{{item.play | setNum}}</span>
              </li>
              <li>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-danmushu" />
                </svg>
                <span>{{item.video_review | setNum}}</span>
              </li>
              <li>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-shoucangshu" />
                </svg>
                <span>{{item.favorites | setNum}}</span>
              </li>
              <li>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-yingbi" />
                </svg>
                <span>{{item.coins | setNum}}</span>
              </li>
            </ul>
          </div>
        </div>
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
      &:hover {
        /deep/ .watch-later-video {
          transition-delay: 0.2s;
          opacity: 1;
        }
      }
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
  .pvc {
    top: -138px;
    z-index: 200;
  }
  &:hover {
    .popover-video-card {
      display: block;
    }
  }
  &:last-child {
    margin-bottom: 0;
  }
}
.popover-video-card {
  position: absolute;
  padding: 12px;
  width: 320px;
  background: #fff;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  display: none;
  .content {
    display: flex;
    img {
      width: 112px;
      height: 63px;
      border-radius: 2px;
    }
    .info {
      padding-left: 10px;
      .f-title {
        word-break: break-all;
        max-height: 40px;
        color: #212121;
        font-size: 14px;
        font-weight: 700;
        line-height: 20px;
        margin-bottom: 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .subtitle {
        display: flex;
        color: #999;
        font-size: 12px;
        line-height: 16px;
        span {
          display: inline-block;
        }
        .name {
          max-width: 86px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .point {
          margin: 0 5px;
        }
        .time {
          max-width: 72px;
          white-space: nowrap;
          overflow: hidden;
        }
      }
    }
  }
  .count {
    padding-top: 12px;
    margin-top: 12px;
    border-top: 1px solid #e7e7e7;
    ul {
      display: flex;
      justify-content: space-between;
      li {
        font-size: 12px;
        color: #999;
        display: flex;
        align-items: center;
        .icon {
          color: #999;
          font-size: 16px;
          margin-right: 3px;
        }
      }
    }
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