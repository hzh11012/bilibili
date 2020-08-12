<template>
  <div class="live-card">
    <a href="/" target="_blank">
      <div class="pic">
        <img :src="item.cover+'@206w_116h_1c_100q.webp'" alt />
        <p class="count">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-renqi" />
          </svg>
          {{item.online | setNum}}
        </p>
        <div class="mask" :style="{backgroundImage:'url(' +item.keyframe +')'}"></div>
      </div>
      <div class="up">
        <div class="up-cover">
          <img :src="item.face+'@36w_36h_1c_100q.webp'" class="face" />
          <div
            class="verify-box"
            :class="item.verify.type!=-1?(item.verify.type==0?'type-0':'type-1'):''"
            v-if="item.verify.role"
          ></div>
        </div>
        <div class="txt">
          <p class="name">{{item.uname}}</p>
          <p :title="item.title" class="desc">{{item.title}}</p>
          <p class="tag">{{item.area_v2_name}}</p>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: ["item"],
};
</script>

<style lang="less" scoped>
.live-card {
  width: 206px;
  .pic {
    position: relative;
    display: block;
    cursor: pointer;
    margin-bottom: 10px;
    width: 100%;
    height: 116px;
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
    .count {
      position: absolute;
      bottom: 0;
      left: 0;
      color: #fff;
      font-size: 12px;
      padding: 6px 8px;
      height: 28px;
      display: flex;
      align-items: center;
      line-height: 16px;
      .icon {
        font-size: 22px;
        margin-right: 4px;
      }
    }
    .mask {
      position: absolute;
      opacity: 0;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 2px;
      transition: opacity 0.3s;
      background-repeat: no-repeat;
      background-color: #000;
      background-position: 50%;
      background-size: contain;
    }
    &:hover {
      .mask {
        opacity: 1;
      }
    }
  }
  .up {
    display: flex;
    justify-content: space-between;
    line-height: 16px;
    .up-cover {
      position: relative;
      .face {
        width: 36px;
        height: 36px;
        display: inline-block;
        border-radius: 50%;
        background: #f7f7f7;
      }
      .verify-box {
        position: absolute;
        right: -4px;
        top: 23px;
        width: 15px;
        height: 15px;
        background: #fff center/12px no-repeat;
        border-radius: 50%;
      }
      .type-0 {
        background-image: url(//s2.hdslb.com/bfs/static/blive/bpfe-dynamic-nav-iframe/static/img/verify_0.6e59734b.svg);
      }
      .type-1 {
        background-image: url(//s2.hdslb.com/bfs/static/blive/bpfe-dynamic-nav-iframe/static/img/verify_1.d53e8b68.svg);
      }
    }
    .txt {
      width: 158px;
      p {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 20px;
      }
      .name {
        font-size: 14px;
        line-height: 20px;
        font-weight: 500;
      }
      .desc {
        font-size: 12px;
        color: #505050;
        line-height: 18px;
        margin-top: 2px;
      }
      .tag {
        font-size: 12px;
        line-height: 16px;
        color: #999;
        margin-top: 8px;
      }
    }
  }
}
</style>