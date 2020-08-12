<template>
  <el-popover :open-delay="300" :close-delay="300" placement="bottom" width="260" trigger="hover">
    <div class="buddle-traditonal">
      <div class="title">精彩推荐</div>
      <div class="bubble-col">
        <div class="item">
          <a href="/" target="_blank" class="pic">
            <img
              src="//s1.hdslb.com/bfs/static/jinkela/international-home/asserts/vip-default-banner.png"
              width="234"
              height="68"
            />
          </a>
          <a href="/" target="_blank" class="recommand-link">大会员可畅享各种专属内容，还有游戏礼包、个性装扮等你来拿~</a>
        </div>
      </div>
      <div class="renew-btn">
        <button>{{$store.state.userinfo.vipStatus?'续期大会员':'开通大会员'}}</button>
      </div>
    </div>
    <span slot="reference" class="txt name">
      <a href="/">大会员</a>
    </span>
  </el-popover>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.buddle-traditonal {
  padding: 12px;
  .renew-btn {
    margin-top: 20px;
    text-align: center;
    position: relative;
    button {
      outline: none;
      width: 160px;
      height: 32px;
      background: #00a1d6;
      color: #fff;
      border: none;
      border-radius: 2px;
      cursor: pointer;
      font-size: 14px;
      &:hover {
        background: #00b5e5;
      }
    }
  }
}
.bubble-col {
  .pic {
    display: inline-block;
  }
  .item {
    .recommand-link {
      display: block;
      margin-top: 10px;
      font-size: 14px;
      color: #222;
      text-align: left;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      text-overflow: -o-ellipsis-lastline;
      text-overflow: ellipsis;
      word-break: break-all;
      -webkit-line-clamp: 2;
      line-height: 18px;
      overflow: hidden;
      &:hover {
        color: #00a1d6;
      }
    }
  }
}
.bubble-col-2 {
  display: flex;
}
.title {
  color: #212121;
  font-size: 14px;
  margin: 5px 0 12px;
  font-weight: 900;
}
</style>