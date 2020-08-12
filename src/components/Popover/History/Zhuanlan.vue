<template>
  <div class="panel" :class="empty?'empty':''">
    <div v-if="isLoading" class="tip-box loading-tip">loading...</div>
    <div v-if="empty">好像最近没有看过专栏呢</div>
    <video-card
      :isCollect="false"
      :title="item.title"
      :img="item.covers[0]"
      :item="item"
      :cardType="1"
      :name="item.author_name"
      :icon="item.history.dt"
      :viewTime="item.view_at"
      v-for="(item,index) in list"
      :key="index"
    ></video-card>
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
    getZhuanlanHistory() {
      this.$http
        .get("/api/x/web-interface/history/cursor?type=article&ps=20")
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
    this.getZhuanlanHistory();
  },
  components: {
    videoCard,
  },
};
</script>

<style lang="less" scoped>
</style>