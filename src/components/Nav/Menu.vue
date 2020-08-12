<template>
  <div class="primary-menu">
    <div class="page-tab">
      <ul class="con">
        <li>
          <a href="/">
            <div class="round">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fenqudaohang_shouye" />
              </svg>
            </div>
            <span>首页</span>
          </a>
        </li>
        <li>
          <a href="/">
            <div class="round yel">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-dingdao_dongtai" />
              </svg>
              <div v-if="isdynamic" class="dynamic-updata">
                <img :src="dynamic.face+'@36w_36h_1c_100q.webp'" />
                <i></i>
              </div>
            </div>
            <span>动态</span>
          </a>
        </li>
        <li>
          <a href="/">
            <div class="round blue">
              <svg class="icon paihangbang" aria-hidden="true">
                <use xlink:href="#icon-fenqudaohang_paihangbang" />
              </svg>
            </div>
            <span>排行榜</span>
          </a>
        </li>
        <li>
          <a href="/">
            <div class="round green">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bili-pindao" />
              </svg>
              <div v-if="ischanel" class="dynamic-updata">
                <img :src="chanel.cover+'@36w_36h_1c_100q.webp'" />
                <i></i>
              </div>
            </div>
            <span>频道</span>
          </a>
        </li>
      </ul>
    </div>
    <span class="tab-line"></span>
    <div class="channel-menu">
      <el-popover
        :open-delay="300"
        :close-delay="300"
        v-for="(item,index) in centerList"
        :key="item.num"
        :placement="index%2==0?'top-start':'bottom-start'"
        :disabled="item.disabled"
        trigger="hover"
        :width="item.width"
        popper-class="list-content"
      >
        <div class="container">
          <div class="sub-item">
            <a
              :href="item1.link"
              class="name"
              v-for="(item1,index1) in item.content"
              :key="index1"
            >{{item1.title}}</a>
          </div>
        </div>
        <span slot="reference">
          <div class="item">
            <a :href="item.link" class="name">
              <span>
                {{item.title}}
                <em>{{isonline?(online[item.num]>999?'999+':online[item.num]):'--'}}</em>
              </span>
            </a>
          </div>
        </span>
      </el-popover>

      <span class="nomore" v-for="item in centerList2" :key="item.num">
        <div class="item">
          <a :href="item.link" class="name">
            <span>
              {{item.title}}
              <em>{{isonline?(online[item.num]>999?'999+':online[item.num]):'--'}}</em>
            </span>
          </a>
        </div>
      </span>

      <div class="more">
        <el-popover
          :open-delay="300"
          :close-delay="300"
          placement="bottom-start"
          trigger="hover"
          width="162"
          popper-class="list-content"
        >
          <div class="container">
            <div class="sub-item">
              <a
                :href="item.link"
                class="name"
                v-for="(item,index) in centerList2"
                :key="index"
              >{{item.title}}</a>
            </div>
          </div>
          <span slot="reference">
            <div class="item">
              <a href="javascript:;" class="name">
                <span>更多</span>
                <svg class="icon icon-xiala" aria-hidden="true">
                  <use xlink:href="#icon-xiala" />
                </svg>
              </a>
            </div>
          </span>
        </el-popover>
      </div>
    </div>
    <span class="tab-line none"></span>
    <div class="friendship-link">
      <el-popover
        :open-delay="300"
        :close-delay="300"
        v-for="(item,index) in rightList"
        :key="index"
        :placement="index%2==0?'top-start':'bottom-start'"
        :disabled="item.disabled"
        trigger="hover"
        :width="item.width"
      >
        <div class="container">
          <div class="sub-item">
            <a
              :href="item1.link"
              class="name"
              v-for="(item1,index1) in item.content"
              :key="index1"
            >{{item1.title}}</a>
          </div>
        </div>
        <span slot="reference">
          <div class="item">
            <a :href="item.link" target="_blank" class="name">
              <svg class="icon" aria-hidden="true">
                <use :xlink:href="'#icon-'+item.icon" />
              </svg>
              <span>{{item.title}}</span>
            </a>
          </div>
        </span>
      </el-popover>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dynamic: {}, //动态图片
      isdynamic: false, //是否获取到
      chanel: {}, //频道图片
      ischanel: false, //是否获取到
      online: [], //各分区人数
      isonline: false, //是否获取到
      centerList: [
        {
          title: "动画",
          link: "/",
          num: 1,
          disabled: false,
          width: 162,
          content: [
            { title: "MAD·AMV", link: "/" },
            { title: "MMD·3D", link: "/" },
            { title: "短片·手书·配音", link: "/" },
            { title: "手办·模玩", link: "/" },
            { title: "特摄", link: "/" },
            { title: "综合", link: "/" },
          ],
        },
        {
          title: "番剧",
          link: "/",
          num: 13,
          disabled: false,
          width: 172,
          content: [
            { title: "连载动画", link: "/" },
            { title: "完结动画", link: "/" },
            { title: "资讯", link: "/" },
            { title: "官方延伸", link: "/" },
            { title: "新番时间表", link: "/" },
            { title: "番剧索引", link: "/" },
          ],
        },
        {
          title: "音乐",
          link: "/",
          num: 3,
          disabled: false,
          width: 268,
          content: [
            { title: "原创音乐", link: "/" },
            { title: "翻唱", link: "/" },
            { title: "VOCALOID·UTAU", link: "/" },
            { title: "电音", link: "/" },
            { title: "演奏", link: "/" },
            { title: "MV", link: "/" },
            { title: "音乐现场", link: "/" },
            { title: "音乐综合", link: "/" },
            { title: "音频", link: "/" },
            { title: "说唱", link: "/" },
          ],
        },
        {
          title: "国创",
          link: "/",
          num: 167,
          disabled: false,
          width: 214,
          content: [
            { title: "国产动画", link: "/" },
            { title: "国产原创相关", link: "/" },
            { title: "布袋戏", link: "/" },
            { title: "动态漫·广播剧", link: "/" },
            { title: "资讯", link: "/" },
            { title: "新番时间表", link: "/" },
            { title: "国产动画索引", link: "/" },
          ],
        },
        {
          title: "舞蹈",
          link: "/",
          num: 129,
          disabled: false,
          width: 172,
          content: [
            { title: "宅舞", link: "/" },
            { title: "街舞", link: "/" },
            { title: "明星舞蹈", link: "/" },
            { title: "中国舞", link: "/" },
            { title: "舞蹈综合", link: "/" },
            { title: "舞蹈教程", link: "/" },
          ],
        },
        {
          title: "游戏",
          link: "/",
          num: 4,
          disabled: false,
          width: 240,
          content: [
            { title: "单机游戏", link: "/" },
            { title: "电子竞技", link: "/" },
            { title: "手机游戏", link: "/" },
            { title: "网络游戏", link: "/" },
            { title: "桌游棋牌", link: "/" },
            { title: "GMV", link: "/" },
            { title: "音游", link: "/" },
            { title: "Mugen", link: "/" },
            { title: "游戏赛事", link: "/" },
          ],
        },
        {
          title: "知识",
          link: "/",
          num: 36,
          disabled: false,
          width: 172,
          content: [
            { title: "科学科普", link: "/" },
            { title: "社科人文", link: "/" },
            { title: "财经", link: "/" },
            { title: "校园学习", link: "/" },
            { title: "职业职场", link: "/" },
            { title: "野生技术协会", link: "/" },
          ],
        },
        {
          title: "数码",
          link: "/",
          num: 188,
          disabled: false,
          width: 80,
          content: [
            { title: "手机平板", link: "/" },
            { title: "电脑装机", link: "/" },
            { title: "摄影摄像", link: "/" },
            { title: "影音智能", link: "/" },
          ],
        },
        {
          title: "生活",
          link: "/",
          num: 160,
          disabled: false,
          width: 164,
          content: [
            { title: "搞笑", link: "/" },
            { title: "日常", link: "/" },
            { title: "美食圈", link: "/" },
            { title: "动物圈", link: "/" },
            { title: "手工", link: "/" },
            { title: "绘画", link: "/" },
            { title: "运动", link: "/" },
            { title: "汽车", link: "/" },
            { title: "其他", link: "/" },
          ],
        },
        {
          title: "鬼畜",
          link: "/",
          num: 119,
          disabled: false,
          width: 118,
          content: [
            { title: "鬼畜调教", link: "/" },
            { title: "音MAD", link: "/" },
            { title: "人力VOCALOID", link: "/" },
            { title: "教程演示", link: "/" },
          ],
        },
        {
          title: "时尚",
          link: "/",
          num: 155,
          disabled: false,
          width: 124,
          content: [
            { title: "美妆", link: "/" },
            { title: "服饰", link: "/" },
            { title: "健身", link: "/" },
            { title: "T台", link: "/" },
            { title: "风尚标", link: "/" },
          ],
        },
        {
          title: "资讯",
          link: "/",
          num: 202,
          disabled: false,
          width: 60,
          content: [
            { title: "热点", link: "/" },
            { title: "环球", link: "/" },
            { title: "社会", link: "/" },
            { title: "综合", link: "/" },
          ],
        },
        {
          title: "娱乐",
          link: "/",
          num: 5,
          disabled: false,
          width: 62,
          content: [
            { title: "综艺", link: "/" },
            { title: "明星", link: "/" },
          ],
        },
        {
          title: "影视",
          link: "/",
          num: 181,
          disabled: false,
          width: 84,
          content: [
            { title: "影视杂谈", link: "/" },
            { title: "影视剪辑", link: "/" },
            { title: "短片", link: "/" },
            { title: "预告·资讯", link: "/" },
          ],
        },
        {
          title: "放映厅",
          link: "/",
          num: 177,
          disabled: false,
          width: 68,
          content: [
            { title: "纪录片", link: "/" },
            { title: "电影", link: "/" },
            { title: "电视剧", link: "/" },
          ],
        },
      ], //中间 分区列表1
      centerList2: [
        { title: "搞笑", link: "/", num: 138 },
        { title: "动物圈", link: "/", num: 75 },
        { title: "美食圈", link: "/", num: 76 },
        { title: "单机游戏", link: "/", num: 17 },
        { title: "VLOG", link: "/" },
      ], //中间 分区列表2
      rightList: [
        { title: "专栏", link: "/", icon: "read", disabled: true },
        {
          title: "直播",
          link: "/",
          icon: "live",
          width: 112,
          disabled: false,
          content: [
            { title: "全部", link: "/" },
            { title: "游戏", link: "/" },
            { title: "手游", link: "/" },
            { title: "娱乐", link: "/" },
            { title: "电台", link: "/" },
            { title: "绘画", link: "/" },
          ],
        },
        { title: "活动", link: "/", icon: "activity", disabled: true },
        { title: "课堂", link: "/", icon: "zhishi", disabled: true },
        { title: "小黑屋", link: "/", icon: "blackroom", disabled: true },
        { title: "音乐PLUS", link: "/", icon: "musicplus", disabled: true },
      ], //右间 link列表
    };
  },
  methods: {
    getChanel() {
      this.$http.get("/api/x/web-interface/web/channel/red").then((res) => {
        this.chanel = res.data.data;
        if (this.chanel.cover) {
          this.ischanel = true;
        }
      });
    },
    getDynamic() {
      this.$http
        .get(
          "/vc/dynamic_svr/v1/dynamic_svr/web_homepage?from=header&video_offset=0&article_offset=0&alltype_offset=0"
        )
        .then((res) => {
          this.dynamic = res.data.data.newest_dynamic_owner;
          if (this.dynamic) {
            this.isdynamic = true;
          }
        });
    },
    getOnline() {
      this.$http.get("/api/x/web-interface/online").then((res) => {
        this.online = res.data.data.region_count;
        this.isonline = true;
      });
    },
  },
  created() {
    this.getChanel();
    this.getOnline();
    this.getDynamic();
  },
};
</script>

<style lang="less" scoped>
.primary-menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  width: 100%;
}
.page-tab {
  display: flex;
  align-items: center;
  .con {
    display: flex;
    li {
      cursor: pointer;
      width: 66px;
      height: 68px;
      text-align: center;
      font-size: 14px;
      white-space: nowrap;
      border: 1px solid #fff;
      border-radius: 16px;
      transition: all 0.3s;
      .round {
        position: relative;
        width: 36px;
        height: 36px;
        background: #ff5c7c;
        border-radius: 36px;
        line-height: 36px;
        text-align: center;
        margin: 0 auto 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        .dynamic-updata {
          position: absolute;
          width: 36px;
          height: 36px;
          left: 0;
          top: 0;
          img {
            position: absolute;
            width: 36px;
            height: 36px;
            left: 0;
            top: 0;
            border-radius: 50%;
          }
          i {
            position: absolute;
            right: -2px;
            top: -2px;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #fa5a57;
            border: 2px solid #fff;
          }
        }
      }
      .yel {
        background: #fcba2a;
      }
      .blue {
        background: #00a1d6;
      }
      .green {
        background: #6dc781;
      }
      .icon {
        font-size: 26px;
      }
    }
  }
}
.tab-line {
  display: inline-block;
  height: 46px;
  border-left: 1px solid #e7e7e7;
  margin: 0 20px;
}
.tab-line.none {
  margin: 0 24px 0 0px;
}
a {
  color: #212121;
  transition: color 0.3s;
  &:hover {
    color: #00a1d6;
  }
}
.channel-menu {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 68px;
  flex: 1;
  .item {
    cursor: pointer;
    display: flex;
    height: 34px;
    .name {
      display: flex;
      align-items: center;
      white-space: nowrap;
      font-size: 14px;
      &:hover {
        .icon-xiala {
          color: #00a1d6;
        }
      }
      em {
        font-style: normal;
        font-size: 12px;
        display: inline-block;
        background: #73c9e5;
        border-radius: 2px;
        color: #fff;
        margin-left: 1px;
        transform: scale(0.85);
        width: 32px;
        text-align: center;
      }
      .icon-xiala {
        margin-left: 5px;
        font-size: 16px;
        color: #212121;
        transition: color 0.3s;
      }
    }
  }
  .more {
    display: none;
  }
}
.friendship-link {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 68px;
  width: 289px;
  .item {
    display: flex;
    height: 34px;
    .name {
      display: flex;
      align-items: center;
      white-space: nowrap;
      font-size: 14px;
      .icon {
        width: 1.8em;
        height: 1.8em;
        vertical-align: middle;
        fill: currentColor;
        overflow: hidden;
      }
      span {
        margin-left: 4px;
      }
    }
  }
}
.container {
  display: flex;
}
.sub-item {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  max-height: 148px;
  .name {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    padding: 10px 13px;
    height: 37px;
  }
}

@media screen and (max-width: 1870px) {
  .page-tab {
    .con {
      li {
        width: 58px;
      }
    }
  }
  .friendship-link {
    width: 242px;
  }
}
@media screen and (max-width: 1654px) {
  .tab-line.none {
    margin: 0 12px 0 0;
  }
  .tab-line {
    margin: 0 8px;
  }
  .page-tab {
    .con {
      li {
        width: 50px;
      }
    }
  }
  .friendship-link {
    width: 220px;
  }
}
@media screen and (max-width: 1438px) {
  .tab-line {
    margin: 0 8px;
  }
  .channel-menu {
    .nomore {
      display: none;
    }
    .more {
      display: block;
    }
  }
}
</style>