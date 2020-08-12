<template>
  <div class="panel" :class="empty?'empty':''">
    <div v-if="isLoading" class="tip-box loading-tip">loading...</div>
    <div v-if="empty">好像最近没有看过视频呢</div>
    <div v-else>
      <video-card
        :isCollect="false"
        :isProgress="true"
        :title="item.title"
        :img="item.cover"
        :item="item"
        :cardType="0"
        :name="item.author_name"
        :icon="item.history.dt"
        :viewTime="item.view_at"
        :progress="item.progress != -1?(item.progress/item.duration*100):'100'"
        v-for="(item,index) in list"
        :key="index"
      ></video-card>
      <a v-if="!isLoading && list.length==20" href="/" target="_blank" class="view-all">查看全部</a>
    </div>
  </div>
</template>

<script>
import videoCard from "../Headvideocard.vue";
export default {
  data() {
    return {
      list: [],
      isLoading: true,
      empty: false,
    };
  },
  methods: {
    getVideoHistory() {
      this.$http
        .get("/api/x/web-interface/history/cursor?type=archive&ps=20")
        .then((res) => {
          this.list = res.data.data.list;
          this.isLoading = false;
          if (this.list == "") {
            this.empty = true;
          }
        });
    },
  },
  created() {
    this.getVideoHistory();
  },
  components: {
    videoCard,
  },
};
</script>

<style lang="less" scoped>
.view-all {
  display: block;
  cursor: pointer;
  width: 314px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  background: #f4f4f4;
  font-size: 14px;
  color: #212121;
  margin: 16px auto;
  transition: 0.3s ease;
  &:hover {
    background: #e7e7e7;
  }
}
</style>