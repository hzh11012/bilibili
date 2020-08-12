<template>
  <div class="inter-footer bili-footer">
    <div class="footer-warp">
      <div class="footer-cnt clearfix">
        <ul class="postcards">
          <li>
            <div class="tips">bilibili</div>
            <div class="cards" v-for="(item,index) in liData1" :key="index">
              <a href>{{item.title}}</a>
            </div>
          </li>
          <li>
            <div class="tips">传送门</div>
            <div class="cards" v-for="(item,index) in liData2" :key="index">
              <a href>{{item.title}}</a>
            </div>
          </li>
          <li>
            <div class="block right">
              <a target="_blank" href="//app.bilibili.com/">
                <div class="phone">
                  <div class="pic"></div>
                  <span>手机端下载</span>
                  <div class="code-pop">
                    <div class="code-box code-app">
                      <div class="arrow"></div>
                    </div>
                  </div>
                </div>
              </a>
              <a target="_blank" href="http://weibo.com/bilibiliweb">
                <div class="weibo">
                  <div class="pic"></div>
                  <span>新浪微博</span>
                  <div class="code-pop">
                    <div class="code-box code-weibo">
                      <div class="arrow"></div>
                    </div>
                  </div>
                </div>
              </a>
              <a id="weixin">
                <div class="weixin">
                  <div class="pic"></div>
                  <span>官方微信</span>
                  <div class="code-pop1">
                    <div class="code-box code-weixin">
                      <div class="arrow"></div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </li>
        </ul>
        <p class="tips">
          <span>© 2020 轻念</span>
          <a target="_blank" href="http://www.beian.miit.gov.cn/">豫ICP备18036201号</a>
        </p>
        <p class="tips">免责声明本站所有资源全部收集于互联网,仅供个人建设网站学习使用</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      liData1: [
        { title: "关于我们", href: "" },
        { title: "友情链接", href: "" },
        { title: "哔哩哔哩周边", href: "" },
        { title: "联系我们", href: "" },
        { title: "加入我们", href: "" },
        { title: "官方认证", href: "" },
      ],
      liData2: [
        { title: "帮助中心", href: "" },
        { title: "高级弹幕", href: "" },
        { title: "活动专题页", href: "" },
        { title: "侵权申诉", href: "" },
        { title: "分院帽计划", href: "" },
        { title: "活动中心", href: "" },
        { title: "用户反馈论坛", href: "" },
        { title: "壁纸站", href: "" },
        { title: "名人堂", href: "" },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.bili-footer {
  position: absolute;
  bottom: 0;
  a {
    color: #222;
    cursor: pointer;
  }
}
.inter-footer {
  width: 100%;
  padding-top: 20px;
  color: #99a2aa;
  text-align: center;
  font-size: 12px;
  .footer-warp {
    background-color: #f6f9fa;
    padding-top: 40px;
    padding-bottom: 20px;
  }
  .footer-cnt {
    width: 1160px;
    margin: 0 auto;
    .tips {
      font-size: 14px;
      margin: 6px 0;
      span {
        margin-right: 20px;
      }
    }
  }
  .postcards {
    margin: 0 auto;
    float: left;
    margin-bottom: 30px;
    li {
      box-sizing: content-box;
      float: left;
      text-align: left;
      width: 360px;
      height: 112px;
      line-height: 1;
      border-left: 1px solid #e5e9ef;
      font-size: 14px;
      padding-right: 40px;
      padding-left: 39px;
      &:first-child {
        border-left: 0;
        padding-left: 0 !important;
      }
      &:last-child {
        width: 280px;
        padding-right: 0;
      }
      .tips {
        margin-bottom: 22px;
      }
      .cards {
        width: 120px;
        float: left;
        position: relative;
        margin-bottom: 16px;
      }
      .right {
        position: relative;
        width: 100%;
      }
      .pic {
        position: relative;
        margin-left: 11px;
        width: 60px;
        height: 60px;
      }
      .phone .pic {
        background: url(//static.hdslb.com/images/base/icons.png) no-repeat -1024px -194px;
      }
      .weibo .pic {
        background: url(//static.hdslb.com/images/base/icons.png) no-repeat -1024px -322px;
      }
      .weixin .pic {
        background: url(//static.hdslb.com/images/base/icons.png) no-repeat -1024px -66px;
      }
      a:hover {
        color: #2db0dc;
      }
    }
    .block {
      .phone,
      .weibo,
      .weixin {
        position: relative;
        width: 82px;
        height: 80px;
        float: left;
        span {
          float: left;
          position: absolute;
          width: 82px;
          line-height: 14px;
          bottom: 0;
          left: 0;
          text-align: center;
        }
        .code-pop {
          width: 130px;
          height: 130px;
          background: #fff;
          margin-top: -206px;
          right: -23px;
          position: absolute;
          visibility: hidden;
          opacity: 0;
          transition: 0.2s;
          z-index: 100000;
          .code-box {
            width: 128px;
            height: 128px;
            border: 1px solid #e5e9ef;
          }
          .code-app {
            background: url(//static.hdslb.com/images/base/app-qrcode.png) 50%
              no-repeat;
          }
          .code-weibo {
            background: url(//static.hdslb.com/images/base/weibo-qrcode.png) 50%
              no-repeat;
          }
          .arrow {
            width: 130px;
            height: 141px;
            background: url(//static.hdslb.com/ad-images/wx-arrow.png) bottom
              no-repeat;
          }
        }
        .code-pop1 {
          width: 260px;
          height: 150px;
          margin-top: -226px;
          background: #fff;
          right: -23px;
          position: absolute;
          visibility: hidden;
          opacity: 0;
          transition: 0.2s;
          z-index: 100000;
          .code-box {
            width: 258px;
            height: 148px;
            border: 1px solid #e5e9ef;
          }
          .code-weixin {
            background: url(//static.hdslb.com/ad-images/wx.gif) 50% no-repeat;
          }
          .arrow {
            width: 130px;
            height: 141px;
            background: url(//static.hdslb.com/ad-images/wx-arrow.png) bottom
              no-repeat;
            margin-left: 128px;
            margin-top: 20px;
          }
        }
        &:hover {
          .code-pop,
          .code-pop1 {
            opacity: 1;
            visibility: visible;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 1400px) {
  .inter-footer {
    .footer-cnt {
      width: 980px;
    }
    .postcards {
      li {
        width: 300px;
        padding-right: 25px;
        padding-left: 24px;
        &:last-child {
          width: 280px;
          padding-right: 0;
        }
        .cards {
          width: 100px;
        }
      }
    }
  }
}
</style>