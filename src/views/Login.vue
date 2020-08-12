<template>
  <div class="login bottom-filling">
    <inter-header :banner='false' class="inter-header"></inter-header>
    <div>
      <div class="top-banner">
        <img src="//s1.hdslb.com/bfs/static/passport/static/img/rl_top.35edfde.png" alt />
      </div>
      <div class="title-line">
        <span class="title">登录</span>
      </div>
      <div class="login-box clearfix">
        <div class="login-left">
          <div class="qrcode-login">
            <div class="qrcode-con">
              <i class="tv-icon"></i>
              <div class="qrcode-box">
                <div class="qrcode-tips" :class="timer<180000?'mouseenter':''"></div>
                <div class="qrcode-img">
                  <canvas id="canvas"></canvas>
                </div>
                <div class="status" v-if="timer==180000">
                  <div class="overdue" @click="getQrcodeUrl">点击刷新</div>
                </div>
              </div>
            </div>
            <div class="qrcode-footer">
              <p class="status-txt" v-if="timer<180000">扫描二维码登录</p>
              <p class="status-txt" v-if="timer==180000">二维码已失效</p>
              <p class="app-link">
                请使用
                <a href="/" target="_blank">哔哩哔哩客户端</a>
                <br />扫码登录
                <br />或扫码下载APP
              </p>
            </div>
          </div>
        </div>
        <div class="line"></div>
        <div class="login-right">
          <div class="form-login" id="yzm">
            <div class="input-box">
              <div>
                <div class="type-tab">
                  <span :class="active==0?'active':''" @click="active=0">密码登录</span>
                  <span :class="active==1?'active':''" @click="active=1">短信登录</span>
                </div>
                <div v-show="active==0">
                  <div class="username status-box">
                    <login-input
                      type="text"
                      placeholder="你的手机号/邮箱"
                      maxlength="50"
                      autocomplete="off"
                      v-model="username"
                      @getInputValue="checkusername"
                      :showError="userError"
                    ></login-input>
                    <span class="status" :class="userError?'error':''"></span>
                    <div class="text clearfix">
                      <p class="tips" id="userErrorTips" v-text="userError?'请输入注册时用的邮箱或者手机号呀':''"></p>
                    </div>
                  </div>
                  <div class="password status-box">
                    <login-input
                      type="password"
                      placeholder="密码"
                      v-model="password"
                      @getInputValue="checkpassword"
                      :showError="pwdError"
                    ></login-input>
                    <span class="status" :class="pwdError?'error':''"></span>
                    <div class="text clearfix">
                      <p class="tips" id="pwdErrorTips" v-text="pwdError?'喵，你没输入密码么？':''"></p>
                    </div>
                  </div>
                </div>
                <div v-show="active==1">
                  <div class="status-box">
                    <el-input
                      placeholder="填写常用手机号"
                      maxlength="16"
                      v-model="phone"
                      class="input-with-select"
                      @input="checkphone();phone=phone.replace(/[^\d]/g,'')"
                      :class="phoneError?'el-error':''"
                    >
                      <el-select v-model="value" value-key="id" slot="prepend" placeholder="请选择国家">
                        <el-option
                          v-for="item in options.common"
                          :key="item.id"
                          :label="item.cname"
                          :value="item"
                        ></el-option>
                        <el-option label="--其它--" value="null" disabled></el-option>
                        <el-option
                          v-for="item in options.others"
                          :key="item.id"
                          :label="item.cname"
                          :value="item"
                        ></el-option>
                      </el-select>
                    </el-input>
                    <span class="status" :class="phoneError?'error':''"></span>
                  </div>
                  <div class="text clearfix">
                    <p class="tips" id="phoneErrorTips"></p>
                  </div>
                  <div class="status-box">
                    <el-input
                      placeholder="请输入短信验证码"
                      v-model="msg"
                      class="input-with-select"
                      :class="msgError?'el-error':''"
                    ></el-input>
                    <el-button class="captcha-buttom" type="primary" id="msgBtn">获取验证码</el-button>
                    <span class="status" :class="msgError?'error':''"></span>
                  </div>
                  <div class="text clearfix">
                    <p class="tips" id="msgErrorTips"></p>
                  </div>
                </div>
                <div class="remember">
                  <div class="remember-tool">
                    <el-checkbox v-model="isRemember">
                      记住我
                      <span>不是自己的电脑上不要勾选此项</span>
                    </el-checkbox>
                    <div>
                      <a href="/" target="_blank" class="forget-password">忘记密码?</a>
                      <a href="/" target="_blank" class="not-checkout">无法验证?</a>
                    </div>
                  </div>
                </div>
                <div class="btn-box">
                  <a class="btn btn-login" id="loginBtn">登录</a>
                  <a href="/" class="btn btn-reg">注册</a>
                </div>
                <div class="sns">
                  <a class="btn weibo">微博账号登录</a>
                  <a class="btn qq">QQ账号登录</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p class="bottom-tips">
        <span>登录即代表你同意</span>
        <a href="/" target="_blank">用户协议</a>
        <span>和</span>
        <a href="/" target="_blank">隐私政策</a>
      </p>
    </div>
    <inter-footer></inter-footer>
  </div>
</template>

<script>
import QRCode from "qrcode";
import qs from "qs";
import interHeader from "../components/InterHeader.vue";
import interFooter from "../components/InterFooter.vue";
import loginInput from "../components/Input.vue";
export default {
  data() {
    return {
      loginInfo: {}, //二维码url信息
      timer: 0, //二维码定时器
      active: 0, //切换密码登录还是短信登录
      username: "",
      password: "",
      rsa: "", //加密后的密码
      phone: "",
      Rphone: "", //当前获取验证码的手机号
      msg: "",
      userError: false, //用户名检验错误
      pwdError: false, //密码检验错误
      phoneError: false, //手机号检验错误
      msgError: false, //验证码检验错误
      value: { cname: "中国大陆", country_id: "86", id: 1 }, //下拉列表 选中的地区
      options: {},
      isRemember: false, //是否记住我
      plat: {}, //b站返回的 极验的challenge 以及 key值
      msgTimer: 0, //短信计时器 改变按钮样式
    };
  },
  methods: {
    //获取二维码url
    getQrcodeUrl() {
      this.timer = 0;
      this.$http.get("/login/qrcode/getLoginUrl").then((res) => {
        this.loginInfo = res.data.data;
        this.getQrcode();
      });

      let interval = setInterval(() => {
        this.timer += 3000;
        this.getLoginInfo();
        if (this.timer == 180000) {
          clearInterval(interval);
        }
      }, 3000);
    },
    //利用qrcode插件将二维码url转成二维码
    getQrcode() {
      let canvas = document.getElementById("canvas");
      QRCode.toCanvas(
        canvas,
        this.loginInfo.url,
        { width: 140, margin: 0 },
        function (error) {
          if (error) console.error(error);
          console.log("success!");
        }
      );
    },
    //每三秒检测一次是否扫描二维码
    getLoginInfo() {
      this.$http({
        url: "/login/qrcode/getLoginInfo",
        method: "POST",
        crossDomain: true,
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        withCredentials: true,
        data: qs.stringify({
          oauthKey: this.loginInfo.oauthKey,
        }),
      }).then((res) => {
        if (res.data.status) {
          setTimeout(() => {
            this.$router.push("/");
          }, 1000);
        }
      });
    },
    //获取全球地区
    getLocal() {
      this.$http.get("/login/web/generic/country/list").then((res) => {
        this.options = res.data.data;
      });
    },
    //检验用户名
    checkusername() {
      if (this.username == "") {
        this.userError = true;
      } else {
        this.userError = false;
        document.getElementById("userErrorTips").innerHTML = "";
      }
    },
    //检验手机号
    checkphone() {
      if (this.phone == "") {
        document.getElementById("phoneErrorTips").innerHTML =
          "手机号不能为空哦";
        this.phoneError = true;
      } else {
        document.getElementById("phoneErrorTips").innerHTML = "";
        this.phoneError = false;
      }
    },
    //检验短信验证码
    checkmsg() {
      if (this.msg == "") {
        this.msgError = true;
      } else {
        document.getElementById("msgErrorTips").innerHTML = "";
        this.msgError = false;
      }
    },
    //检验密码
    checkpassword() {
      if (this.password == "") {
        this.pwdError = true;
      } else {
        this.pwdError = false;
        document.getElementById("pwdErrorTips").innerHTML = "";
      }
    },
    //获取加密公钥及密码盐值1（web端）
    getkey(validate, seccode) {
      this.$http.get("/login/login?act=getkey").then((res) => {
        let rsa = this.$encryptedData(
          res.data.key,
          res.data.hash + this.password
        );
        this.rsa = rsa;
        this.loginBypwd(validate, seccode);
      });
    },
    //账号密码登录
    loginBypwd(validate, seccode) {
      this.$http({
        url: "/login/web/login/v2",
        method: "POST",
        crossDomain: true,
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        withCredentials: true,
        data: qs.stringify({
          captchaType: 6,
          username: this.username,
          password: this.rsa,
          keep: true,
          key: this.plat.key,
          challenge: this.plat.challenge,
          validate: validate,
          seccode: seccode,
        }),
      }).then((res) => {
        if (res.data.code == 0) {
          this.$router.push("/");
        } else {
          this.getPlat();
          let pwdErrorTips = document.getElementById("pwdErrorTips");
          pwdErrorTips.innerHTML = res.data.message;
        }
      });
    },
    //获取短信验证码
    getMsg(validate, seccode) {
      this.$http({
        url: "/login/web/sms/general/v2/send",
        method: "POST",
        crossDomain: true,
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        withCredentials: true,
        data: qs.stringify({
          tel: this.phone,
          cid: this.value.id,
          type: 21,
          captchaType: 6,
          key: this.plat.key,
          challenge: this.plat.challenge,
          validate: validate,
          seccode: seccode,
        }),
      }).then((res) => {
        if (res.data.code != 0) {
          document.getElementById("msgErrorTips").innerHTML = res.data.message;
        } else {
          document.getElementById("msgErrorTips").innerHTML =
            "验证码已发送，5分钟内有效";
        }
        let msgBtn = document.getElementById("msgBtn");
        msgBtn.setAttribute(
          "style",
          "color: rgba(0,0,0,.25)!important; background-color: #f5f5f5!important;border-color: #d9d9d9!important;pointer-events: none;"
        );
        let interval = setInterval(() => {
          this.msgTimer += 1000;
          msgBtn.innerHTML = 60 - this.msgTimer / 1000 + "s后重试";
          if (this.msgTimer == 60000) {
            clearInterval(interval);
            msgBtn.setAttribute(
              "style",
              "color: #fff !important;background-color: #00a1d6 !important;border-color: #00a1d6 !important;"
            );
            this.msgTimer = 0;
            msgBtn.innerHTML = "重新获取验证码";
          }
        }, 1000);
      });
    },
    //短信登录
    loginBymsg() {
      this.$http({
        url: "/login/web/login/rapid",
        method: "POST",
        crossDomain: true,
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        withCredentials: true,
        data: qs.stringify({
          cid: this.value.id,
          tel: this.phone,
          smsCode: this.msg,
        }),
      }).then((res) => {
        if (res.data.code == 0) {
          this.$router.push("/");
        } else {
          document.getElementById("msgErrorTips").innerHTML = res.data.message;
        }
      });
    },
    getPlat() {
      let that = this;
      this.$http.get("/login/web/captcha/combine?plat=6").then((res) => {
        this.plat = res.data.data.result;
        initGeetest(
          {
            gt: this.plat.gt,
            challenge: this.plat.challenge,
            offline: false, // 表示用户后台检测极验服务器是否宕机
            new_captcha: true, // 用于宕机时表示是新验证码的宕机
            product: "bind",
            https: true,
          },
          function (captchaObj) {
            captchaObj
              .onReady(function () {
                //验证码ready之后才能调用verify方法显示验证码
              })
              .onSuccess(function () {
                //your code
                var result = captchaObj.getValidate();
                if (that.active == 0) {
                  //密码登录
                  that.getkey(result.geetest_validate, result.geetest_seccode);
                } else {
                  //短信登录
                  that.getMsg(result.geetest_validate, result.geetest_seccode);
                }
                captchaObj.destroy();
              })
              .onError(function () {
                //your code
              });
            // 登录按钮提交事件
            document
              .getElementById("loginBtn")
              .addEventListener("click", function () {
                let phoneErrorTips = document.getElementById("phoneErrorTips");
                let msgErrorTips = document.getElementById("msgErrorTips");
                if (that.active == 0) {
                  if (that.username != "" && that.password != "") {
                    captchaObj.verify(); //显示验证码
                  } else {
                    if (that.username == "" && that.password == "") {
                      that.userError = true;
                      that.pwdError = true;
                    } else if (that.password == "") {
                      that.pwdError = true;
                    } else if (that.username == "") {
                      that.userError = true;
                    }
                  }
                } else {
                  if (that.phone != "" && that.msg != "") {
                    if (that.Rphone == that.phone) {
                      that.loginBymsg();
                    } else {
                      phoneErrorTips.innerHTML =
                        "手机号与验证码不匹配，请重新确认";
                    }
                  } else {
                    if (that.phone == "" && that.msg == "") {
                      that.phoneError = true;
                      that.msgError = true;
                      phoneErrorTips.innerHTML =
                        "手机号与验证码不匹配，请重新确认";
                      msgErrorTips.innerHTML = "短信验证码不能为空";
                    } else if (that.msg == "") {
                      that.msgError = true;
                      msgErrorTips.innerHTML = "短信验证码不能为空";
                    } else if (that.phone == "") {
                      that.phoneError = true;
                      phoneErrorTips.innerHTML =
                        "手机号与验证码不匹配，请重新确认";
                    }
                  }
                }
              });
            // 获取验证码按钮提交事件
            document
              .getElementById("msgBtn")
              .addEventListener("click", function () {
                let phoneErrorTips = document.getElementById("phoneErrorTips");
                if (that.phone != "") {
                  if (that.phone.length == 11) {
                    that.Rphone = that.phone;
                    captchaObj.verify(); //显示验证码
                  } else {
                    that.phoneError = true;
                    phoneErrorTips.innerHTML = "手机号格式错误";
                  }
                } else {
                  that.phoneError = true;
                  phoneErrorTips.innerHTML = "手机号不能为空哦";
                }
              });
          }
        );
      });
    },
  },
  created() {
    this.getQrcodeUrl();
    this.getLocal();
    this.getPlat();
  },
  components: {
    interHeader,
    QRCode,
    loginInput,
    interFooter,
  },
};
</script>

<style lang="less" scoped>
.inter-header {
  height: 57px;
  /deep/ a {
    color: #212121 !important;
    text-shadow: none !important;
  }
  /deep/ .txt {
    color: #212121 !important;
    text-shadow: none !important;
  }
  /deep/ .icon {
    color: #00a1d6;
  }
}
.top-banner {
  background: #00a0d8;
  height: 86px;
  text-align: center;
  margin-bottom: 20px;
}
.title-line {
  width: 980px;
  height: 28px;
  margin: 0 auto;
  border-bottom: 1px solid #ddd;
  margin-bottom: 28px;
  text-align: center;
  .title {
    height: 56px;
    line-height: 56px;
    margin: 0 auto;
    padding: 0 20px;
    font-size: 38px;
    background: #fff;
    text-align: center;
  }
}
.login-box {
  position: relative;
  width: 980px;
  margin: 0 auto;
  .login-left {
    float: left;
    width: 489px;
  }
  .line {
    float: left;
    border-right: 1px solid #ddd;
    height: 300px;
    margin-top: 28px;
  }
  .login-right {
    float: left;
    padding-left: 45px;
    width: 490px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .type-tab {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
  }
  .type-tab > span {
    cursor: pointer;
    font-size: 14px;
    color: #555;
    letter-spacing: 0;
    margin-right: 20px;
  }
  .type-tab > span.active {
    color: #02a7de;
  }
  .captcha-buttom {
    width: 130px;
    height: 36px;
    position: absolute;
    right: 2px;
    top: 2px;
    padding: 0 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.qrcode-login {
  position: relative;
  width: 480px;
  .qrcode-con {
    padding-top: 72px;
    .tv-icon {
      position: absolute;
      width: 70px;
      height: 70px;
      left: 160px;
      top: 10px;
      background: url(http://i0.hdslb.com/bfs/static/e6f2388d454c82004905753802e9cfe709d80d08.png)
        no-repeat;
    }
    .qrcode-box {
      width: 140px;
      height: 140px;
      margin: 0 auto;
      background: #ddd;
      position: relative;
      .qrcode-tips {
        z-index: 10;
        position: absolute;
        width: 480px;
        height: 192px;
        top: -50px;
        left: 50%;
        margin-left: -240px;
        background: url(//s1.hdslb.com/bfs/static/passport/static/img/qr-tip.3a21a48.png)
          no-repeat;
        background-size: cover;
        background-color: #fff;
        opacity: 0;
        -webkit-transition: opacity 0.5s;
        -o-transition: opacity 0.5s;
        -moz-transition: opacity 0.5s;
        transition: opacity 0.5s;
      }
      .mouseenter {
        &:hover {
          opacity: 1;
        }
      }
      .qrcode-img {
        width: 140px;
        height: 140px;
        background: url(//s1.hdslb.com/bfs/static/passport/static/img/loadTV.99606e2.gif)
          50% no-repeat;
      }
      .status {
        position: absolute;
        z-index: 20;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: hsla(0, 0%, 100%, 0.8);
        .overdue {
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAABLCAYAAADpqX6aAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjRBNzBCMDQwNTQ4MjExRTU4RDEzQTlFMjZCMEJCMkEyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjRBNzBCMDQxNTQ4MjExRTU4RDEzQTlFMjZCMEJCMkEyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NEE3MEIwM0U1NDgyMTFFNThEMTNBOUUyNkIwQkIyQTIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NEE3MEIwM0Y1NDgyMTFFNThEMTNBOUUyNkIwQkIyQTIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6fG4sXAAAD5klEQVR42uyaTUhVQRTHfZGakZURlmCblJRILaWIIitcZGAkYQsXFdXGNDMLXKSFfUGBQl8mFARWtNFSWhWECZGlZVgS1cIirExdaH6UWvr6HzoPDtN9va+57/XwHvjxZu7Mmfk7d+7MmUGb3W4PCRabFhJEZom1xAab2OmuKthq3vlVkH1XwhQZWU02H6wH6WAZ2AK+B0psFMjiN1XDz7aBDQwJtPHzI94I1SE2BhwDO8FMFnEP9PCzrUr9SXA7EKtBLngD8lhoCP+WcLqcvheD/lrY129iy8AtMEc8GwQ3wWvOt4MGA9+57FvqD7E0kidFfhQcBbFgB7gmyuToPgE/Rdkpbss0scngvMh3g7Xc8ZBB/Vc8R2kuZ3PdPlFObaWYJfYcCOM0CdgEXrjwOQGqQS94BjaDES6jtirNEJsGNoo8rQIdbvh18HLlsDaeNg7LAIm6xcoveABc8sB3XMlX8fLmsN26xa4T6Xow5sOyR+Lviny6brHxIt2uYdd77qRtLWKjRLpHg9hBkZ6nW2y/SEdqCm6MhGsR+0GkV2gQmyTSnbrFPhbpHLHeemOhHJUZta1FbJ1IR4O9Snm4B23tU6ZBnW6xj0CryJ9RvuIikOnmqnJa5Fu5be3bLQma4PRs8BDEgQhQDI678Ke698Eszk+wnymxwVMOWhwWy+vldbAQrOITg9EczeetdrESeTWbGSLS6F1W4tMcpdwm9n0KVN7zFivj34tuvAmfxVJ8WgAOOtlyU8VxZik4xG/AYcNgPzhgcJIw7VjjiEXHnYw+je5V8Fmcv+r4D6gKxIExVVlv34Im0MjP6RRRyPOUhH4M1L0Bjdx2cIUFNvHJQbX6/+GSw67sQqabzbr5tsRaYi2xWjYFT44wU+t+NoTWWR+IAdVgxP7H6HcBlzXY/7YJsMTb/nwRmgsGDARVcvlyMGlQ3s++fhNbZiDiG7gB9oh6d+zOrdQfYvOUTn+w+EiDuslidJvBuOKbZ6ZY6nxMdPYFpLrwqeW5HA1Wgl7hT22lmCW2UXREApLc8KE6FSKfBoZFOw/MEJumvMLDHviGKflipa1E3WIrlC863IeVhMR/Fe2ddcfPup+17met+1nrfjYI72c9XR9blMAlXpSVgEw32iCfIdFOi1nb7WrwS3TUBeJABOh2o2Oq2yn8qa01ZkZd5Qbxaa3IZxn4hIJ8g/i33OwQkW5xqv4Rp7ZxHaqbwcF4l0G9C6Ke6SeFIjDqRHA21yk0KKP5WuDvYw2RoMS3DnvJozYDfBLnL5oui7ztL6juZ325RaSjNf2XRp+L+1nrytMSa4m1xFpiLbFTXOxvAQYATXs+1rA84iYAAAAASUVORK5CYII=)
            8px 3px no-repeat #fff;
          border-radius: 3px;
          -webkit-box-shadow: 0 3px 10px rgba(0, 0, 0, 0.5);
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.5);
          cursor: pointer;
          margin: 40px auto;
          width: 60px;
          padding: 40px 0 5px;
          color: #0594c7;
          text-align: center;
        }
      }
    }
  }
  .qrcode-footer {
    width: 480px;
    height: 155px;
    background: url(//s1.hdslb.com/bfs/static/passport/static/img/2233login.af9c53d.png)
      0 -7px no-repeat;
    .status-txt {
      padding-top: 20px;
      text-align: center;
      color: #222;
      font-size: 18px;
      letter-spacing: 3px;
      margin-bottom: 5px;
    }
    .app-link {
      text-align: center;
      color: #717171;
      font-size: 14px;
    }
  }
}
.form-login {
  position: relative;
  .input-box {
    margin-top: 50px;
    width: 414px;
    .text {
      margin: 6px 0;
      font-size: 12px;
      min-height: 20px;
      line-height: 20px;
      .tips {
        color: #f66495;
        float: left;
      }
    }
    .remember {
      margin: 10px 0;
      color: #717171;
      width: 410px;
      font-size: 12px;
      .remember-tool {
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          color: #bbb;
          margin-left: 10px;
        }
      }
      .forget-password {
        float: right;
      }
      .not-checkout {
        float: right;
        margin-right: 10px;
      }
    }
    .btn-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .btn {
        color: #555;
        display: inline-block;
        height: 38px;
        border: 1px solid #ccc;
        border-radius: 2px;
        width: 184px;
        line-height: 38px;
        font-size: 14px;
        text-align: center;
        cursor: pointer;
        -webkit-transition: all 0.3s;
        -o-transition: all 0.3s;
        -moz-transition: all 0.3s;
        transition: all 0.3s;
      }
      .btn-login {
        border: 1px solid #0381aa;
        color: #fff;
        background-color: #00a7de;
        &:hover {
          background-color: #00bee7;
        }
      }
      .btn-reg {
        &:hover {
          background-color: #f7f7f7;
        }
      }
    }
    .sns {
      padding: 12px 0;
      font-size: 12px;
      display: flex;
      .btn {
        display: flex;
        align-items: center;
        color: #717171;
        cursor: pointer;
        &::before {
          content: "";
          display: inline-block;
          width: 21px;
          height: 21px;
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAA+CAYAAADEfFBjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA1hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0iRDVCMDQ2RkE3RDQ5MTRBNUI4NERBMDRGQzU5OUQ0ODIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0VBOTFFRjQzN0Y3MTFFNDlCMTQ5QzFDQkIyODlFQkUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDAyODc1ODIzN0QzMTFFNDlCMTQ5QzFDQkIyODlFQkUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjcyQjhGMkNEMkIyMDY4MTE4MjJBRkQ0MUM4MDYzRDFCIiBzdFJlZjpkb2N1bWVudElEPSJENUIwNDZGQTdENDkxNEE1Qjg0REEwNEZDNTk5RDQ4MiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRG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);
          vertical-align: middle;
          margin-right: 5px;
        }
      }
      .qq {
        margin-left: 20px;
        &::before {
          background-position: 0 -41px;
        }
      }
      .weibo {
        &::before {
          background-position: 0 0;
        }
      }
    }
  }
}
.status-box {
  position: relative;
  .status {
    display: none;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAABgCAYAAABLwH3pAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjQwNEFEMDQ2MDY1MTFFNzgwMUFCNTY2RDg4RTI2MzciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjQwNEFEMDM2MDY1MTFFNzgwMUFCNTY2RDg4RTI2MzciIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjZBN0NFOTkzQThEMTFFNTgxMjFCNUQ2NUNCMTI0N0QiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjZBN0NFOUEzQThEMTFFNTgxMjFCNUQ2NUNCMTI0N0QiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4mPh/xAAAMb0lEQVR42uxda2wc1RmdmX3v2vErdkJi5+UkJIGEIFS1og+soja0RSVVSyV+BCKhgqhSyYjyo0BVKioqqopWolIfUiUIUkEFqaXi0SJKQ6EpLQ1xRAl5Y5I4OCQNefi9uzM93+6dzfV41jveF8E5R7qanZ3Z+43tc+53vjt31qbjOAZBXKyw+CsgKACCoAAIggIgCAqAICgAgqAACIICIAgKgCAoAIKgAAhi9iAc9MTfPP5UDzZ/Q9uF1nP7zd887R779dbfP4rNLWg/vG3TjffX6FonxUc7rR0rxEe7n39WopYZ4Aq0bSB9s4f8hoeUtUIuPlqzh/z1ik/MIphBV4Oapuklu4zEu9FuUvuPIStsrvHq0mnjo23mn5SomQB8RnxDJ7+8qMPyat/4JD9RFwEoERzAplvtnpLXbk1Qp+cLpsSn/amABNrfdrbDy88Z1wAqA3Rrb7XqNUEd4BtfqwmIKqFv33ETLVTnmOF6xguXQf5bNNthqH23MO6p8Ug8bXxj6uwQUR4Jl2JzG9omtA1ob9c4nojsyyqmpKPrLzgBKHLf4vX8eF8nYa9Ru2nIHg/5dc9fj/gXA/GXY/NIyLK+GI9HrHg0apw5N3yuxjFvx+beaCTclYhH5a3nLtQMICPrK3LNIH+v+6YIASKQY+vR+mt4rYX4iuguNqtjtY4/q32x1AGhkBVvSMavAxkLx2ynbGKLve5CW4CWXr9y3n/8zovHop9IJaJdlpV34xPpTCViasBmCdpctN2I+UHVBHDbphv71CiM11N+K731GKDc+D7oJY2rUAwbxjsg/yheJqrQ3Qpkkj2WZRpgyzHsL/Q7KRIO9bnkVzhTQTH/k5Bl3mGiv2w2ezfe+mlVawBi1meB7NETo7uRDK6qtD9kkwOtTQ05Mdm201rsvEw2+xZkoF9H2ZxMJWNvJWI5G2UMj4y1BfkM1wIRk5DNEbJyrO1uz0JTu9XIHIc9SfoKIDMlXqrsa8/Yhb5My6QAiJkjk7WrR8hsdk9eADkR+GaBy5bNlfs4A5qNqeDas3sLxC4SjxaIKEWi3bolAR8jAQtQGXE/KXUz2ldQgH4na9v7wkbIJfZcnCO1wCVo40b+/s0hnJeBRfovagW3RojPoOi9Ui7ZyM8CvgoxPTNwclQmRJoRr0WdI/WMXJv8HGLJBpkBiGlGbfvA5MI4T6SSVsI0r0QB/Rza1Q3J+BYQrxnZZL9nRG4D0Y/i9bdQI8ho/SkluoNaV01BrzUcCj0QDln3IN71sWh4o6oh9ukZAAK+F0X28yjIH0bsF2mBiOkFYNvvqVHVzQDBrEQ4tKupMSmzOmGZz8cIvABielfz5K0g5YdtzY1GPB5NoUCWc92YBzWhBBaAFL3JRGwlRNcfjUQ6lYDf1WuAZDz2Ia7LTCXjI02NqSEKgChVvKaxOVIgiBUsA6xZ2nZC2Yu0+twC27b79QywbkWHCOscXP5QsawD4QRe0iIzSBjZF0JA/RJPE7DEk3sBhu04H2IzB7kBLx2TAiCCZIH9GiFbg34OXv632PwdbQuIeQiefFD5felnnrIo2x3HkBH/DUMJQc8AMnKrm2ilBZCx34C9eRZCewzxfpTvy+nPx7MSMvOEeLBcxj+c/H2k91gEE0HqgIMhdXPKmoEAxsYnHkhnspcPjYwdRR85KwPi9WPYvRQjdG5E7mxPXqdOf6ognKx9KH+q8N+0VNF6olS81Uta9x8cOPv9sfH02ol0Nit3gtFXvzbzNH/V4lbx/QXv710NSgEQhk4OmYbEiHxIywAdQT8/Mjr+7VA49LBp2/K5Z/DWRiEkCt5LLZUBQNK/YvNZRfgN61fO23Z5d/vowMlRmQrtVKLrCCIAwfDo2Osohhepa+3BtR/WbJfMPElff1bF9WsqNgVATGNlNE8Oi3FJ0M+huN3ZkMzPYo5PZNa4nhwCMNwM0NyYzEYi4dzU6ulzIy3n7ZN9CLE6Vf0gMQOtQG2Zk9qJz+UEcPrs8Br0s1WzUx0RK3QQRXCTCBvZ6RJaICJIDXBUK4KXYxT9upF/3uIsmhzbi5H71NSi1O5zrUw4ZC0RLw9CHtMziaPNw8ObJ87HhFe3CqK7Dp+VojarYkpNckDuGXhjpjN2Xyxq3ZAjcyjUfenilmFkEyl8WyST4Gf5l3tzDT9LhAIgAgjAKcwCoRZYGYtGnhYOiX0GoYXoYmXkLu9LaE9L4QtyOpctbTsN8sk05DKM+kK2+ejrmCJ1hyqUNWtjagW0DWHkp0WjkfBduUV0Tt6WgcRSlwwj5us4/Czak4g3mK9XsjtdGiNml7Jyx+VGGPpoz2Sck0Z+Wjds+vCdAiB8ZnNsWUY8IVwU+zKnIeFXKK+aSGdWjU+kt8BavA1y3g1SvgCy9kE0y9SI2wXCD2p+XB7BPa5106jNIBWWQ6jnArz1SQpxrkXMaxHzIfT1ON6+L5MTQCFbLVJ9HQuFzFWWaXWsW9HhQJQigvkQ3JRlHZwGJaZg3fIOsTFHPG+LKO5C2y58FGEIUZvnpIyWpobLMGo/D1LemcmcJySE0Jkf2XPklOF9LvZPaAW2pdmuYz6XIg8+/QptUGyMPKcgNUZbc2O0MZW4FX3+GxZIll78T2WZrvPZxCjUHa4I/ZYZUQBEsTpgYHJWcFqHRsYeWTg38WnsrkL7ecFGQAxyFxiCuAn2aIdWQHfZjvO+NivTpu+bk/sf9F7D2Hj6DOLdgWMysn8DrSCueCwiBbAQ/nPoc4cS3Dx5vBL7ivDm/Fzfjv1BMcdDARCGNiLrhJz0NBVG0/Do2MQSeX3qzNAgXi+eMgsUjbyIDPCm9pkF6Oe4KoxlVma+2p9quxznmI/tyVmpro5k+uzQ6CnYnUWTr8kai4RDr7ox5Rqx6XDtlKWWQ9h2oe9U4BrAuyy14Q9bnKGv/aLoWlW/45V+Rcq5m3825XfiGThKHm/ceieZXV4d8L5blBYsTcjqxgjbAkI9YSmfr2Eb/PmDa5a2jcBzy0xRJ85ZuG55exr7Yns6sA8L5OwpEm/A+56KJxz9AQTyPXxevyB53uDW1Utaj+w/evpN9zFOkL4z61ogde/BFbPfUuvAGUDILSQPSv5aDVLuaBKE/EQlAnCm3IiCxbg3HA691tKUWhaLFsZOKZZ/nE5nNqzoah5RZFaWJL8+B33JSs0vgZA7YEekX9vb99ru9mEZ8zzx5OtvXkklYvc1NybRXeHPKyLq6WxP/E52MplJtmsh4r2Al1+AGG5X2WWw2M85o1kgVwQ62etIfq8ITJK/hgLwsSTJROwz7gpO4KQqUqUumLTGBoXpd2NR6x4Q9oiyMP/UjyMjPGjk1+fv9DiG9zFKN2oZIIoi+2oVU/7G0s8vs1n7yUXzUoV7AsgCh9Cn1CaHoZLj2JcFeS9p2UUK94d8yVTMprjpotioX0ooVbZATplCoQUqw//nhtj3Tn21MZWQ5QzuyCzLI/aq0Xc7BPJ6V3syU81rOHx8+GWQvsfIf8uHZIr9qonHfxlCG6g0xozWApU7ulc5K5Q7ujMrVEAM4E+lfn81+BrMz9c5XvEaoBIST1cv1JHEZpmZg7iIELgIFkJPVwRXifClxGCUKIINkp6ougDcbOA3sk93rA7F70yOE0R5AtCtkNcWTXesBhkgyDQoMwBRfQt0IUxUeLYzPU4QH2sBEMRHLwC/GuAjvH7aHaIizPh5AG+xW+e7wMU8P20PUR8BfMSk95LfoAiImligSqY1q3gnuNisjlli36AoiIozQLkiqHKGKHdqk+QnKrdALpmL+f461QOmT9FrFimGSXwiOLHq9H99CeLjVQMQBAVAEBQAQVAABEEBEAQFQBAUAEFQAARBARAEBUAQFABBUAAEQQEQBAVAEBQAQVAABEEBEAQFQBAUAEFcOAj0vUB/eWWH/EvM9Wi9G665qq/Euc3YPIrWj3N7q3GR5tZ3CvGdm1f3lTi3EB/n9vJPTFQjAyxBuwZtGwi+vgT5t6HdoAhbLRTig+DrS5C/FvGJi1wAm9F2oTUVE4FG/ivQzshoXcXrnBTfTwQa+WsRn7iYBQArI/+0rKeYCHzI31PKKs0EsDJT4usi8CF/TymrRBA57szke4H8iC5eu5bkLzHK+8Yn+YmaCKCICPrrQf5pRNBP8hN1E4CPCIx6kb+ICAySn6irADQR/NHIz9BsrBf5PSIoxCf5iboKgCBmA3gnmKAACIICIAgKgCAoAIKgAAiCAiAICoAgKACCoAAIggIgiFmE/wswAJ4FV7zvyrR7AAAAAElFTkSuQmCC);
    position: absolute;
    top: 8px;
    right: -25px;
    width: 20px;
    height: 20px;
  }
  .error {
    display: block;
    background-position: -37px -38px;
  }
}
img {
  border: none;
}
a {
  color: #00a1d6;
}
.bottom-tips {
  margin: 24px auto 0;
  width: 980px;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #99a2aa;
  text-align: center;
  line-height: 16px;
}
.bottom-filling {
  &::after {
    height: 278px;
    display: block;
    content: "";
  }
}
</style>