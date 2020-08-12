<template>
  <el-popover :open-delay="300" :close-delay="300" placement="bottom" width="172" trigger="hover">
    <div class="im-root">
      <div class="im-root-list">
        <a href="/" target="_blank" class="list-item">回复我的</a>
        <a href="/" target="_blank" class="list-item">@我的</a>
        <a href="/" target="_blank" class="list-item">收到的赞</a>
        <a href="/" target="_blank" class="list-item">系统通知</a>
        <a href="/" target="_blank" class="list-item">我的消息</a>
      </div>
    </div>
    <span slot="reference" class="txt name">
      <a href="/">消息</a>
    </span>
    
  </el-popover>
</template>

<script>
export default {};
</script>


<style lang="less" scoped>
.im-root {
  font-size: 14px;
  .im-root-list {
    width: 100%;
    padding: 12px 0;
    border-radius: 2px;
    overflow: hidden;
    transition: all 300ms;
    .list-item {
      display: block;
      text-align: left;
      position: relative;
      line-height: 36px;
      height: 36px;
      padding-left: 20px;
      &:hover {
        background-color: #f4f4f4;
      }
    }
  }
}
</style>