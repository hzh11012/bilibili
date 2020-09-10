<template>
  <li class="live-user-item">
    <a href="/" target="_blank" class="item-wrapper">
      <div class="item-left default-img-user">
        <div class="lazy-img">
          <img alt :src="item.uface" />
        </div>
      </div>
      <div class="item-right">
        <p class="uname" v-html="item.uname"></p>
        <div class="status" :class="item.is_live?'living':'free'">{{item.is_live?'直播中':'未开播'}}</div>
        <div class="info clearfix">
          <div class="type">
            <i v-if="item.area !=0" :class="item.area | areaIcon"></i>
            <span>{{item.area | areaType}}</span>
          </div>
          <div class="star">
            <i class="icon-live-col"></i>
            <span>{{item.attentions}}</span>
          </div>
        </div>
        <div class="tags clearfix" v-if="item.tags!=''">
          <span v-for="(item,index) in item.tags.split(',')" :key="index">{{item}}</span>
        </div>
      </div>
    </a>
  </li>
</template>

<script>
export default {
  props: ["item"],
  computed: {},
  filters: {
    //主播分区
    areaType(area) {
      switch (area) {
        case 0:
          return "未选择分区";
          break;
        case 1:
          return "单机联机";
          break;
        case 2:
          return "御宅文化";
          break;
        case 3:
          return "网络游戏";
          break;
        case 4:
          return "电子竞技";
          break;
        case 6:
          return "生活娱乐";
          break;
        case 7:
          return "放映厅";
          break;
        case 9:
          return "绘画专区";
          break;
        case 10:
          return "唱见舞见";
          break;
        case 12:
          return "手游直播";
          break;
      }
    },
    //分区icon
    areaIcon(area) {
      switch (area) {
        case 0:
          return "";
          break;
        case 1:
          return "icon-live-pcgame";
          break;
        case 2:
          return "icon-live-indoor";
          break;
        case 3:
          return "icon-live-net";
          break;
        case 4:
          return "icon-live-compete";
          break;
        case 6:
          return "icon-live-life";
          break;
        case 7:
          return "icon-live-movie";
          break;
        case 9:
          return "icon-live-draw";
          break;
        case 10:
          return "icon-live-music";
          break;
        case 12:
          return "icon-live-mgame";
          break;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.live-user-item {
  box-sizing: border-box;
  width: 312px;
  height: 110px;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.3s ease-in-out;
  &:hover {
    box-shadow: 0 0 7px rgba(0, 0, 0, 0.3);
  }
  .item-left {
    float: left;
    width: 80px;
    height: 80px;
    border-radius: 40px;
    overflow: hidden;
    margin-right: 25px;
  }
  .item-right {
    overflow: hidden;
    .uname {
      margin-top: -2px;
      margin-bottom: 4px;
      line-height: 16px;
      color: #666;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .status {
      display: inline-block;
      margin-bottom: 6px;
      padding: 0 3px;
      line-height: 18px;
      border-radius: 4px;
      color: #fff;
    }
    .living {
      background-color: #f6313e;
    }
    .free {
      background-color: #878787;
    }
    .info {
      margin-bottom: 6px;
      .type,
      .star {
        float: left;
        width: 88px;
        color: #666;
        line-height: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        i {
          margin-right: 6px;
        }
      }
      i,
      span {
        vertical-align: middle;
      }
      .icon-live-pcgame,
      .icon-live-net {
        background-image: url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/sprite-690be8a6ea.png);
        width: 14px;
      }
      .icon-live-compete,
      .icon-live-col {
        background-image: url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/sprite-690be8a6ea.png);
        width: 12px;
        height: 12px;
      }
      .icon-live-life,
      .icon-live-mgame {
        background-image: url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/sprite-690be8a6ea.png);
        width: 14px;
      }
      .icon-live-movie,
      .icon-live-music {
        background-image: url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/sprite-690be8a6ea.png);
        height: 12px;
      }
      //单机联机
      .icon-live-pcgame {
        background-position: -485px -504px;
        height: 9px;
      }
      //电子竞技
      .icon-live-compete {
        background-position: -485px -167px;
      }
      //星星
      .icon-live-col {
        background-position: -442px -206px;
      }
      //生活娱乐
      .icon-live-life {
        background-position: -192px -512px;
        height: 14px;
      }
      //手游直播
      .icon-live-mgame {
        background-position: -148px -556px;
        height: 8px;
      }
      //放映厅
      .icon-live-movie {
        background-position: -442px 0;
        width: 13px;
      }
      //网络游戏
      .icon-live-net {
        background-position: -485px 0;
        height: 11px;
      }
      //绘画专区
      .icon-live-draw {
        background-image: url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/sprite-690be8a6ea.png);
        background-position: -78px -531px;
        width: 13px;
        height: 13px;
      }
      //唱见舞见
      .icon-live-music {
        background-position: -485px -125px;
        width: 12px;
      }
      //御宅文化
      .icon-live-indoor {
        background-image: url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/sprite-690be8a6ea.png);
        background-position: -485px -420px;
        width: 12px;
        height: 11px;
      }
    }
    .tags {
      margin-right: -10px;
      height: 18px;
      overflow: hidden;
    }
    .tags > span {
      float: left;
      max-width: 167px;
      margin-right: 10px;
      padding: 0 3px;
      line-height: 16px;
      border: 1px solid #acacac;
      border-radius: 9px;
      color: #acacac;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
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