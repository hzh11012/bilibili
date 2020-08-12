<template>
  <div class="nav-header-box">
    <div class="nav-header">
      <nav-link :bw="bw" :miniIcon="miniIcon"></nav-link>
      <nav-user></nav-user>
    </div>
  </div>
</template>

<script>
import navLink from "./NavLink.vue";
import navUser from "./NavUser.vue";
export default {
  props: ["bw", "miniIcon"],
  components: {
    navLink,
    navUser,
  },
};
</script>

<style lang="less" scoped>
.nav-header-box {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 56px;
}
.nav-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
  margin: 0 auto;
  padding: 10px 24px;
  line-height: 30px;
}
</style>