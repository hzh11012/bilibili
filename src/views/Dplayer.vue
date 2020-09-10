<template>
  <div id="dplayer"></div>
</template>

<script>
// import DPlayer from "dplayer";
export default {
  data() {
    return {
      // dp: null,
    };
  },
  methods: {
    getInfo() {
      const p = new Promise((resolve, reject) => {
        this.$http.get("/api/x/web-show/res/locs?pf=0&ids=3197").then((res) => {
          if (res.data.code) {
            resolve("获取成功", res.data.data);
          } else {
            reject("获取错误", res.data.code);
          }
        });
      });
    },
  },
  mounted() {
    // const dp = new DPlayer({
    //   // 配置参数
    //   container: document.getElementById("dplayer"),
    //   video: {
    //     url:
    //       "/cos/upgcxcode/90/65/122426590/122426590-1-6.mp4?e=ig8euxZM2rNcNbuVhwdVtWuVhwdVNEVEuCIv29hEn0l5QK==&uipk=5&nbs=1&deadline=1570938144&gen=playurl&os=ks3u&oi=3742040479&trid=06d1dfd471d34b8eb40c4cee6c79531ah&platform=html5&upsig=904b08c9cd9418a8acfd4384c8b05a30&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,platform&mid=0%22",
    //     type: "auto",
    //   },
    //   danmaku: {
    //     id: "e43f24002cf2924f8576d1daf75ab6c7",
    //     api: "https://dplayer.alone88.cn/",
    //     // api: "http://dm.qnets.cn/",
    //     addition: ["https://dplayer.alone88.cn/v3/bilibili?aid=53851218"],
    //   },
    // });
  },
  components: {
    // DPlayer,
  },
  created() {
    // this.get("/api/x/web-show/res/locs?pf=0&ids=3197", {})
    //   .then((res) => {
    //     console.log("3197");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // this.get("/api/x/web-show/res/locs?pf=0&ids=52", {})
    //   .then((res) => {
    //     console.log("52");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // const p = async (res) => {
    //   await this.$http.get("/api/x/web-show/res/locs?pf=0&ids=34", {});
    // };
    // p();
    // this.get("/api/x/web-show/res/locs?pf=0&ids=34", {})
    //   .then((res) => {
    //     console.log("32");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // console.log("asdasdasdasd");
  },
};
// async function async1() {
//     console.log("async1 start");
//     await async2();
//     console.log("async1 end");
// }

// async function async2() {
//     console.log("async2");
// }

// console.log("script start");

// setTimeout(function() {
//     console.log("setTimeout");
// }, 0);

// async1();

// new Promise(function(resolve) {
//     console.log("promise1");
//     resolve();
// }).then(function() {
//     console.log("promise2");
// });

// console.log("script end");

let promise = new Promise((resolve) => {
  resolve();
});
promise
  .then(() => {
    return "我是";
  })
  .then((zhuyu) => {
    console.log(zhuyu);
    return zhuyu + "贺";
  })
  .then((xingshi) => {
    console.log(xingshi);
    return xingshi + "之杭";
  })
  .then((name) => {
    console.log(name);
  })
  .catch((err) => {
    console.log(err);
  });

// let promise = new Promise((resolve) => {
//   resolve();
// });
// promise
//   .then((res) => {
//     console.log(res);
//     return "asd";
//   })
//   .then((res2) => {
//     console.log("qeqw" + res2);
//   });
</script>


<style lang="less" scoped>
// .playVideo {
//   width: 70px;
//   height: 30px;
//   background-color: lightskyblue;
//   border-radius: 10px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   font-weight: 700;
// }
</style>