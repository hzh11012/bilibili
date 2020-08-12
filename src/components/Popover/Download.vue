<template>
  <el-popover
    :open-delay="300"
    :close-delay="300"
    popper-class="downloadPop"
    placement="bottom"
    trigger="hover"
    :visible-arrow='false'
  >
    <p class="txt">扫码下载手机客户端</p>
    <li slot="reference" class="nav-link-item">
      <a href="/" target="_blank" class="link">
        <svg class="icon icon-navbar_phone" aria-hidden="true">
          <use xlink:href="#icon-navbar_phone" />
        </svg>下载APP
      </a>
    </li>
  </el-popover>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.txt {
  position: absolute;
  bottom: 0;
  font-size: 14px;
  color: #212121;
  width: 100%;
  text-align: center;
  padding-bottom: 24px;
}
</style>