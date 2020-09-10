<template>
  <div class="video-card-common">
    <div class="card-pic">
      <a :href="'#/video?id='+item.archive.bvid" target="_blank">
        <img :src="item.pic+'@412w_232h_1c_100q.jpeg'" width="206" height="116" />
        <div class="count">
          <div class="left"></div>
          <div class="right">
            <span>{{item.archive.duration | setTime}}</span>
          </div>
        </div>
        <p class="ex-title">
          <span v-if="item.server_type" class="gg-icon">广告</span>
          {{item.name}}
        </p>
      </a>
      <watch-later></watch-later>
    </div>
    <a href="/" target="_blank" class="ex-up">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-up" />
      </svg>
      {{item.archive.owner.name}}
    </a>
  </div>
</template>

<script>
import watchLater from "./watchLater.vue";
export default {
  props: ["item"],
  components: {
    watchLater,
  },
};
</script>

<style lang="less" scoped>
.video-card-common {
  width: 206px;
  cursor: pointer;
  .card-pic {
    position: relative;
    width: 100%;
    height: 116px;
    a {
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABHCAMAAAB4UkqjAAAAh1BMVEUAAADd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d0UCIZXAAAALHRSTlMAoJDx4OYL/DcGF+6+JNi4ycSIT2k6LPeWfRzTVPXPszEQrV0hpo12cEZAZFpRNIQAAAJVSURBVFjD7dbZcpswGIbhHwwSi81q8Ib33fnu//oatRIpmliDhQ/aaZ+TKInnjVgkhb4RJMhP9Fzo8PiD+vEA+JPnqS0+1dRHBJhibAzh2HNeekxP9Z8XBSMZM6SmRBYx65QeM6XsY3rKPqanLGMWqeDmOh0b/Io9+YHi3gKtdExgLznSlyjFMGnUphIMlcgY22C4DSPBxTu4IrXDe+yI6IDWbPSqGVoHoohDyip6XZVB4hFN1TgPyUaYQ5rSWQ0nZGcC6UyJukKypa4yIXX3HLLlqCdHX++HLRfS/9bbWvvHLSLNR3N6tRXdFwdxejekiYF4fDnWYa/WqSm2PqRCSy0hrbP5RxAaW8141N17tVbZ+S1fFYbWFF2+1lqg62BoBdAsqWOLroWhxTh+M8vmWuuaxp1WaWjRSn43yl35sHTLUjxiaWlqnYE4LZoJme3v13MibqepFZRL6otV5V+/Hv+xVvi+FsvZG1qh/LQ7uFXnF/HlwcEfYlDktW2r5EARUiXWc1xRWAC8tGwxsdJ9dcRnYrddMdtrjDZyAy3kXrSJ7O89u8zEZAIKxBRnFzbonWD3ZkfCrrmzP+6979nicjAnW3NZ4OS1R6GtVBa8drTek539up3NAgMvcv51WNZQitCiFBZQaqIMSrx1XrWNoWTy/w1r+hk+xjuMSVjGGC6WZ3S1xlDriqTKxzB+Ra3I4bDHne62drqmied57QR9z0D94dHnOEmvJ/pWAMm4ovL2TTcJ5cRyMlHrbkdG5c/5r82fYqt+K/iR89m2JrP9PEZyI80PsPxVT0P3FAEAAAAASUVORK5CYII=);
      background-repeat: no-repeat;
      background-position: 50%;
      &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 48px;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAwCAYAAAGnNCAXAAAABGdBTUEAALGPC/xhBQAAAENJREFUCB1jYGBgYGICEpIgQgqNBRRi4MMmARYDyXKAWLwgggfOAnMJiIH0soJ0sMEJdlQWWBYshpAAK0ZwwSzS1AEAes8Ckyqvlc0AAAAASUVORK5CYII=);
        background-repeat: repeat-x;
        bottom: 0;
        left: 0;
        border-radius: 2px;
      }
      img {
        width: 100%;
        height: 100%;
        border-radius: 2px;
      }
      .count,
      .count .left,
      .count .left span {
        display: flex;
        align-items: center;
      }
      .count {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 6px 8px;
        justify-content: space-between;
        color: #fff;
        line-height: 16px;
      }
    }
    &:hover {
      /deep/ .watch-later-video {
        transition-delay: 0.2s;
        opacity: 1;
      }
    }
  }
  .ex-title {
    display: block;
    font-size: 14px;
    line-height: 20px;
    margin: 10px 0 8px;
    height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-weight: 500;
    padding-right: 12px;
  }
  .gg-icon {
    display: inline-block;
    font-size: 12px;
    border-radius: 2px;
    margin-right: 8px;
    width: 30px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    border: 1px solid #b2b2b2;
    color: #b2b2b2;
    font-weight: 400;
  }
  .ex-up {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #999;
    margin-top: 60px;
    .icon {
      color: #999;
      vertical-align: middle;
      margin-right: 3px;
      font-size: 20px;
      transition: color 0.3s;
      transform: translateX(-2px);
    }
    &:hover {
      color: #00a1d6;
      .icon {
        color: #00a1d6;
      }
    }
  }
}
a {
  color: #505050;
  transition: color 0.3s;
  &:hover {
    color: #00a1d6;
  }
}
</style>