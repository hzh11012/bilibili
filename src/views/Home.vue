<template>
  <div class="home bottom-filling" id="homeTop">
    <inter-header :banner="true"></inter-header>
    <first-screen></first-screen>
    <storey-box></storey-box>
    <inter-footer></inter-footer>
  </div>
</template>

<script>
import interHeader from "../components/InterHeader.vue";
import firstScreen from "../components/Home/FirstScreen.vue";
import storeyBox from "../components/Home/StoreyBoxs.vue";
import interFooter from "../components/InterFooter.vue";
export default {
  components: {
    interHeader,
    firstScreen,
    storeyBox,
    interFooter,
  },
};
</script>

<style lang="less" scoped>
/deep/ .b-wrap {
  width: 1630px;
  margin: 0 auto;
  .el-carousel__container {
    height: 242px;
  }
}
/deep/ .storey-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  height: 36px;
  .l-con {
    display: inline-flex;
    .icon {
      margin-right: 6px;
      overflow: hidden;
      width: 36px;
      height: 36px;
      vertical-align: middle;
      fill: currentColor;
    }
  }
  .name {
    margin: 0 20px 0 0;
    vertical-align: bottom;
    font-size: 20px;
    line-height: 36px;
  }
  .text-info {
    color: #505050;
    line-height: 36px;
  }
}
/deep/ .space-between {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
}
/deep/ .exchange-btn {
  display: flex;
  .btn-change {
    padding: 0 0 0 3px;
    width: 72px;
    .icon {
      color: #505050;
      font-size: 20px;
      margin-right: 3px;
      transition: all 0.5s;
    }
    &:hover {
      .icon {
        transform: rotate(-1turn);
      }
    }
  }
  .btn {
    display: flex;
    align-items: center;
    cursor: pointer;
    height: 22px;
    text-align: center;
    border: 1px solid silver;
    border-radius: 2px;
    font-size: 12px;
    color: #505050;
    transition: all 0.2s;
    line-height: 16px;
    &:hover {
      background-color: #f4f4f4;
    }
  }
  .more {
    padding: 0 0 0 12px;
    width: 58px;
    margin-left: 12px;
    .icon {
      color: #505050;
      font-size: 14px;
      transform: rotate(-90deg);
      margin-left: 2px;
    }
  }
}
.bottom-filling {
  &::after {
    height: 278px;
    display: block;
    content: "";
  }
}

@media screen and (max-width: 1870px) {
  /deep/ .b-wrap {
    width: 1414px;
    .recommend-box {
      width: 854px;
      height: 242px;
      .video-card-reco:nth-child(n + 9) {
        display: none;
      }
    }
    .extension {
      width: 1070px;
    }
    .video-card-common:nth-child(n + 6) {
      display: none;
    }
    .zone-list-box {
      width: 1070px;
      .live-card:nth-child(n + 11) {
        display: none;
      }
      .video-card-common1:nth-child(n + 11) {
        display: none;
      }
      .time-line-card {
        margin: 0 30px 24px 0 !important;
        width: 227px;
      }
      .article-card {
        width: 520px;
      }
    }
    .space-between {
      .zone-list-box {
        width: 1070px;
      }
    }
    .manga-panel {
      .manga-list-box {
        width: 1070px;
      }
      .manga-card {
        &:nth-child(n + 11) {
          display: none;
        }
      }
    }
    .elevator {
      margin-left: 716px;
    }
  }
}
@media screen and (max-width: 1654px) {
  /deep/ .b-wrap {
    width: 1198px;
    .recommend-box {
      width: 638px;
      .video-card-reco:nth-child(n + 7) {
        display: none;
      }
    }
    .extension {
      width: 854px;
    }
    .video-card-common:nth-child(n + 5) {
      display: none;
    }
    .zone-list-box {
      width: 854px !important;
      .live-card:nth-child(n + 9) {
        display: none;
      }
      .video-card-common1:nth-child(n + 9) {
        display: none;
      }
      .article-card {
        width: 400px;
      }
    }
    .manga-panel {
      .manga-list-box {
        width: 854px !important;
        height: 581px !important;
        .manga-card {
          width: 162px !important;
          margin-bottom: 20px !important;
        }
        .manga-card > img {
          width: 162px !important;
          height: 216px !important;
        }
      }
    }
    .manga-rank {
      .manga-rank-list {
        .title {
          max-width: 200px !important;
        }
        .manga-rank-item {
          &:nth-child(n + 13) {
            display: none;
          }
        }
      }
    }
    .elevator {
      margin-left: 615px;
    }
  }
}
@media screen and (max-width: 1438px) {
  /deep/ .b-wrap {
    width: 999px;
    .home-silde {
      width: 459px;
      height: 202px;
      .el-carousel__container {
        height: 202px;
      }
    }
    .recommend-box {
      width: 530px;
      height: 202px;
      .video-card-reco {
        width: 170px;
        height: 96px;
        .info-box .info {
          padding: 8px 10px 10px;
        }
      }
    }
    .extension {
      width: 710px;
    }
    .bypb-window {
      width: 265px;
    }
    .video-card-common {
      width: 170px;
      .card-pic {
        width: 100%;
        height: 96px;
        a {
          &::before {
            background: none;
          }
        }
        .right {
          display: none;
        }
      }
      &:hover {
        .card-pic .left {
          display: none;
        }
        .card-pic .right {
          display: block;
        }
      }
    }
    .video-card-common1 {
      width: 170px;
      .card-pic {
        width: 100%;
        height: 96px;
        .right {
          display: none;
        }
      }
      &:hover {
        .card-pic .left {
          display: none;
        }
        .card-pic .right {
          display: block;
        }
      }
    }
    .zone-list-box {
      width: 710px !important;
      height: 360px;
      .live-card {
        width: 170px;
        .pic {
          width: 100%;
          height: 96px;
        }
      }
      .time-line-card {
        margin: 0 20px 24px 0 !important;
        width: 210px;
        .txt {
          width: 130px;
        }
      }
      .article-card {
        width: 345px;
      }
    }
    .live-card {
      .up {
        .txt {
          width: 128px;
        }
      }
    }
    .live-tabs {
      width: 265px;
      .live-rank {
        .live-rank-item {
          margin-bottom: 16px;
          .txt {
            width: 102px;
          }
        }
      }
    }
    .recommend-activity {
      width: 265px !important;
      height: 273px !important;
      .el-carousel__container {
        height: 273px !important;
      }
    }
    .pgc-rank {
      width: 265px;
    }
    .anime {
      .zone-list-box {
        height: 332px;
      }
    }
    .pgc-rank {
      width: 265px;
      .pgc-rank-wrap {
        .txt {
          width: 235px;
        }
      }
    }
    .guochuang {
      .banner {
        width: 265px !important;
        height: 91px !important;
        .el-carousel__container {
          height: 91px !important;
        }
      }
      .r-con {
        width: 265px;
      }
    }
    .manga-panel {
      .manga-list-box {
        width: 710px !important;
        height: 602px;
        .manga-card {
          width: 170px !important;
          margin-bottom: 20px !important;
          &:nth-child(n + 9) {
            display: none;
          }
        }
        .manga-card > img {
          width: 170px !important;
          height: 227px !important;
        }
      }
    }
    .manga-rank {
      width: 265px !important;
      .manga-rank-list {
        width: 265px !important;
        .title {
          max-width: 148px !important;
        }
      }
      .preview {
        width: 235px;
      }
    }
    .cheese {
      height: 322px !important;
      &:hover {
        .card-pic .left {
          display: flex !important;
        }
      }
    }
    .article-list {
      .zone-list-box {
        height: 404px;
      }
    }
    .elevator {
      margin-left: 515px;
    }
  }
}
</style>
