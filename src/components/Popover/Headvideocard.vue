<template>
  <a href="/" target="_blank" class="header-video-card">
    <div class="video-preview" :class="isCollect?'multiple-preview':''">
      <!---->
      <!---->
      <div class="video-card-img">
        <img
          v-if="cardType==2"
          :src="img!=''?img+'@100w_57h_1c_100q.webp':'//ftp.qnets.cn/bilibili/videoBg1.png'"
          class="live-img"
        />
        <img v-if="cardType==1" :src="img+'@81w_61h_1e_1c_100q.webp'" class="article-img" />
        <img v-if="cardType==0" :src="img+'@100w_57h_1c_100q.webp'" class="default-img" />
        <div v-if="cardType==2">
          <div class="live-tag" :class="liveStatus?'living':''">{{liveStatus?'直播中':'未开播'}}</div>
        </div>
        <div v-if="isCollect">
          <!---->
          <div v-if="page !=1" class="duration-tag" v-text="page!=''?page+'P':''"></div>
          <div v-else class="duration-tag">{{duration | setTime}}</div>
        </div>
      </div>
      <div v-if="isProgress">
        <!-- 进度条 -->
        <div class="bar"></div>
        <div class="progress" :style="'width:'+progress+'%'"></div>
      </div>
    </div>
    <div class="video-info">
      <div class="line-2" :title="title">{{title}}</div>
      <!-- <div v-if="!isCollect" class="desc"></div> -->
      <div class="info">
        <div v-if="!isCollect" class="info-history">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="icon==2?'#icon-pcduan':icon==3?'#icon-mduan':''" />
          </svg>
          <span v-if="compare(viewTime*1000)" class="data">今天 {{viewTime*1000 | formatTime}}</span>
          <span v-else-if="compare(viewTime*1000, 1)" class="data">昨天 {{viewTime*1000 | formatTime}}</span>
          <span v-else class="data">{{viewTime*1000 | formatDate}}</span>
        </div>
        <span class="up">{{name}}</span>
      </div>
    </div>
  </a>
</template>

<script>
import { formatDate } from "../../assets/js/date.js";
import { compareDate } from "../../assets/js/filters.js";
export default {
  props: [
    "isCollect",
    "img",
    "page",
    "duration",
    "title",
    "name",
    "progress",
    "icon",
    "viewTime",
    "isProgress",
    "cardType",
    "liveStatus",
  ],
  data() {
    return {
      compare: compareDate,
    };
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "MM-dd hh:mm");
    },
    formatTime(time) {
      var date = new Date(time);
      return formatDate(date, "hh:mm");
    },
  },
};
</script>

<style lang="less" scoped>
.header-video-card {
  display: flex;
  flex-shrink: 0;
  padding: 8px 5px 8px 20px;
  height: 77px;
  cursor: pointer;
  transition: 0.3s ease;
  &:hover {
    background-color: #f4f4f4;
  }
  .multiple-preview {
    width: 108px;
    height: 61px;
  }
  .video-preview {
    position: relative;
    text-align: center;
  }
  .video-info {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    justify-content: space-between;
    margin-left: 12px;
    .line-2 {
      max-width: 200px;
      height: 37px;
      color: #212121;
      font-weight: 500;
      font-size: 14px;
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      word-break: break-all;
      -webkit-line-clamp: 2;
    }
    .info {
      display: flex;
      color: #999;
      font-size: 12px;
    }
    .up {
      overflow: hidden;
      margin-right: 15px;
      max-width: 110px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .info-history {
      margin-right: 16px;
      display: flex;
      align-items: center;
    }
  }
  .bar {
    width: 100%;
    background: #757575;
  }
  .progress {
    max-width: 100%;
    background: #fb7299;
  }
}
.video-card-img {
  box-sizing: border-box;
  .default-img,
  .article-img,
  .live-img {
    flex-shrink: 0;
    height: 61px;
    border-radius: 2px;
  }
  .default-img,
  .live-img {
    width: 108px;
  }
  .article-img {
    width: 81px;
  }
}
.duration-tag,
.live-tag {
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  right: 4px;
  font-size: 12px;
  padding: 0 2px;
  color: #fff;
  border-radius: 2px;
}
.duration-tag {
  bottom: 4px;
}
.live-tag {
  top: 4px;
}
.living {
  background: #fb7299;
}
.bar,
.progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  border-radius: 0 0 2px 2px;
}
.icon {
  color: #999;
  margin-right: 2px;
  font-size: 17px;
}
</style>