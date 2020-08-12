<template>
  <el-popover
    :open-delay="300"
    :close-delay="300"
    @show="show"
    @hide="isShow=true"
    placement="bottom"
    width="252"
    trigger="hover"
  >
    <div class="user-container">
      <a
        href="/"
        target="_blank"
        class="avatar"
        :class="$store.state.userinfo.pendant!=''?'has-decorate':''"
      >
        <img
          v-if="$store.state.userinfo.pendant.image!=''"
          :src="$store.state.userinfo.pendant.image+'@91w_92h_1c_100q.webp'"
          class="avatar-decorate"
        />
        <img :src="$store.state.userinfo.face+'@62w_63h_1c_100q.webp'" class="avatar-img" />
        <svg v-if="$store.state.userinfo.vipStatus" class="icon icon-vip" aria-hidden="true">
          <use xlink:href="#icon-vip" />
        </svg>
      </a>
      <p
        style="padding-top: 52px;"
        :style="'color:'+$store.state.userinfo.vip_nickname_color"
        class="nickname"
      >{{$store.state.userinfo.uname}}</p>
      <a
        href="/"
        target="_blank"
        class="vip"
        v-if="$store.state.userinfo.vipType!=0"
      >{{$store.state.userinfo.vip_label.text}}</a>
      <div class="level-content">
        <div class="level-info">
          <span class="grade">等级 {{$store.state.userinfo.level_info.current_level}}</span>
          <span
            v-if="$store.state.userinfo.level_info.current_level!=0"
            class="progress"
          >{{$store.state.userinfo.level_info.current_exp +' / '+ $store.state.userinfo.level_info.next_exp}}</span>
          <a v-else href="/" target="_blank" class="hint">答题转正直升Lv 1</a>
        </div>
        <a href="/" target="_blank" class="level-link">
          <div class="level-bar">
            <div
              class="level-progress"
              :style="'width:'+($store.state.userinfo.level_info.current_exp/$store.state.userinfo.level_info.next_exp*100)+'%'"
            ></div>
          </div>
        </a>
      </div>
      <div class="coins">
        <div class="coins-container">
          <div class="info">
            <a href="/" target="_blank" title="硬币">
              <svg class="icon icon-yingbi" aria-hidden="true">
                <use xlink:href="#icon-yingbi" />
              </svg>
              <span class="money">{{$store.state.userinfo.money}}</span>
            </a>
            <a href="/" target="_blank" title="B币">
              <svg class="icon icon-b" aria-hidden="true">
                <use xlink:href="#icon-b" />
              </svg>
              <span class="money">{{$store.state.userinfo.wallet.bcoin_balance}}</span>
            </a>
          </div>
          <div class="contact">
            <a href="/" target="_blank" class="email">
              <svg
                class="icon icon-email"
                :style="$store.state.userinfo.email_verified?'color: #00a1d6;':''"
                aria-hidden="true"
              >
                <use xlink:href="#icon-email" />
              </svg>
              <span class="email-mark" v-if="!$store.state.userinfo.email_verified"></span>
              <span
                class="contact-tips email-tips"
              >{{$store.state.userinfo.email_verified?'已绑定':'前去绑定邮箱'}}</span>
            </a>
            <a href="/" target="_blank" class="phone">
              <svg
                class="icon icon-phone"
                :style="$store.state.userinfo.mobile_verified?'color: #00a1d6;':''"
                aria-hidden="true"
              >
                <use xlink:href="#icon-shouji" />
              </svg>
              <span class="phone-mark" v-if="!$store.state.userinfo.mobile_verified"></span>
              <span
                class="contact-tips phone-tips"
              >{{$store.state.userinfo.mobile_verified?'已绑定':'前去绑定手机'}}</span>
            </a>
          </div>
        </div>
      </div>
      <div class="counts">
        <a href="/" target="_blank" class="count-item">
          <div class="item-key">关注</div>
          <div class="item-value">
            <span class="item-num">{{stat.following!=0?stat.following:'--'}}</span>
          </div>
        </a>
        <a href="/" target="_blank" class="count-item">
          <div class="item-key">粉丝</div>
          <div class="item-value">
            <span class="item-num">{{stat.follower!=0?stat.follower:'--'}}</span>
          </div>
        </a>
        <a href="/" target="_blank" class="count-item">
          <div class="item-key">动态</div>
          <div class="item-value">
            <span class="item-num">{{stat.dynamic_count!=0?stat.dynamic_count:'--'}}</span>
          </div>
        </a>
      </div>
      <div class="links">
        <a
          :href="item.link"
          target="_blank"
          class="link-item"
          v-for="(item,index) in links"
          :key="index"
        >
          <div class="link-title">
            <svg class="icon icon-dingdao" aria-hidden="true">
              <use :xlink:href="'#icon-'+item.icon" />
            </svg>
            {{item.title}}
          </div>
        </a>
      </div>
      <div class="logout">
        <a @click="logout">
          <svg class="icon icon-dingdao" aria-hidden="true">
            <use xlink:href="#icon-dingdao_dengchu" />
          </svg>
          退出
        </a>
      </div>
    </div>
    <span slot="reference" class="txt name">
      <img
        :style="isShow?'opacity: 1;':'opacity: 0;'"
        class="login-face"
        :src="$store.state.userinfo.face"
      />
    </span>
  </el-popover>
</template>

<script>
export default {
  data() {
    return {
      isShow: true,
      stat: "", //用户关注粉丝动态 数
      links: [
        { title: "个人中心", icon: "dingdao_gerenzhongxin", link: "/" },
        { title: "投稿管理", icon: "dingdao_tougaoguanli", link: "/" },
        { title: "B币钱包", icon: "dingdao_qianbao", link: "/" },
        { title: "订单中心", icon: "dingdao_dingdanzhongxin", link: "/" },
        { title: "直播中心", icon: "dingdao_zhibozhongxin", link: "/" },
        { title: "我的课程", icon: "dingdao_cheese", link: "/" },
      ],
    };
  },
  methods: {
    show() {
      this.isShow = false;
      if (this.stat == "") {
        this.$http.get("/api/x/web-interface/nav/stat").then((res) => {
          this.stat = res.data.data;
        });
      }
    },
    logout() {
      this.$emit("logout");
    },
  },
};
</script>

<style lang="less" scoped>
.login-face {
  transition: all 0.2s;
  &:hover {
    opacity: 0;
  }
}
.user-container {
  position: relative;
  min-height: 510px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.avatar {
  cursor: pointer;
  position: absolute;
  z-index: 2;
  top: -36px;
  width: 68px;
  height: 68px;
  border-radius: 50%;
  .avatar-decorate {
    position: absolute;
    top: -21px;
    left: -16px;
  }
  .avatar-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .icon-vip {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 20px;
    height: 20px;
  }
}
.nickname {
  font-weight: 600;
  color: #212121;
  text-align: center;
  font-size: 14px;
}
.vip {
  margin-top: 4px;
  width: 66px;
  text-align: center;
  background-color: #fb7299;
  color: #fff;
  font-size: 12px;
  border-radius: 2px;
}
.has-decorate {
  top: -30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.level-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 100%;
  padding: 0 20px;
}
.level-info {
  margin: 20px 0 5px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .grade {
    font-size: 14px;
    color: #212121;
  }
  .progress {
    font-size: 12px;
    color: #999;
  }
  .hint {
    font-size: 12px;
    color: #00a1d6;
    &:hover {
      text-decoration: underline;
    }
  }
}
.level-link {
  height: 10px;
  width: 212px;
}
.level-bar {
  width: 212px;
  height: 2px;
  background-color: #f4f4f4;
  position: relative;
  margin: 4px 0;
  .level-progress {
    position: absolute;
    background: #f3cb85;
    border-radius: 2px;
    width: 80%;
    height: 2px;
    top: 0;
    left: 0;
  }
}
.coins {
  width: 100%;
  border-bottom: 1px solid #f4f4f4;
  padding: 14px 18px;
  color: #212121;
  .coins-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 20px;
  }
  .info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    a {
      display: flex;
      align-items: center;
      &:hover {
        .money {
          color: #00a1d6;
        }
      }
    }
    .money {
      margin: 0 20px 0 8px;
    }
  }
  .contact {
    display: flex;
    align-items: center;
    .contact-tips {
      font-size: 12px;
      padding: 0 6px;
      height: 20px;
      line-height: 20px;
      border: 1px solid #ccc;
      border-radius: 4px;
      position: absolute;
      white-space: nowrap;
      background-color: #fff;
      color: #222;
      z-index: 10;
    }
    .email-tips {
      display: none;
      right: 32px;
      top: 0;
      &::after {
        content: "";
        position: absolute;
        width: 8px;
        height: 8px;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAA2BAMAAAAIUcVlAAAALVBMVEUAAADQ0NDOzs7MzMzMzMzMzMzMzMzMzMzMzMzMzMz////09PTt7e3m5ube3t7aN2g1AAAACnRSTlMA/PLhbEktF8nGEiCq/wAAAGtJREFUGNNjeFnAwMCw1gxIrDoUACRWi4AJMBcq8aKAgXjwatWqdQy9q1bdZCg+tcacgU17UwIDQ6AoUIbFgYFUwN4HJJJvMTCw6qxiYHDcBSHAXLAESMk8UgyEOAPsILDTII6cu2rVDbDDAfAAJuuGgkdmAAAAAElFTkSuQmCC);
        right: -8px;
        top: 5px;
      }
    }
    .phone-tips {
      display: none;
      left: 32px;
      top: 0;
      &::after {
        content: "";
        position: absolute;
        width: 8px;
        height: 8px;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAA2BAMAAAAIUcVlAAAALVBMVEUAAADQ0NDOzs7MzMzMzMzMzMzMzMzMzMzMzMzMzMz////09PTt7e3m5ube3t7aN2g1AAAACnRSTlMA/PLhbEktF8nGEiCq/wAAAGtJREFUGNNjeFnAwMCw1gxIrDoUACRWi4AJMBcq8aKAgXjwatWqdQy9q1bdZCg+tcacgU17UwIDQ6AoUIbFgYFUwN4HJJJvMTCw6qxiYHDcBSHAXLAESMk8UgyEOAPsILDTII6cu2rVDbDDAfAAJuuGgkdmAAAAAElFTkSuQmCC);
        left: -8px;
        background-repeat: no-repeat;
        background-position: 0 -31px;
        top: 5px;
      }
    }
    .email,
    .phone {
      position: relative;
      width: 22px;
      height: 20px;
    }
    .phone {
      &:hover {
        .phone-tips {
          display: block;
        }
      }
    }
    .email {
      &:hover {
        .email-tips {
          display: block;
        }
      }
    }
    .email-mark,
    .phone-mark {
      position: absolute;
      width: 6px;
      height: 6px;
      background: #fa5a57;
      border-radius: 50%;
      left: 15px;
      top: 3px;
    }
  }
  .icon-yingbi {
    width: 20px;
    height: 20px;
    color: rgb(0, 161, 214);
  }
  .icon-b {
    width: 20px;
    height: 20px;
    color: rgb(255, 174, 0);
  }
  .icon-email,
  .icon-phone {
    width: 21px;
    height: 21px;
    color: silver;
  }
}
.counts {
  height: 56px;
  width: 100%;
  border-bottom: 1px solid #f4f4f4;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.count-item {
  text-align: center;
  flex: 1;
  &:hover {
    .item-key {
      color: #00a1d6;
    }
    .item-value {
      color: #00a1d6;
    }
  }
  .item-key {
    font-size: 12px;
    color: #999;
  }
  .item-value {
    font-size: 14px;
    color: #212121;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    height: 20px;
  }
}
.links {
  width: 100%;
  border-bottom: 1px solid #f4f4f4;
  padding: 7px 0;
  .link-item {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.3s ease;
    padding: 10px 23px;
    &:hover {
      background-color: #f4f4f4;
    }
  }
  .link-title {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #212121;
    line-height: 16px;
  }
}
.logout {
  width: 100%;
  padding: 7px 0;
  a {
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: all 0.3s ease;
    padding: 8px 23px;
    &:hover {
      background-color: #f4f4f4;
    }
    .icon {
      margin-left: 2px;
      margin-right: 5px;
    }
  }
}
.icon-dingdao {
  font-size: 16px;
  color: #979797;
  margin-right: 7px;
}
</style>