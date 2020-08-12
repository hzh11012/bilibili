<template>
  <el-popover :open-delay="300" :close-delay="300" placement="bottom" width="304px" trigger="hover">
    <div class="container">
      <a
        :href="item.link"
        target="_blank"
        class="upload-item"
        v-for="(item,index) in tougaoList"
        :key="index"
      >
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="'#icon-'+item.icon" />
        </svg>
        <span class="item-title">{{item.title}}</span>
      </a>
    </div>
    <span slot="reference" class="upload-btn">投稿</span>
  </el-popover>
</template>

<script>
export default {
  data() {
    return {
      tougaoList: [
        { title: "专栏投稿", icon: "dingdao_wenzhangtougao", link: "/" },
        { title: "音频投稿", icon: "dingdao_yinpintougao", link: "/" },
        { title: "视频投稿", icon: "dingdao_shipintougao", link: "/" },
        { title: "投稿审核", icon: "dingdao_tougaoguanli", link: "/" },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  width: 100%;
  height: 78px;
}
.upload-item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 76px;
  height: 100%;
  cursor: pointer;
  transition: 0.2s ease;
  &:hover {
    background: #f4f4f4;
  }
}
.icon {
  vertical-align: middle;
  color: #757575;
  font-size: 26px;
}
.item-title{
    margin-top: 6px;
}
</style>