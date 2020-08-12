<template>
  <el-popover
    :open-delay="200"
    :close-delay="300"
    @show="show"
    placement="bottom"
    width="520"
    trigger="hover"
  >
    <div class="favorite-container" v-if="collected">
      <div class="tabs-bar">
        <div class="tab-item" :class="active==collect[0].mediaListResponse.list[0].id?'tab-item-active':''" @click="select(collect[0].mediaListResponse.list[0].id)">
          <span
            :title="collect[0].mediaListResponse.list[0].title"
            class="title"
          >{{collect[0].mediaListResponse.list[0].title}}</span>
          <span class="num">{{collect[0].mediaListResponse.list[0].media_count}}</span>
        </div>
        <div class="tab-item" :class="active==1?'tab-item-active':''" @click="select1">
          <span title="稍后再看" class="title">稍后再看</span>
          <span class="num">{{collect[1].mediaListResponse.count}}</span>
        </div>
        <div
          @click="select(item.id)"
          v-show="index != 0"
          class="tab-item"
          :class="active==item.id?'tab-item-active':''"
          v-for="(item,index) in collect[0].mediaListResponse.list"
          :key="index"
        >
          <span :title="item.title" class="title">{{item.title}}</span>
          <span class="num">{{item.media_count}}</span>
        </div>
      </div>
      <div class="favorite-video-panel">
        <div class="favorite-video-list" :class="videoList!= null?'':'empty-list'">
          <span v-if="videoList == null">该收藏夹还没有视频哦~</span>
          <video-card
            :isCollect="true"
            :name="shzk?(item.owner.name):(item.upper.name)"
            :title="item.title"
            :cardType="0"
            :duration="!shzk?item.duration:''"
            :page="!shzk?item.page:''"
            :img="shzk?(item.pic):(item.cover)"
            :item="item"
            v-for="(item,index) in videoList"
            :key="index"
          ></video-card>
        </div>
        <div v-if="videoList != null" class="play-view-all">
          <a href="/" target="_blank" class="play-all view">查看全部</a>
          <!---->
          <!---->
          <a href="/" target="_blank" class="play-all">播放全部</a>
        </div>
      </div>
    </div>
    <span slot="reference" class="txt name">
      <a href="/">收藏</a>
    </span>
  </el-popover>
</template>

<script>
import videoCard from "./Headvideocard.vue";
export default {
  data() {
    return {
      active: 0, // 选中的 收藏夹
      collect: [], //收藏夹列表
      collected: false, //数据获取到再加载
      videoList: [], //对应收藏夹的 视频列表
      shzk: false,
    };
  },
  methods: {
    //获取创建的收藏夹
    getCollect() {
      this.$http.get("/api/x/v3/fav/folder/list4navigate").then((res) => {
        this.collect = res.data.data;
        this.select(this.collect[0].mediaListResponse.list[0].id);
        this.collected = true;
      });
    },
    show() {
      this.getCollect();
    },
    //获取对应收藏夹的 视频列表
    select(id) {
      this.active = id;
      this.$http
        .get("/api/x/v3/fav/resource/list4navigate?media_id=" + id)
        .then((res) => {
          this.videoList = res.data.data;
          this.shzk = false;
        });
    },
    select1() {
      this.active = 1;
      this.$http.get("/api/x/v2/history/toview/web?jsonp=jsonp").then((res) => {
        this.videoList = res.data.data.list;
        this.shzk = true;
      });
    },
  },
  components: {
    videoCard,
  },
};
</script>

<style lang="less" scoped>
.favorite-container {
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 518px;
}
.tabs-bar {
  overflow-y: auto;
  flex-shrink: 0;
  padding: 12px 0;
  width: 149px;
  height: 100%;
  border-right: 1px solid #e7e7e7;
  overscroll-behavior: none;
}
.tab-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  height: 46px;
  cursor: pointer;
  transition: 0.3s ease;
  color: #212121;
  .title {
    overflow: hidden;
    width: 85px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .num {
    word-break: normal;
    color: #999;
  }
}
.tab-item-active {
  background-color: #00a1d6;
  color: #fff;
  .num{
    color: #fff;
  }
}
.favorite-video-panel {
  padding-top: 12px;
  height: 100%;
}
.favorite-video-list {
  overflow-y: auto;
  width: 370px;
  height: calc(100% - 46px);
  overscroll-behavior: none;
}
.empty-list {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 370px;
  height: calc(100% - 46px);
  color: #999;
  font-size: 14px;
}
.play-view-all {
  display: flex;
}
.play-all {
  bottom: 0;
  display: block;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-top: 1px solid #e7e7e7;
  background-color: #fff;
  color: #00a1d6;
  line-height: 45px;
  cursor: pointer;
  transition: 0.3s ease;
  &:hover {
    background-color: #f4f4f4;
  }
}
.view {
  color: #212121;
}
</style>