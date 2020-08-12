<template>
  <div class="container" :class="empty?'empty':''">
    <div v-if="isLoading" class="tip-box loading-tip">loading...</div>
    <div v-if="empty">暂时没有新动态了哦！</div>
    <div v-else>
      <div class="list-item" v-for="(item,index) in zhiboList" :key="index">
        <div class="main-container">
          <div class="left-box">
            <div class="avatar" :style="{backgroundImage:'url('+item.face+'@36w_36h_1c.webp)'}"></div>
          </div>
          <div class="center-box">
            <div class="name-line">
              <span class="user-name">{{item.uname}}</span>
              <span class="publish-time">正在直播</span>
            </div>
            <a href="/" target="_blank" class="content">{{item.title}}</a>
          </div>
          <a target="_blank" class="right-box" href="/">
            <div class="cover" :style="{backgroundImage:'url('+item.pic+'@64w_48h_1c.webp)'}"></div>
          </a>
        </div>
      </div>
      <div v-if="!isLoading" class="more-tab">
        <button class="more-btn" @click="lookAll">查看全部</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      zhiboList: [],
      isLoading: true,
      empty: false,
    };
  },
  methods: {
    getZhibo() {
      this.$http
        .get("/live/relation/v1/feed/feed_list?page=1&pagesize=10")
        .then((res) => {
          this.zhiboList = res.data.data.list;
          this.isLoading = false;
          if (this.zhiboList == "") {
            this.empty = true;
          }
        });
    },
    lookAll() {
      //查看全部TODO
    },
  },
  created() {
    this.getZhibo();
  },
};
</script>

<style lang="less" scoped>
.publish-time {
  color: #fb7299 !important;
}
</style>