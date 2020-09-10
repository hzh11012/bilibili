<template>
  <div id="vd">
    <inter-header :banner="false" class="inter-header"></inter-header>
    <div
      v-if="info != ''"
      class="v-wrap"
      :style="screenWidth>=1528?'width:1393px':(screenWidth>=1123?('width:'+(screenWidth-135)+'px'):'width:988px;padding:0 76px;')"
    >
      <div
        class="l-con"
        :style="screenWidth <= 1123 ?'width:638px':'width:'+(screenWidth-485)+'px'"
      >
        <div class="video-info">
          <h1 :title="info.title" class="video-title">
            <a
              href="/"
              :title="activityInfo.dic"
              target="_blank"
              class="activity"
              v-if="info.mission_id"
            >活动作品</a>
            <span
              class="tit"
              :class="info.mission_id !='null' && info.mission_id !=0?'':'tr-fix'"
            >{{info.title}}</span>
          </h1>
          <div class="video-data">
            <span class="a-crumbs">
              <a href="/" target="_blank">{{info.tid}}</a>
              >
              <a href="/" target="_blank">{{info.tname}}</a>
            </span>
            <span>{{info.pubdate*1000 | formatDate}}</span>
            <span
              v-if="info.stat.his_rank!=0"
              class="rank"
              title="本日日排行数据过期后，再纳入本稿件的历史排行数据进行对比得出"
            >全站排行榜最高第{{info.stat.his_rank}}名</span>
          </div>
          <div class="video-data">
            <span :title="'总播放数'+info.stat.view" class="view">{{info.stat.view | setNum}}播放</span>
            <span :title="'历史累计弹幕数'+info.stat.danmaku" class="dm">{{info.stat.danmaku | setNum}}弹幕</span>
            <span class="copyright" v-if="info.rights.no_reprint!=0">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-prohibit" />
              </svg>未经作者授权，禁止转载
            </span>
          </div>
        </div>
        <div id="playerWrap" class="player-wrap">
          <div id="bofangqi">
            <div class="bilibili-player-video-wrap">
              <div class="bilibili-player-video">
                <div
                  id="videoElement"
                  class="centeredVideo"
                  :style="screenWidth <= 1123 ?'height:351px':(screenWidth >= 1528?'height:579px':'height:'+(screenWidth-485)/1.78+'px')"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div class="video-toolbar clearfix">
          <div class="ops">
            <span title class="like">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-videoDz" />
              </svg>
              {{info.stat.like | setNum}}
            </span>
            <span title class="coin">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-videoCoin" />
              </svg>
              {{info.stat.coin | setNum}}
            </span>
            <span title class="collect">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-videoStar" />
              </svg>
              {{info.stat.favorite | setNum}}
            </span>
            <span title class="share">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-videoShare" />
              </svg>
              {{info.stat.share | setNum}}
            </span>
          </div>
          <div class="more">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-more" />
            </svg>
            <div class="more-ops-list">
              <ul>
                <li>用手机看</li>
                <li>稍后再看</li>
              </ul>
            </div>
          </div>
          <div class="right-btn">
            <div class="appeal-text">稿件投诉</div>
          </div>
        </div>
        <div class="video-desc">
          <div ref="textArea" class="open" :class="openDesc?'info':''">{{info.desc}}</div>
          <div class="btn" v-if="info.desc!=''" @click="openDesc=!openDesc">
            <span v-if="openDesc">展开更多</span>
            <span v-if="openDesc == false">收起</span>
          </div>
        </div>
        <div class="video-tags">
          <ul class="tag-area clearfix">
            <li class="tag" v-for="(item,index) in tags" :key="index">
              <a href="/" target="_blank" class="tag-link" v-if="item.tag_type=='new_channel'">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAUCAYAAACJfM0wAAAAAXNSR0IArs4c6QAAAP5JREFUOBGllD0OwjAMhV9yGcTOisRFegwWJJgQS4/RiyCxdkdcJiFuGtX9ceJAJtf5/OQkfjUore5zhHfngB1GtIexLZrdK1dqcpvo3hd43OH9gjMOFlc0+4dUvyhgGHXq3BPwlmVZSOL2JHUuFIX64fiSKOmHvXhF9LFasvB0p6silkj3zlIxzAmv4JpETrhXCImMLEwjhfBA4gp7A7MNyMI0p8bctsXTuMmzLI9bauRvg9QKFPjYca3DFLxBrcOU/OieCocpHUlTIbonvd+CUfHyuDHVX0ISFt3DBDnDY4bMwt5G91Q4TOlIO/xPaxymdOTkvMLAzw5KHwX+Czr/jXvbTvs/AAAAAElFTkSuQmCC"
                  width="32"
                  height="32"
                  class="channel-icon"
                />
                <span class="channel-name">{{item.tag_name}}</span>
              </a>
              <div style="height: 5px;" v-if="item.tag_type=='new_channel'">
                <div class="tag-channel-pane" style="display: none;">
                  <a href="/" target="_blank">
                    <div class="bg-image" :style="{backgroundImage: 'url(' + item.cover + ')'}"></div>
                    <div class="bg-mask" :style="'backgroundColor:'+item.color"></div>
                    <img :src="item.head_cover" width="60" height="60" class="channel-cover" />
                    <div class="channel-info">
                      <div class="channel-title">{{item.tag_name}}</div>
                      <div class="channel-desc">
                        <span :title="item.archive_count+'投稿'">{{item.archive_count}}投稿</span>
                        <span :title="item.featured_count+'精选视频'">{{item.featured_count}}精选视频</span>
                      </div>
                    </div>
                  </a>
                  <div class="content">
                    <div class="channel-btns">
                      <a href="/" target="_blank" class="channel-btns_link">进入频道</a>
                      <div class="channel-btns__subs" :class="item.is_atten==0?'no-subs':'is-subs'">
                        <img
                          v-if="item.is_atten==0"
                          src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTkwMTMxOTQ3MDg0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQyNDYiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTUxMiAxMjhhMzIgMzIgMCAwIDEgMzIgMzJ2MzIwaDMyMGEzMiAzMiAwIDEgMSAwIDY0aC0zMjB2MzIwYTMyIDMyIDAgMSAxLTY0IDB2LTMyMGgtMzIwYTMyIDMyIDAgMCAxIDAtNjRoMzIwdi0zMjBBMzIgMzIgMCAwIDEgNTEyIDEyOHoiIHAtaWQ9IjQyNDciIGZpbGw9IiNmZmZmZmYiPjwvcGF0aD48L3N2Zz4="
                          class="add-icon"
                        />
                        <span v-if="item.is_atten==0">订阅 {{ item.subscribed_count | setNum}}</span>
                        <span v-else>已订阅 {{ item.subscribed_count | setNum}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <a
                href="/"
                target="_blank"
                class="tag-link"
                v-if="item.tag_type!='new_channel'"
              >{{item.tag_name}}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="r-con">
        <div class="members-info" v-if="info.staff != null">
          <div class="members-info_header">
            <span class="title">创作团队（{{info.staff.length}}）</span>
            <span class="btn" @click="showTeam">{{showAllTeam?'收起':'展开'}}</span>
          </div>
          <!-- :style="" -->
          <div
            id="member-container"
            class="members-info_container"
            :style="showAllTeam?(screenWidth <= 1123 ?'max-height:531px':(screenWidth >= 1528?'max-height:759px':'max-height:'+((screenWidth-485)/1.78+180)+'px')):'max-height:158px;'"
          >
            <div class="up-card" v-for="(item,index) in info.staff" :key="index">
              <div class="panel">
                <a href="/" target="_blank" class="avatar">
                  <img :src="item.face+'@48w_48h.webp'" alt />
                  <i
                    v-if="item.official.role!=0"
                    class="auth"
                    :class="item.official.role | setRole"
                  ></i>
                </a>
                <div class="info">
                  <a
                    href="/"
                    target="_blank"
                    class="info-name"
                    :class="item.vip.status!=0?'is-vip':''"
                  >{{item.name}}</a>
                  <p class="info-title">{{item.title}}</p>
                </div>
              </div>
              <div class="btn" :class="relationShipArr[item.mid]?'attention':'attention--not'">
                <span v-if="!relationShipArr[item.mid]">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-add" />
                  </svg>
                  关注
                  <span>{{item.follower | setNum}}</span>
                </span>
                <span v-if="relationShipArr[item.mid]" class="attention-btn">
                  已关注
                  <span>{{item.follower | setNum}}</span>
                </span>
                <span v-if="relationShipArr[item.mid]" class="not-attention-btn">取消关注</span>
              </div>
            </div>
          </div>
        </div>
        <div class="up-info" v-if="ownerInfo!=''">
          <div class="u-face">
            <a href="/" target="_blank" class="fa">
              <img :src="ownerInfo.face" class="up-face" />
              <img
                v-if="ownerInfo.pendant.image!=''"
                :src="ownerInfo.pendant.image"
                class="pendant"
              />
              <i
                v-if="ownerInfo.Official.role!=0"
                class="auth"
                :class="ownerInfo.Official.role | setRole"
              ></i>
            </a>
          </div>
          <div class="u-info">
            <div
              class="name"
              :style="ownerInfo.sign!=''?'line-height:20px;height:20px':'line-height:40px;height:40px'"
            >
              <a
                href="/"
                target="_blank"
                class="username"
                :class="ownerInfo.vip.status!=0?'is-vip':''"
              >{{ownerInfo.name}}</a>
              <a href="/" target="_blank" class="message">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-message" />
                </svg>
                发消息
              </a>
            </div>
            <div v-if="ownerInfo.sign!=''" :title="ownerInfo.sign" class="desc">{{ownerInfo.sign}}</div>
          </div>
          <div class="btn-panel">
            <div
              class="default-btn charge-btn"
              :class="relationShip!=0?'following-charge-btn':'not-follow-charge-btn'"
            >
              <span>{{relationShip!=0?'为TA充电':'充电'}}</span>
            </div>
            <div
              class="default-btn follow-btn b-gz"
              :class="relationShip==0||relationShip==3?'not-follow':'following'"
            >
              <span class="has-charge" v-if="relationShip==0||relationShip==3">
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="relationShip==0?'#icon-add':'#icon-dui'" />
                </svg>
                关注
                <span>{{ownerInfo.fans | setNum}}</span>
              </span>
              <span class="already-btn" v-if="relationShip==1||relationShip==2">
                {{relationShip==1?'已关注':'已互粉'}}
                <span>{{ownerInfo.fans | setNum}}</span>
              </span>
              <span
                class="cancel-btn"
                v-if="relationShip==1||relationShip==2"
              >{{relationShip==1?'取消关注':'取消互粉'}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "../assets/js/date.js";
import interHeader from "../components/InterHeader.vue";
// import flvjs from "flv.js";
import DPlayer from "dplayer";
import md5 from "js-md5";
export default {
  data() {
    return {
      dp: null,
      info: [], //视频的基本信息
      activityInfo: [], //视频参与的活动信息
      screenWidth: "",
      screenHeight: "",
      urlInfo: [], //视频链接信息
      url: "", //视频url
      openDesc: false, //默认不展开描述
      tags: [], //视频标签
      ownerInfo: [], //视频up主信息
      relationShip: 0, //关注 相关信息  有三种 关注对方 对方关注自己 互相关注
      relationShipArr: [], //staff合作 不为空时 多个人的关系数组
      showAllTeam: false, //是否完整展示创作团队
    };
  },
  methods: {
    //获取视频信息
    getVideoInfo() {
      this.$http({
        url: "/api/x/web-interface/view?bvid=" + this.$route.query.id,
        method: "GET",
        headers: {
          "content-type": "multipart/x-www-form-urlencoded",
        },
      }).then((res) => {
        console.log(res);
        this.info = res.data.data;
        this.$nextTick(() => {
          this.getHeight();
        });
        if (this.info.staff == null) {
          this.getOwner(this.info.owner.mid);
        } else {
          this.getRelations();
        }
        this.getUrl(this.info.bvid, this.info.cid);
        if (this.info.mission_id) {
          this.getMission(this.info.mission_id, this.info.aid);
        }
      });
    },
    //获取视频所属活动的信息
    getMission(mid, aid) {
      this.$http
        .get("/bili/activity/subject/" + mid + "?aid=" + aid)
        .then((res) => {
          this.activityInfo = res.data.data;
        });
    },
    //获取视频链接
    getUrl(bvid, cid) {
      this.$http
        .get("/api/x/player/playurl?bvid=" + bvid + "&cid=" + cid + "&fnval=0")
        .then((res) => {
          this.urlInfo = res.data.data.durl;
          const i = this.urlInfo[0].url.slice(7).indexOf("/");
          const hw = 'http://upos-sz-mirrorhw.bilivideo.com';
          const cos = 'http://upos-sz-mirrorcos.bilivideo.com';

          console.log(this.urlInfo[0].url.split('/'));
          if(this.urlInfo[0].url.slice(0,i+7) == hw){
            this.url = "/hw" + this.urlInfo[0].url.slice(i + 7);
          }else if(this.urlInfo[0].url.slice(0,i+7) == cos){
            this.url = "/cos" + this.urlInfo[0].url.slice(i + 7);
          }else{

          }

          const dp = new DPlayer({
            // 配置参数
            container: document.getElementById("videoElement"),
            video: {
              url: this.url,
              type: "auto",
            },
            danmaku: {
              id: md5(this.url),
              api: "https://dplayer.alone88.cn/",
              // api: "http://dm.qnets.cn/",
              addition: [
                "https://dplayer.alone88.cn/v3/bilibili?aid=" + this.info.aid,
              ],
              // addition: ["http://dm.qnets.cn/v3/bilibili?aid=" + this.info.aid],
            },
          });
        });
    },
    //获取视频tag
    getTag() {
      this.$http
        .get(
          "/api/x/web-interface/view/detail/tag?bvid=" + this.$route.query.id
        )
        .then((res) => {
          this.tags = res.data.data;
        });
    },
    //获取视频描述的高度 判断显隐
    getHeight() {
      let e = this.$refs.textArea.offsetHeight;
      if (e > 63) {
        this.openDesc = true;
      } else {
        this.openDesc = null;
      }
    },
    //获取视频up主的信息  当staff合作为空时 调用
    getOwner(mid) {
      this.$http.get("/api/x/web-interface/card?mid=" + mid).then((res) => {
        this.ownerInfo = res.data.data.card;
      });
      //获取与自己的关系
      this.$http
        .get("/api/x/web-interface/relation?jsonp=jsonp&mid=" + mid)
        .then((res) => {
          const info = res.data.data;
          if (info.relation.attribute != 0 && info.be_relation.attribute == 0) {
            //自己关注up主  up主没有关注自己
            this.relationShip = 1;
          } else if (
            info.relation.attribute == 0 &&
            info.be_relation.attribute == 0
          ) {
            //互没关
            this.relationShip = 0;
          } else if (
            info.relation.attribute != 0 &&
            info.be_relation.attribute != 0
          ) {
            //互关
            this.relationShip = 2;
          } else if (
            info.relation.attribute == 0 &&
            info.be_relation.attribute != 0
          ) {
            //自己没有关注up主 up主关注了自己
            this.relationShip = 3;
          }
        });
    },
    //当staff合作 不为空时 调用 获取 是否关注的信息
    getRelations() {
      let fids = "";
      this.info.staff.forEach((item, index) => {
        if (index == 0) {
          fids += item.mid;
        } else {
          fids += "," + item.mid;
        }
      });
      this.$http
        .get("/api/x/relation/relations?jsonp=jsonp&fids=" + fids)
        .then((res) => {
          this.relationShipArr = res.data.data;
        });
    },
    showTeam() {
      this.showAllTeam = !this.showAllTeam;
    },
  },
  components: {
    interHeader,
    DPlayer,
  },
  created() {
    this.getVideoInfo();
    this.getTag();
  },
  mounted() {
    this.screenWidth = document.body.clientWidth;
    this.screenHeight = document.body.clientHeight;
    window.onresize = () => {
      return (() => {
        this.screenWidth = document.body.clientWidth;
        this.screenHeight = document.body.clientHeight;
      })();
    };
  },
  watch: {
    $route(newVal, oldVal) {
      if (newVal != oldVal) {
        this.$router.go(0);
      }
    },
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
    setRole(role) {
      if (role == 1 || role == 2) {
        return "p-auth";
      } else if (role == 0) {
        return "";
      } else {
        return "o-auth";
      }
    },
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
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
  /deep/ .search-input {
    background: #f4f4f4;
    border: 1px solid #e7e7e7;
  }
}
.v-wrap {
  box-sizing: content-box;
  max-width: 1660px;
  min-width: 988px;
  margin: 20px auto;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  .r-con {
    width: 320px;
    -ms-flex: none;
    flex: none;
    margin-left: 30px;
    height: 2000px;
  }
  .video-info,
  .up-info {
    margin-bottom: 16px;
  }
  .video-toolbar {
    position: relative;
    margin-top: 16px;
  }
  .video-desc,
  .video-tags {
    margin-top: 16px;
  }
  .video-tags {
    position: relative;
    clear: both;
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 1px solid #e5e9ef;
  }
}
.video-info {
  .video-title {
    font-size: 18px;
    font-weight: 500;
    color: #212121;
    display: flex;
    align-items: center;
    height: 26px;
    margin-bottom: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    .activity {
      transition: none;
      display: inline-block;
      font-size: 12px;
      margin-right: 10px;
      padding: 0 5px;
      height: 22px;
      line-height: 22px;
      border-radius: 2px;
      color: #fff;
      background-color: #ffafc9;
      vertical-align: middle;
    }
    .tr-fix {
      margin-left: -0.5em;
    }
  }
  .video-data {
    margin-top: 11px;
    font-size: 12px;
    height: 16px;
    color: #999;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    .a-crumbs {
      margin-right: 16px;
      a {
        color: #999;
        &:visited {
          text-decoration: none;
        }
      }
    }
    span {
      line-height: 16px;
      display: inline-block;
      height: 16px;
    }
    .rank {
      margin-left: 8px;
    }
    .view {
      margin-right: 10px;
    }
    .copyright {
      margin-left: 16px;
      display: flex;
      align-items: center;
      font-size: 12px;
      .icon {
        font-size: 14px;
        margin-right: 5px;
        color: #fd676f;
      }
    }
  }
}
.video-toolbar {
  box-sizing: content-box;
  line-height: 30px;
  height: 28px;
  font-size: 14px;
  color: #505050;
  border-bottom: 1px solid #e5e9f0;
  padding-bottom: 12px;
  .ops {
    float: left;
    height: 28px;
    -ms-user-select: none;
    user-select: none;
    .icon {
      color: #757575;
      font-size: 28px;
      margin-right: 5px;
    }
  }
  .more {
    float: right;
    cursor: pointer;
    color: #757575;
    height: 28px;
    font-size: 16px;
    display: inline-block;
    transition: all 0.3s;
    position: relative;
    text-align: center;
    .icon {
      color: #757575;
      font-size: 18px;
    }
    &:hover {
      .more-ops-list {
        display: block;
      }
    }
  }
  .right-btn {
    float: right;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
  }
  .appeal-text {
    float: right;
    cursor: pointer;
    font-size: 12px;
    margin-right: 20px;
    color: #505050;
    transition: color 0.3s;
    &:hover {
      color: #00a1d6;
    }
  }
  .ops > span {
    width: 92px;
    margin-right: 8px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    transition: all 0.3s;
    white-space: nowrap;
    color: #505050;
    position: relative;
    &:hover {
      .icon {
        color: #00a1d6;
        font-size: 28px;
      }
      color: #00a1d6;
    }
  }
}
.more-ops-list {
  box-sizing: content-box;
  display: none;
  position: absolute;
  width: 80px;
  left: -65px;
  z-index: 30;
  text-align: center;
  padding: 10px 0;
  background: #fff;
  border: 1px solid #e5e9ef;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.14);
  border-radius: 2px;
  font-size: 14px;
  color: #222;
  li {
    position: relative;
    height: 34px;
    line-height: 34px;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      color: #00a1d6;
      background: #e7e7e7;
    }
  }
}
.video-desc {
  position: relative;
  .open {
    white-space: pre-line;
    transition: all 0.3s;
    font-size: 12px;
    color: #212121;
    letter-spacing: 0;
    line-height: 18px;
    height: auto;
    width: 573px;
    overflow: hidden;
  }
  .info {
    height: 63px;
  }
  .btn {
    margin-top: 12px;
    font-size: 12px;
    line-height: 18px;
    span {
      cursor: pointer;
      color: #505050;
    }
  }
}
.video-tags {
  .tag-area > li {
    float: left;
    margin: 0 10px 8px 0;
    background: #f4f4f4;
    border-radius: 100px;
    padding: 0 12px;
    position: relative;
    height: 22px;
    line-height: 22px;
    transition: all 0.3s;
    font-size: 12px;
    border: 1px solid #f4f4f4;
    &:hover {
      border-color: #00a1d6;
    }
    &:hover > a {
      color: #00a1d6;
    }
    .tag-link {
      display: inline-block;
      height: 22px;
      color: #505050;
      position: relative;
      z-index: 10;
      transition: all 0.3s;
    }
  }
  .tag-area {
    .channel-icon {
      width: 11px;
      height: 10px;
      margin-right: 5px;
      vertical-align: baseline;
    }
    .channel-name {
      color: #00a1d6;
    }
    .tag {
      &:hover {
        .tag-channel-pane {
          display: block !important;
        }
      }
    }
  }
}
.tag-channel-pane {
  position: absolute;
  z-index: 11;
  background: #fff;
  margin-left: -10px;
  margin-top: 5px;
  width: 206px;
  min-height: 184px;
  box-sizing: content-box;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  .content {
    padding: 0 10px;
  }
  .bg-image,
  .bg-mask {
    width: 100%;
    height: 66px;
    background-position: 50%;
    border-radius: 2px 2px 0 0;
  }
  .bg-image {
    background-size: cover;
    background-repeat: no-repeat;
  }
  .bg-mask {
    position: absolute;
    opacity: 0.6;
    top: 0;
  }
  .channel-cover {
    width: 60px;
    height: 60px;
    background: rgba(0, 0, 0, 0.05);
    border: 2px solid #fff;
    border-radius: 2px;
    position: absolute;
    top: 18px;
    left: 50%;
    transform: translate(-50%);
  }
  .channel-info {
    padding: 24px 10px 10px;
  }
  .channel-title {
    font-size: 14px;
    color: #212121;
    font-weight: 500;
    line-height: 18px;
    margin: 0 0 4px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
  .channel-desc {
    font-size: 12px;
    color: #999;
    height: 18px;
    line-height: 18px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    width: 190px;
  }
  .channel-desc > span {
    margin: 0 3px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    text-overflow: -o-ellipsis-lastline;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-line-clamp: 1;
  }
  .channel-btns {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .is-subs,
    .no-subs {
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
      text-overflow: -o-ellipsis-lastline;
      text-overflow: ellipsis;
      word-break: break-all;
      -webkit-line-clamp: 1;
    }
    .no-subs {
      color: #fff;
      background: #00a1d6;
      border: 1px solid #00a1d6;
      transition: 0.3s;
      border-radius: 2px;
      &:hover {
        background: #00b5e5;
        border: 1px solid #00b5e5;
      }
    }
    .is-subs {
      background: #e7e7e7;
      color: #999;
      border: 1px solid #e7e7e7;
    }
  }
  .channel-btns_link {
    cursor: pointer;
    width: 66px;
    height: 22px;
    text-align: center;
    line-height: 22px;
    border: 1px solid #00a1d6;
    border-radius: 2px;
    font-size: 12px;
    color: #00a1d6;
    transition: 0.3s;
    &:hover {
      background: #00a1d6;
      border-radius: 2px;
      color: #fff;
    }
  }
  .channel-btns__subs {
    cursor: pointer;
    width: 108px;
    height: 22px;
    line-height: 22px;
    font-size: 12px;
    text-align: center;
    margin-left: 8px;
    .add-icon {
      width: 15px;
      height: 15px;
      margin-right: 5px;
      vertical-align: sub;
    }
  }
}
//头像右下角 认证标志
.auth {
  position: absolute;
  width: 20px;
  height: 20px;
  right: -2px;
  bottom: -2px;
  background: url(//s1.hdslb.com/bfs/static/jinkela/video/asserts/user-auth.png);
  background-repeat: no-repeat;
  z-index: 3;
}
.p-auth {
  background-position: -38px -53px;
}
.o-auth {
  background-position: -4px -53px;
}

.up-info {
  .u-face {
    float: left;
    width: 48px;
    height: 48px;
    position: relative;
    .fa {
      display: block;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      overflow: hidden;
      background-color: #f4f5f7;
    }
    .up-face {
      background: #f9f9f9;
      width: 48px;
      height: 48px;
    }
    .pendant {
      width: 80px;
      height: 80px;
      position: absolute;
      overflow: hidden;
      top: -17px;
      left: -17px;
      width: 80px;
      height: 80px;
      z-index: 2;
    }
  }
  .u-info {
    margin-left: 16px;
    float: left;
    .name {
      font-size: 14px;
      color: #00a1d6;
      .username {
        font-size: 14px;
        color: #212121;
        font-weight: 500;
        display: inline-block;
        max-width: 180px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: top;
        &:hover {
          color: #00a1d6;
        }
      }
      .message {
        margin-left: 12px;
        font-size: 12px;
        color: #505050;
        display: inline-block;
        vertical-align: middle;
        .icon {
          font-size: 18px;
          vertical-align: -0.2em;
          color: #999;
        }
        &:hover {
          color: #00a1d6;
          .icon {
            color: #00a1d6;
          }
        }
      }
    }
    .desc {
      margin-top: 4px;
      width: 256px;
      font-size: 12px;
      line-height: 16px;
      height: 16px;
      color: #999;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .btn-panel {
    clear: both;
    display: -ms-flexbox;
    display: flex;
    margin-left: 63px;
    white-space: nowrap;
    .default-btn {
      padding: 0;
      line-height: 32px;
      height: 32px;
      border-radius: 2px;
      font-size: 14px;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-align: center;
      align-items: center;
      -ms-flex-pack: center;
      justify-content: center;
      cursor: pointer;
    }
    .charge-btn {
      background: #fff;
      border: 1px solid #fb7299;
      color: #fb7299;
      margin-right: 10px;
      transition: all 0.3s;
    }
    .not-follow-charge-btn {
      width: 90px;
      &:hover {
        background: #fb7299;
        color: #fff;
      }
    }
    .following-charge-btn {
      background: #fb7299;
      color: #fff;
      width: 123px;
      &:hover {
        background: #ff85ad;
      }
    }
    .follow-btn {
      transition: 0.25s;
      &:hover {
        .already-btn {
          display: none;
        }
        .cancel-btn {
          display: block;
        }
      }

      .cancel-btn {
        display: none;
      }
    }
    .not-follow {
      background: #00a1d6;
      color: #fff;
      width: 156px;
      &:hover {
        background: #00b5e5;
        border-color: #00b5e5;
      }
      .icon {
        font-size: 16px;
        margin-right: 8px;
        transform: translateY(1px);
      }
    }
    .following {
      color: #999;
      border: 1px solid #e7e7e7;
      background: #e7e7e7;
      width: 123px;
    }
  }
}
.members-info {
  .up-card {
    margin: 16px 0;
    -ms-flex-pack: justify;
    justify-content: space-between;
    .avatar {
      display: block;
      background-color: #f4f5f7;
      margin-right: 16px;
      position: relative;
    }
    .avatar,
    .avatar img {
      cursor: pointer;
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
    .info {
      display: -ms-flexbox;
      display: flex;
      -ms-flex-pack: center;
      justify-content: center;
      -ms-flex-align: start;
      align-items: flex-start;
      -ms-flex-direction: column;
      flex-direction: column;
      position: relative;
    }
    .info-name {
      width: 110px;
      font-size: 14px;
      margin: 2px 0;
      color: #212121;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
    }
    .info-title {
      width: 110px;
      font-size: 12px;
      margin: 2px 0;
      color: #999;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .btn {
      flex-shrink: 0;
      width: 123px;
      box-sizing: border-box;
      padding: 0;
      line-height: 32px;
      height: 32px;
      border-radius: 2px;
      font-size: 14px;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-align: center;
      align-items: center;
      -ms-flex-pack: center;
      justify-content: center;
      cursor: pointer;
      transition: 0.2s;
    }
    .attention {
      color: #999;
      background: #e7e7e7;
      transition: 0.25s;
      .not-attention-btn {
        display: none;
      }
      &:hover {
        .attention-btn {
          display: none;
        }
        .not-attention-btn {
          display: block;
        }
      }
    }
    .attention--not {
      background: #00a1d6;
      color: #fff;
    }
  }
  .up-card,
  .up-card .panel {
    display: flex;
    align-items: center;
  }
}
.members-info_header {
  cursor: pointer;
  height: 44px;
  background-color: #f4f4f4;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 0 16px;
  .title {
    font-size: 16px;
    color: #212121;
  }
  .btn {
    font-size: 12px;
    color: #505050;
  }
}
.members-info_container {
  transition: max-height 0.3s ease, background 1s;
  max-height: 158px;
  margin-bottom: 16px;
  overflow: auto;
}

.is-vip {
  color: #fb7299 !important;
}
//创作团队 滚动条
#member-container {
  &::-webkit-scrollbar {
    width: 6px;
    background: hsla(0, 0%, 96.1%, 0);
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: transparent;
  }
  &:hover::-webkit-scrollbar {
    background: #f5f5f5;
  }
  &:hover::-webkit-scrollbar-track {
    background: #f5f5f5;
  }
  &:hover::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.5);
  }
}
#playerWrap {
  height: auto !important;
}
#bofangqi {
  z-index: 10;
  width: 100%;
  height: auto;
}
.centeredVideo {
  display: block;
  width: 100%;
  max-height: 100%;
  outline: none;
}

.bilibili-player-video-wrap {
  position: relative;
  display: flex;
  -webkit-box-flex: 1;
  flex-grow: 1;
  min-height: 0;
  z-index: auto;
  overflow: hidden;
  background-color: #000;
  user-select: none;
}

.bilibili-player-video {
  display: flex;
  display: -webkit-box;
  display: -ms-flexbox;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  position: relative;
  z-index: 10;
  cursor: pointer;
  margin: 48px 7px;
}
a {
  transition: color 0.3s;
}
</style>