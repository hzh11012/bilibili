<template>
  <li class="bangumi-item">
    <div class="bangumi-item-wrap">
      <a href="/" :title="item.title | deleteHtml" target="_blank" class="left-img">
        <div class="lazy-img">
          <img :src="item.cover+'@180w_240h.webp'" />
        </div>
        <div
          v-if="item.angle_title!=''"
          class="bangumi-tag"
          :style="item.angle_color==0?'background-color: rgb(251, 114, 153);color: rgb(255, 255, 255);':'background-color: rgb(250, 171, 75); color: rgb(255, 255, 255);'"
        >{{item.angle_title}}</div>
      </a>
      <div class="right-info">
        <div class="headline">
          <span class="bangumi-label">{{item.season_type | bangumiType}}</span>
          <a
            href="/"
            :title="item.title | deleteHtml"
            class="title"
            target="_blank"
            v-html="item.title"
          ></a>
        </div>
        <div class="intros">
          <div class="line clearfix">
            <div class="left-block">
              <span class="label">风格：</span>
              <span class="value">{{item.styles}}</span>
            </div>
            <div class="right-block">
              <span class="label">地区：</span>
              <span class="value">{{item.areas}}</span>
            </div>
          </div>
          <div class="line clearfix">
            <div class="left-block">
              <span class="label">{{item.media_type!=2?'开播时间：':'上映时间：'}}</span>
              <span class="value" v-if="item.fix_pubtime_str==''">{{item.pubtime*1000 | formatDate}}</span>
              <span class="value" v-else>{{item.fix_pubtime_str}}</span>
            </div>
            <div class="right-block" v-if="item.cv!=''">
              <span class="label">{{item.media_type!=2?'声优：':'出演：'}}</span>
              <span :title="item.cv" class="value">{{item.cv}}</span>
            </div>
          </div>
          <div class="desc">简介：{{item.desc}}</div>
        </div>
        <div id="pgc-navigate-wrap" :class="item.selection_style">
          <ul class="ep-box clearfix grid" v-if="item.selection_style=='grid' && item.ep_size!=0">
            <div v-if="item.ep_size <= 13 && item.ep_size !=0 ">
              <li class="ep-sub" v-for="(item) in item.eps" :key="item.id">
                <a href="/" target="_blank">
                  <div :title="item.index_title+' '+item.long_title" class="ep-item">{{item.title}}</div>
                </a>
              </li>
            </div>
            <div v-if="item.ep_size > 13">
              <li class="ep-sub" v-for="(item) in item.eps.slice(0,9)" :key="item.id">
                <a href="/" target="_blank">
                  <div :title="item.index_title+' '+item.long_title" class="ep-item">{{item.title}}</div>
                </a>
              </li>
              <li class="ep-sub">
                <div class="ep-item">...</div>
              </li>
              <li class="ep-sub" v-for="(item) in item.eps.slice(item.ep_size-3)" :key="item.id">
                <a href="/" target="_blank">
                  <div :title="item.index_title+' '+item.long_title" class="ep-item">{{item.title}}</div>
                </a>
              </li>
            </div>
          </ul>
          <ul
            class="ep-box clearfix horizontal"
            v-if="item.selection_style=='horizontal' && item.ep_size!=0"
          >
            <div v-if="item.ep_size <= 4 && item.ep_size !=0 ">
              <li class="ep-sub" v-for="(item) in item.eps" :key="item.id">
                <a href="/" target="_blank">
                  <div :title="item.index_title+' '+item.long_title" class="ep-item">
                    <div class="badges" v-if="item.badges != ''">
                      <span
                        :style="'background-color:'+item.badges[0].bg_color+';color:'+item.badges[0].text_color"
                      >{{item.badges[0].text}}</span>
                    </div>
                    <div class="name" v-html="item.title"></div>
                  </div>
                </a>
              </li>
            </div>
            <div v-if="item.ep_size > 4">
              <li class="ep-sub" v-for="(item) in item.eps.slice(0,3)" :key="item.id">
                <a href="/" target="_blank">
                  <div :title="item.index_title+' '+item.long_title" class="ep-item">
                    <div class="badges" v-if="item.badges != ''">
                      <span
                        :style="'background-color:'+item.badges[0].bg_color+';color:'+item.badges[0].text_color"
                      >{{item.badges[0].text}}</span>
                    </div>
                    <div class="name" v-html="item.title"></div>
                  </div>
                </a>
              </li>
              <li class="ep-sub">
                <div class="ep-item ep-toggle">查看全部{{item.ep_size}}个视频 ></div>
              </li>
            </div>
          </ul>
          <a href="/" target="_blank" v-if="item.ep_size==0">
            <div class="play-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                class="play-btn-svg"
              >
                <path
                  d="M12.7005118,6.45096054 C14.1229144,7.30642257 14.121066,8.69451224 12.7005118,9.54886258 L4.57548779,14.4354182 C3.15308516,15.2908802 2,14.6503349 2,12.9807384 L2,3.01908474 C2,1.36022525 3.15493359,0.710054608 4.57548779,1.56440495 L12.7005118,6.45096054 Z"
                />
              </svg>
              {{item.button_text}}
            </div>
          </a>
        </div>
        <div class="score" v-if="item.media_score != null">
          <div class="score-num">
            {{item.media_score.score}}
            <span class="fen">分</span>
          </div>
          <div class="user-count">{{item.media_score.user_count}}人点评</div>
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
    bangumiType(id) {
      switch (id) {
        case 1:
          return "番剧";
          break;
        case 2:
          return "电影";
          break;
        case 3:
          return "纪录片";
          break;
        case 4:
          return "国创";
          break;
        case 5:
          return "电视剧";
          break;
        case 7:
          return "综艺";
          break;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.bangumi-item {
  position: relative;
  border-bottom: 1px solid #e5e9ef;
  height: auto;
  min-height: 214px;
  margin-top: 20px;
  .left-img {
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    display: block;
    width: 160px;
    height: 214px;
    margin-right: 20px;
    float: left;
    .img {
      width: 100%;
      min-height: 100%;
    }
    .bangumi-tag {
      border-radius: 0 4px 0 4px;
      width: 60px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      position: absolute;
      right: 0;
      top: 0;
    }
    &:hover::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      background-image: url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/logoplay.png);
      background-repeat: no-repeat;
      background-size: 38%;
      background-position: 55px 73px;
    }
  }
  .right-info {
    position: relative;
    overflow: hidden;
    min-height: 214px;
    .headline {
      height: 24px;
      margin-bottom: 15px;
      font-size: medium;
      .bangumi-label {
        box-sizing: content-box;
        display: inline-block;
        height: 22px;
        padding: 0 10px;
        border: 1px solid #979797;
        color: #979797;
        text-align: center;
        line-height: 24px;
        border-radius: 100px;
        margin-right: 12px;
        font-size: 12px;
        vertical-align: middle;
      }
      .title {
        display: inline-block;
        height: 24px;
        max-width: 600px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: middle;
        margin-right: 6px;
        font-weight: 700;
        line-height: 24px;
        font-size: 16px;
        color: #222;
      }
    }
    .intros {
      font-size: 12px;
      margin-bottom: 21px;
      .line {
        margin-bottom: 4px;
      }
      .desc {
        height: 40px;
        line-height: 20px;
        color: #99a2aa;
        margin-top: -2px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .left-block {
        width: 244px;
        float: left;
      }
      .right-block {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 476px;
      }
      .label {
        line-height: 16px;
        color: #99a2aa;
      }
      .value {
        line-height: 16px;
        color: #222;
      }
    }
    .score {
      position: absolute;
      right: 0;
      top: -8px;
      height: auto;
      width: 100px;
      .score-num {
        color: #ffa726;
        font-size: 20px;
        position: absolute;
        text-align: right;
        top: 8px;
        right: 0;
        .fen {
          font-size: 14px;
        }
      }
      .user-count {
        position: absolute;
        top: 34px;
        text-align: right;
        font-size: 14px;
        right: 0;
      }
    }
  }
}
.bangumi-item-wrap {
  margin-bottom: 30px;
}
#pgc-navigate-wrap.grid {
  padding-top: 26px;
}
#pgc-navigate-wrap.horizontal {
  .ep-sub:nth-child(odd) {
    padding-right: 3px;
  }
  .ep-sub:nth-child(2n) {
    padding-left: 3px;
  }
  .ep-sub {
    width: 50%;
    box-sizing: border-box;
    margin-top: 6px;
    .ep-item {
      width: 100%;
      padding: 0 10px;
      box-sizing: border-box;
    }
  }
  .play-btn {
    margin-top: 42px;
  }
}
#pgc-navigate-wrap {
  .ep-box.grid {
    padding-top: 10px;
    .ep-sub {
      margin-left: 6px;
      margin-top: 6px;
      &:nth-child(13n + 1) {
        margin-left: 0;
      }
      .ep-item {
        box-sizing: content-box;
        width: 54px;
        text-align: center;
      }
    }
  }
  .ep-box {
    .ep-sub {
      float: left;
      cursor: pointer;
      font-size: 0;
      &:first-child {
        margin-left: 0;
      }
      .ep-item {
        display: inline-block;
        height: 32px;
        border-radius: 4px;
        border: 1px solid #e5e9ef;
        line-height: 32px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 12px;
        color: #6c7579;
        &:hover {
          background-color: #00a1d6;
          color: #fff;
        }
        .badges {
          float: right;
          max-width: 50%;
          white-space: normal;
          text-align: right;
          span {
            display: inline-block;
            font-size: 12px;
            height: 16px;
            line-height: 16px;
            padding: 0 2px;
            border-radius: 2px;
            margin-left: 3px;
          }
        }
        .name {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          font-weight: 400;
          /deep/ .keyword {
            font-weight: 400;
          }
        }
      }
      .ep-toggle {
        text-align: center;
      }
    }
  }
  .play-btn {
    margin-top: 16px;
    float: left;
    width: 110px;
    height: 32px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    line-height: 32px;
    text-align: center;
    color: #00a1d6;
    border: 1px solid #00a1d6;
    .play-btn-svg {
      display: inline-block;
      width: 16px;
      height: 16px;
      fill: #00a1d6;
      top: 2px;
      position: relative;
    }
    &:hover {
      color: #fff;
      background-color: #00a1d6;
      border: 1px solid #00a1d6;
      .play-btn-svg {
        fill: #fff;
      }
    }
  }
}

/deep/ .keyword {
  color: #f25d8e;
  font-style: normal;
  font-weight: 700;
}
</style>