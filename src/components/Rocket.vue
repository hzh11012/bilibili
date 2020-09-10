<template>
  <div v-if="isScrollTop" @click="toTop" class="rocket-con"></div>
</template>

<script>
export default {
  data() {
    return {
      isScrollTop: false,
      scrollTop: 0, //当前滑动距离
    };
  },
  methods: {
    toTop() {
      const that = this;
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          that.scrollTop + ispeed;
        if (that.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 16);
    },
    scrollToTops(e) {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.scrollTop = scrollTop;
      if (this.scrollTop > 150) {
        this.isScrollTop = true;
      } else {
        this.isScrollTop = false;
      }
    },
  },
  mounted() {
    this.$nextTick(function () {
      window.addEventListener("scroll", this.scrollToTops, true);
    });
  },
  destroyed() {
    window.addEventListener("scroll", this.scrollToTops, true);
  },
};
</script>

<style lang="less" scoped>
.rocket-con {
  position: fixed;
  background: url(//static.hdslb.com/bl2se/images/rocket_top.png);
  width: 150px;
  height: 175px;
  cursor: pointer;
  z-index: 99;
  bottom: 0;
  left: 50%;
  margin-left: 490px;
  &:hover {
    animation: fly 0.4s steps(1) infinite;
    background-image: url(//static.hdslb.com/bl2se/images/rocket_frame.png);
  }
}
@keyframes fly {
  0% {
    background-position-x: 0;
  }
  25% {
    background-position-x: -150px;
  }
  50% {
    background-position-x: -300px;
  }
  75% {
    background-position-x: -450px;
  }
  100% {
    background-position-x: -600px;
  }
}
</style>