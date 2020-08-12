<template>
  <div id="elevator" class="elevator" :class="isEdit?'edit':''" style="top: 263px;">
    <div class="mask" @click="isEdit=false"></div>
    <svg class="icon icon-xiaodianshitianxian" aria-hidden="true">
      <use xlink:href="#icon-xiaodianshitianxian" />
    </svg>
    <div class="list-box">
      <div>
        <SlickList helperClass="ghost" lockAxis="y" v-model="list" @input="getChangeList">
          <SlickItem
            :disabled="!isEdit"
            class="item"
            v-for="(item,index) in list"
            :key="index"
            :index="index"
          >
            <div @mouseup="toPositon(item)">{{item.name}}</div>
          </SlickItem>
        </SlickList>
      </div>
      <div class="item sort" :class="isEdit?'on':''" @click="isEdit=!isEdit">
        <svg class="icon icon-paixu" aria-hidden="true">
          <use xlink:href="#icon-paixu" />
        </svg>
      </div>
      <div class="item back-top" @click="toTop">
        <svg class="icon icon-top" aria-hidden="true">
          <use xlink:href="#icon-xiala" />
        </svg>
      </div>
    </div>
    <div class="bg23"></div>
  </div>
</template>

<script>
import Vue from "vue";
import { SlickList, SlickItem } from "vue-slicksort";

export default {
  data() {
    return {
      isEdit: false,
      list: [
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
      this.$emit("getChangeList", val);
    },
    toPositon(item) {
      let el = document.getElementById(item.id);
      this.$nextTick(function () {
        window.scrollTo({ behavior: "smooth", top: el.offsetTop });
      });
    },
    toTop() {
      let el = document.getElementById('homeTop');
      this.$nextTick(function () {
        window.scrollTo({ behavior: "smooth", top: el.offsetTop });
      });
    },
  },
  components: {
    SlickList,
    SlickItem,
  },
};
</script>

<style lang="less" scoped>
.elevator {
  position: fixed;
  left: calc(50% + 3px);
  top: 10px;
  margin-left: 825px;
  z-index: 10;
  .list-box {
    padding-top: 6px;
    position: relative;
    background: #fff;
    border: 1px solid #e7e7e7;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    z-index: 2;
    .item {
      width: 54px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      cursor: pointer;
      transition: background-color, color 0.2s;
      -ms-user-select: none;
      user-select: none;
      &:hover {
        background-color: #00a1d6;
        color: #fff;
        .icon-paixu {
          color: #fff;
        }
        .icon-top {
          color: #fff;
        }
      }
    }
    .sort {
      height: 32px;
      line-height: 32px;
      position: relative;
      border-top: 1px solid #e7e7e7;
      margin-top: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      .icon-paixu {
        color: #999;
        font-size: 16px;
      }
    }
    .on {
      background-color: #00a1d6;
      color: #fff;
      .icon-paixu {
        color: #fff;
      }
    }
    .back-top {
      position: absolute;
      left: -1px;
      bottom: -32px;
      width: 56px;
      line-height: 30px;
      height: 32px;
      border: 1px solid #e7e7e7;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
      .icon-top {
        color: #999;
        font-size: 20px;
        transform: rotate(-180deg);
      }
    }
  }
  .bg23 {
    display: none;
    position: absolute;
    width: 130px;
    height: 105%;
    top: -20px;
    right: -15px;
    background-color: hsla(0, 0%, 100%, 0.8);
    padding: 40px;
    box-sizing: content-box;
    border-radius: 2px;
    background-image: url(https://s1.hdslb.com/bfs/static/jinkela/home/asserts/tab2233.png);
    background-repeat: no-repeat;
    background-position: 16px 20px;
  }
}
.edit {
  z-index: 1000;
  .mask {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .bg23 {
    display: block;
  }
}
.icon-xiaodianshitianxian {
  color: #505050;
  font-size: 34px;
  position: absolute;
  top: -20px;
  left: 11px;
  z-index: 2;
}
.ghost {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #00a1d6;
  color: #fff;
  z-index: 1000;
}
</style>