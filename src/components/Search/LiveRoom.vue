<template>
  <li class="live-room-item">
    <a href="/" target="_blank" class="item-wrapper">
      <div class="img-wrapper">
        <div class="lazy-img item-pic">
          <img alt :src="pic==0?item.user_cover:item.cover" />
        </div>
        <div :title="item.title | deleteHtml" class="item-hover">
          <div class="hover-mask"></div>
          <div class="hover-con">
            <i class="hover-point"></i>
            <span class="hover-txt">LIVE</span>
          </div>
        </div>
      </div>
      <div :title="item.title | deleteHtml" class="item-face">
        <div class="lazy-img face-pic">
          <img alt :src="item.uface" />
        </div>
      </div>
      <p :title="item.title | deleteHtml" class="item-title" v-html="item.title"></p>
      <div class="item-info">
        <div :title="item.uname" class="uname">
          <i class="icon-live-up"></i>
          <span>{{item.uname}}</span>
        </div>
        <div :title="item.title | deleteHtml" class="live-num">
          <i class="icon-live-watch"></i>
          <span>{{item.online | setNum}}</span>
        </div>
      </div>
    </a>
  </li>
</template>

<script>
export default {
  props: ["item", "pic"],
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
.live-room-item {
  position: relative;
  width: 160px;
  .img-wrapper {
    position: relative;
    width: 100%;
    height: 100px;
    border-radius: 4px;
    overflow: hidden;
    .item-hover {
      position: absolute;
      width: 160px;
      height: 100px;
      top: 0;
      left: 0;
      .hover-mask {
        position: absolute;
        width: 100%;
        height: 100%;
        transition: all 0.3s linear;
      }
      .hover-con {
        width: 70px;
        height: 24px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -12px;
        margin-left: -35px;
        opacity: 0;
        transition: all 0.3s linear;
      }
      .hover-point {
        width: 14px;
        height: 14px;
        border-radius: 7px;
        background-color: #f25d8e;
      }
      .hover-txt {
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 700;
        font-size: 20px;
        line-height: 24px;
        color: #fff;
      }
    }
  }
  &:hover {
    .img-wrapper .item-hover {
      .hover-con {
        opacity: 1;
      }
      .hover-mask {
        background-color: rgba(0, 0, 0, 0.5);
        color: #fff;
      }
    }
  }
  .item-face {
    box-sizing: content-box;
    position: absolute;
    top: 80px;
    left: 4px;
    width: 40px;
    height: 40px;
    border: 2px solid #fff;
    border-radius: 20px;
    overflow: hidden;
    z-index: 20;
    .face-pic {
      width: 100%;
      height: 100%;
    }
  }
  .item-title {
    box-sizing: content-box;
    padding-left: 55px;
    padding-top: 8px;
    height: 16px;
    line-height: 16px;
    color: #222;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .item-info {
    box-sizing: content-box;
    padding-top: 8px;
    height: 16px;
    line-height: 16px;
    font-size: 0;
    .uname {
      width: 80px;
    }
    .live-num {
      width: 75px;
      margin-left: 5px;
    }
    .uname,
    .live-num {
      display: inline-block;
      font-size: 0;
      line-height: 16px;
      color: #aaa;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      i {
        margin-right: 6px;
        vertical-align: middle;
      }
      span {
        font-size: 12px;
        vertical-align: middle;
      }
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