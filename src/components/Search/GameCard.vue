<template>
  <li class="game-item">
    <a href="/" target="_blank" :title="item.game_name" class="cover-img">
      <div class="lazy-img">
        <img :src="item.game_icon" alt />
      </div>
    </a>
    <div class="info">
      <div class="headline cardhead">
        <span class="type">游戏</span>
        <a href="/" target="_blank" :title="item.game_name" class="title">{{item.game_name}}</a>
        <div class="grade-wrap">
          <div class="player-grade">
            玩家评分：
            <span class="grade">{{item.grade}}</span>
            <span class="grade-text">分</span>
          </div>
        </div>
      </div>
      <p class="desc" v-if="item.book_num!=0">预约人数：{{item.book_num | setNum}}</p>
      <p class="desc" v-if="item.platform!=''">平台：{{item.platform}}</p>
      <p class="desc" v-if="item.summary!=''">游戏简介：{{item.summary}}</p>
      <div class="btn-wrap">
        <div class="btn primary">{{item.game_status | setText}}</div>
        <div class="btn default">
          评价
          <span>({{item.comment_num | setNum}}条)</span>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: ["item"],
  filters: {
    setText(status) {
      switch (status) {
        case 0:
          return "预约";
          break;
        case 1:
          return "下载";
          break;
        case 3:
          return "进入";
          break;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.game-item {
  box-sizing: content-box;
  position: relative;
  height: 130px;
  padding: 20px 0;
  border-bottom: 1px solid #e5e9ef;
  .cover-img {
    display: block;
    float: left;
    width: 130px;
    height: 130px;
    border-radius: 2px;
    margin-right: 14px;
    overflow: hidden;
  }
  .info {
    overflow: hidden;
    .cardhead {
      margin-bottom: 4px;
      padding-right: 140px;
    }
    .type {
      vertical-align: top;
      display: inline-block;
      line-height: 22px;
      border-radius: 12px;
      padding: 0 17px;
      border: 1px solid #ccd0d7;
      color: #7b8286;
      text-align: center;
      margin-right: 10px;
      font-size: 12px;
    }
    .title {
      font-size: 16px;
      color: #212121;
      display: inline-block;
      line-height: 24px;
      &:hover {
        color: #00a1d6;
      }
    }
    .grade-wrap {
      color: #99a2aa;
      position: absolute;
      right: 0;
      top: 20px;
      .player-grade {
        margin-bottom: 3px;
      }
      .grade {
        font-size: 20px;
        color: #ffa726;
        font-weight: 700;
      }
      .grade-text {
        color: #ffa726;
        font-weight: 700;
        margin-left: 3px;
      }
    }
    .desc {
      font-size: 12px;
      color: #99a2aa;
      line-height: 18px;
      margin-bottom: 4px;
    }
    .btn-wrap {
      position: absolute;
      bottom: 20px;
      .btn {
        box-sizing: content-box;
        width: 120px;
        height: 32px;
        text-align: center;
        float: left;
        line-height: 32px;
        font-size: 14px;
        border-radius: 2px;
        cursor: pointer;
      }
      .btn.primary {
        background: #00a1d6;
        color: #fff;
        margin-right: 12px;
      }
      .btn.default {
        border: 1px solid #00a1d6;
        width: 118px;
        color: #00a1d6;
        height: 30px;
      }
    }
  }
}
</style>