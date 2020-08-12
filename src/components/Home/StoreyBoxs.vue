<template>
  <div class="storey-box b-wrap">
    <div class="proxy-box">
      <component :is="item.id" v-for="(item,index) in list" :key="index"></component>
      <!-- <bili-live></bili-live>
      <bili-douga></bili-douga>
      <bili-anime></bili-anime>
      <bili-guochuang></bili-guochuang>
      <bili-manga></bili-manga>
      <bili-music></bili-music>
      <bili-dance></bili-dance>
      <bili-game></bili-game>
      <bili-technology></bili-technology>
      <bili-cheese></bili-cheese>
      <bili-digital></bili-digital>
      <bili-life></bili-life>
      <bili-kichiku></bili-kichiku>
      <bili-fashion></bili-fashion>
      <bili-information></bili-information>
      <bili-ent></bili-ent>
      <bili-read></bili-read>
      <bili-movie></bili-movie>
      <bili-cinephile></bili-cinephile>
      <bili-teleplay></bili-teleplay>
      <bili-documentary></bili-documentary>-->
    </div>
    <bili-report></bili-report>
    <home-elevator @getChangeList="getChangeList"></home-elevator>
  </div>
</template>

<script>
import biliLive from "./Storey/biliLive.vue";
import biliDouga from "./Storey/biliDouga.vue";
import biliAnime from "./Storey/biliAnime.vue";
import biliGuochuang from "./Storey/biliGuochuang.vue";
import biliManga from "./Storey/biliMangas.vue";
import biliMusic from "./Storey/biliMusic.vue";
import biliDance from "./Storey/biliDance.vue";
import biliGame from "./Storey/biliGame.vue";
import biliTechnology from "./Storey/biliTechnology.vue";
import biliCheese from "./Storey/biliCheese.vue";
import biliDigital from "./Storey/biliDigital.vue";
import biliLife from "./Storey/biliLife.vue";
import biliKichiku from "./Storey/biliKichiku.vue";
import biliFashion from "./Storey/biliFashion.vue";
import biliInformation from "./Storey/biliInformation.vue";
import biliEnt from "./Storey/biliEnt.vue";
import biliRead from "./Storey/biliRead.vue";
import biliMovie from "./Storey/biliMovie.vue";
import biliCinephile from "./Storey/biliCinephile.vue";
import biliTeleplay from "./Storey/biliTeleplay.vue";
import biliDocumentary from "./Storey/biliDocumentary.vue";
import biliReport from "./Storey/biliReport.vue";
import homeElevator from "./Storey/elevator.vue";
export default {
  components: {
    biliLive,
    biliDouga,
    biliAnime,
    biliGuochuang,
    biliManga,
    biliMusic,
    biliDance,
    biliGame,
    biliTechnology,
    biliCheese,
    biliDigital,
    biliLife,
    biliKichiku,
    biliFashion,
    biliInformation,
    biliEnt,
    biliRead,
    biliMovie,
    biliCinephile,
    biliTeleplay,
    biliDocumentary,
    biliReport,
    homeElevator,
  },
  data() {
    return {
      daohangList: [
        { name: "直播", id: "biliLive" },
        { name: "动画", id: "biliDouga" },
        { name: "番剧", id: "biliAnime" },
        { name: "国创", id: "biliGuochuang" },
        { name: "漫画", id: "biliManga" },
        { name: "音乐", id: "biliMusic" },
        { name: "舞蹈", id: "biliDance" },
        { name: "游戏", id: "biliGame" },
        { name: "知识", id: "biliTechnology" },
        { name: "课堂", id: "biliCheese" },
        { name: "数码", id: "biliDigital" },
        { name: "生活", id: "biliLife" },
        { name: "鬼畜", id: "biliKichiku" },
        { name: "时尚", id: "biliFashion" },
        { name: "资讯", id: "biliInformation" },
        { name: "娱乐", id: "biliEnt" },
        { name: "专栏", id: "biliRead" },
        { name: "电影", id: "biliMovie" },
        { name: "影视", id: "biliCinephile" },
        { name: "TV剧", id: "biliTeleplay" },
        { name: "纪录片", id: "biliDocumentary" },
      ],
    };
  },
  methods: {
    getChangeList(val) {
      this.daohangList = val;
    },
  },
  computed: {
    list() {
      return this.daohangList;
    },
  },
};
</script>

<style lang="less" scoped>
.proxy-box {
  min-height: 1000px;
}
/deep/ a {
  color: #505050;
  transition: color 0.3s;
  &:hover {
    color: #00a1d6;
  }
}
/deep/ .zone-list-box {
  display: flex;
  align-content: space-between;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 1286px;
  height: 404px;
  min-height: 360px;
}
/deep/ .pgc-rank {
  width: 320px;
  .pgc-rank-wrap {
    &:last-child {
      margin-bottom: 0;
    }
  }
}
/deep/ .rank-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  height: 36px;
  .name {
    display: inline-block;
    color: #212121;
    vertical-align: bottom;
    font-size: 20px;
    line-height: 28px;
  }
  .more {
    display: flex;
    align-items: center;
    padding: 0 0 0 12px;
    width: 58px;
    height: 22px;
    border: 1px solid silver;
    border-radius: 2px;
    color: #505050;
    text-align: center;
    font-size: 12px;
    line-height: 16px;
    transition: all 0.2s;
    &:hover {
      background-color: #f4f4f4;
    }
    .icon {
      color: #505050;
      font-size: 14px;
      transform: rotate(-90deg);
      margin-left: 2px;
    }
  }
}
/deep/ .pgc-rank-wrap {
  display: flex;
  justify-content: space-between;
  margin-bottom: 18px;
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
  .link {
    display: inline-block;
  }
  .txt {
    width: 290px;
    line-height: 20px;
    display: flex;
    justify-content: space-between;
    .title,
    .update {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .title {
      width: 198px;
      font-size: 14px;
      font-weight: 500;
    }
    .update {
      font-size: 12px;
      color: #999;
      text-align: right;
      min-width: 90px;
    }
  }
}
</style>