<template>
  <div class="container" :class="empty?'empty':''" style="overflow:auto">
    <div v-if="loading && count==0" class="tip-box loading-tip">loading...</div>
    <div v-if="empty">暂时没有新动态了哦！</div>
    <ul
      v-else
      class="list"
      v-infinite-scroll="load"
      infinite-scroll-distance="40"
      infinite-scroll-disabled="disabled"
    >
      <div v-for="(item,index) in list" :key="index" class="list-item">
        <div class="main-container">
          <div class="left-box">
            <div
              v-if="item.desc.uid_type==2"
              class="avatar"
              :style="{backgroundImage:'url('+JSON.parse(item.card).apiSeasonInfo.cover +'@36w_36h_1c.webp)'}"
            ></div>
            <a
              v-if="item.desc.uid_type==1"
              href="/"
              target="_blank"
              :title="item.desc.user_profile.info.uname"
              class="avatar"
              :style="{backgroundImage:'url('+ item.desc.user_profile.info.face +'@36w_36h_1c.webp)'}"
            ></a>
            <div
              v-if="item.desc.uid_type==1"
              class="verify-box"
              :class="item.desc.user_profile.vip.vipStatus?'type-big '+(item.desc.user_profile.card.official_verify.type==1?'type-1':(item.desc.user_profile.card.official_verify.type==0?'type-0':'')):(item.desc.user_profile.card.official_verify.type==1?'type-1':(item.desc.user_profile.card.official_verify.type==0?'type-0':''))"
            ></div>
            <div v-if="item.desc.uid_type==2" class="verify-box type-0"></div>
          </div>
          <div class="center-box">
            <div class="name-line">
              <span
                v-if="item.desc.uid_type==2"
                class="user-name"
              >{{JSON.parse(item.card).apiSeasonInfo.title}}</span>
              <a
                v-if="item.desc.uid_type==1"
                href="/"
                :title="item.desc.user_profile.info.uname"
                target="_blank"
                class="user-name"
              >{{item.desc.user_profile.info.uname}}</a>
              <span
                class="publish-time"
                v-if="parseInt((nowTime-item.desc.timestamp*1000)/(1000*60*60))<1"
              >{{parseInt((nowTime-item.desc.timestamp*1000)/(1000*60))==0?'刚刚':parseInt((nowTime-item.desc.timestamp*1000)/(1000*60))+' 分钟前'}}</span>
              <span
                class="publish-time"
                v-else-if="parseInt((nowTime-item.desc.timestamp*1000)/(1000*60*60))<24"
              >{{parseInt((nowTime-item.desc.timestamp*1000)/(1000*60*60))+' 小时前'}}</span>
              <span class="publish-time" v-else>{{item.desc.timestamp*1000 | formatDate}}</span>
            </div>
            <a
              v-if="item.desc.uid_type==1"
              href="/"
              target="_blank"
              class="content"
            >{{JSON.parse(item.card).title}}</a>
            <a
              v-if="item.desc.uid_type==2"
              href="/"
              target="_blank"
              class="content"
            >{{JSON.parse(item.card).new_desc}}</a>
          </div>
          <a href="/" target="_blank" class="right-box">
            <div
              class="cover"
              :style="{backgroundImage:'url('+ (item.desc.uid_type==1?JSON.parse(item.card).pic:JSON.parse(item.card).cover) +'@64w_36h_1c.webp)'}"
            >
              <div class="watch-later">
                <div class="watch-later-tip">稍后再看</div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </ul>
    <div v-if="noMore" class="more-tab">
      <button class="more-btn" @click="lookAll">查看全部</button>
    </div>
  </div>
</template>

<script>
import { formatDate } from "../../../assets/js/date.js";
export default {
  data() {
    return {
      count: 0,
      loading: false,
      list: [], //列表
      history_offset: "", //数据偏移量
      nowTime: 0,
      oneDay: 86400000,
      empty: false,
    };
  },
  computed: {
    noMore() {
      return this.count >= 3;
    },
    disabled() {
      return this.loading || this.noMore;
    },
  },
  methods: {
    load() {
      this.loading = true;
      if (this.count == 0) {
        this.getNew();
      } else if (!this.empty) {
        this.getHistory();
      }
    },
    getNew() {
      this.nowTime = new Date().getTime();
      this.$http
        .get(
          "/vc/dynamic_svr/v1/dynamic_svr/dynamic_new?uid=" +
            this.$store.state.userinfo.mid +
            "&type_list=8,512,4097,4098,4099,4100,4101"
        )
        .then((res) => {
          this.history_offset = res.data.data.history_offset;
          this.list = res.data.data.cards;
          this.loading = false;
          if (this.list == null) {
            this.empty = true;
          }
          this.count += 1;
        });
    },
    getHistory() {
      this.$http
        .get(
          "/vc/dynamic_svr/v1/dynamic_svr/dynamic_history?uid=" +
            this.$store.state.userinfo.mid +
            "&type_list=8,512,4097,4098,4099,4100,4101&offset_dynamic_id=" +
            this.history_offset
        )
        .then((res) => {
          this.history_offset = res.data.data.next_offset;
          if (this.count == 2) {
            res.data.data.cards.forEach((element, index) => {
              if (index != 0 && index < 12) {
                this.list.push(element);
              }
            });
          } else {
            res.data.data.cards.forEach((element, index) => {
              if (index != 0) {
                this.list.push(element);
              }
            });
          }
          this.loading = false;
          this.count += 1;
        });
    },
    lookAll() {
      //查看全部TODO
    },
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "MM-dd");
    },
    formatTime(time) {
      var date = new Date(time);
      return formatDate(date, "hh");
    },
  },
};
</script>

<style lang="less" scoped>
.verify-box {
  width: 16px;
  height: 16px;
  background: #fff center/12px no-repeat;
  position: absolute;
  top: 21px;
  right: 0;
  border-radius: 50%;
}
.type-big {
  background-image: url(//s2.hdslb.com/bfs/static/blive/bpfe-dynamic-nav-iframe/static/img/verify_big.230767cd.svg);
}
.type-0 {
  background-image: url(//s2.hdslb.com/bfs/static/blive/bpfe-dynamic-nav-iframe/static/img/verify_0.6e59734b.svg);
}
.type-1 {
  background-image: url(//s2.hdslb.com/bfs/static/blive/bpfe-dynamic-nav-iframe/static/img/verify_1.d53e8b68.svg);
}
.content {
  margin-top: 6px;
  font-size: 14px;
  color: #212121;
  font-weight: 500;
  max-width: 200px;
}
.watch-later {
  display: none;
  position: relative;
  width: 22px;
  height: 22px;
  background: url(data:image/png;base64,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)
    center/contain no-repeat;
  .watch-later-tip {
    display: none;
    padding: 6px 8px;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 2px;
    font-size: 12px;
    color: #fff;
    line-height: 12px;
    position: absolute;
    white-space: nowrap;
    top: -27px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }
}
</style>