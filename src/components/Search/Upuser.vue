<template>
  <div id="upuser-list" style="position:relative">
    <div class="dropdown-wrap clearfix">
      <div class="total-wrap">
        <p
          class="total-text"
          v-if="showUpuser"
        >共找到{{upuser.numResults!=1000?upuser.numResults:upuser.numResults+'+'}}个用户</p>
        <p class="total-text" v-else>共找到0个用户</p>
      </div>
      <div class="select-wrap">
        <div class="bili-dropdown dropdown">
          <span class="selected">{{defaultOrder.name}}</span>
          <i class="icon icon-arrow-down"></i>
          <ul class="dropdown-list">
            <li
              class="dropdown-item"
              v-show="defaultOrder.name != item.name"
              v-for="(item,index) in orderType"
              :key="index"
              @click="defaultOrder = item;getUpuser()"
            >{{item.name}}</li>
          </ul>
        </div>
        <div class="bili-dropdown dropdown">
          <span class="selected">{{defaultUser.name}}</span>
          <i class="icon icon-arrow-down"></i>
          <ul class="dropdown-list">
            <li
              class="dropdown-item"
              v-show="defaultUser.name != item.name"
              v-for="(item,index) in userType"
              :key="index"
              @click="defaultUser = item;getUpuser()"
            >{{item.name}}</li>
          </ul>
        </div>
      </div>
    </div>
    <ul v-if="showUpuser">
      <upuser-card
        :relation="retationDetail"
        :item="item"
        v-for="(item,index) in upuser.result"
        :key="index"
      ></upuser-card>
    </ul>
    <el-pagination
      v-show="showUpuser"
      hide-on-single-page
      @current-change="currentChange"
      background
      layout="prev, pager, next"
      :page-size="20"
      :current-page="page"
      :total="upuser.numResults"
    ></el-pagination>

    <div v-if="!showUpuser" class="flow-loader-state">
      <div class="flow-loader-state-loading">
        <div class="load-state">
          <span class="loading">正在加载...</span>
        </div>
      </div>
    </div>
    <div v-if="upuser.numResults==0&&showUpuser" class="flow-loader-state">
      <div class="flow-loader-state-nothing">
        <div class="error-wrap error-0">
          <p class="text">没有相关数据</p>
          <p class="subtext">目前支持搜索UP主、Lv2及以上绑定手机的大部分用户</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import upuserCard from "./UpuserCard.vue";
export default {
  props: ["searchKey"],
  data() {
    return {
      upuser: [], //所有数据
      showUpuser: true, //显示upuserList
      page: 1, //默认第一页
      orderType: [
        { name: "默认排序", order: "0", orderSort: "0" },
        { name: "粉丝数由高到低", order: "fans", orderSort: "0" },
        { name: "粉丝数由低到高", order: "fans", orderSort: "1" },
        { name: "Lv等级由高到低", order: "level", orderSort: "0" },
        { name: "Lv等级由低到高", order: "level", orderSort: "1" },
      ], //排序  order为结果排序方式 {默认排序：0 粉丝数：fans 用户等级：level}
      //orderSort 为用户粉丝数及等级排序顺序 {默认为：0 由高到低：0 由低到高：1}
      defaultOrder: { name: "默认排序", order: "0", orderSort: "0" }, //排序 默认
      userType: [
        { name: "全部用户", key: "0" },
        { name: "up主", key: "1" },
        { name: "普通用户", key: "2" },
        { name: "认证用户", key: "3" },
      ], //用户分类筛选
      defaultUser: { name: "全部用户", key: "0" }, //用户分类筛选 默认
      fids: "", //拼接的所有用户id  用于获取是否关注用户
      retationDetail: [], //关注用户 详情
    };
  },
  methods: {
    getUpuser() {
      this.showUpuser = false;
      this.$http
        .get(
          "/api/x/web-interface/search/type?search_type=bili_user&highlight=1&keyword=" +
            this.searchKey +
            "&page=" +
            this.page +
            "&order=" +
            this.defaultOrder.order +
            "&order_sort=" +
            this.defaultOrder.orderSort +
            "&user_type=" +
            this.defaultUser.key
        )
        .then((res) => {
          this.upuser = res.data.data;
          if (this.upuser.numResults != 0) {
            let str = "";
            this.upuser.result.forEach((element, index) => {
              if (index == 0) {
                str += element.mid;
              } else {
                str += "," + element.mid;
              }
            });
            this.fids = str;
            this.getRelation();
          } else {
            this.showUpuser = true;
          }
        });
    },
    //查询是否关注 此页面20个人
    getRelation() {
      this.$http
        .get("/api/x/relation/relations?fids=" + this.fids)
        .then((res) => {
          if (res.data.code == -101) {
            this.showUpuser = true;
            return null;
          } else if (res.data.data == null) {
            this.showUpuser = true;
            return null;
          } else {
            this.retationDetail = res.data.data;
          }
          this.showUpuser = true;
        });
    },
    //换页
    currentChange(page) {
      let el = document.getElementsByClassName("nav-header-box")[0];
      this.$nextTick(function () {
        window.scrollTo({ behavior: "smooth", top: el.offsetTop });
      });
      this.page = page;
      this.getUpuser();
    },
  },
  created() {
    this.getUpuser();
  },
  watch: {
    $route(newVal, oldVal) {
      if (newVal != oldVal) {
        this.page = 1;
        this.$store.commit("showNum", false);
        this.getUpuser();
      }
    },
  },
  components: {
    upuserCard,
  },
};
</script>

<style lang="less" scoped>
#upuser-list {
  margin-bottom: 30px;
  .dropdown-wrap {
    .total-wrap {
      float: left;
    }
    .select-wrap {
      float: left;
      border-left: 1px solid #e5e9ef;
      padding-left: 32px;
      height: 16px;
      margin-top: 10px;
      margin-left: 24px;
      .bili-dropdown {
        line-height: 16px;
        height: 30px;
        font-size: 12px;
        color: #222;
        border: none;
        margin-right: 10px;
        background-color: inherit;
        z-index: 1;
        .selected {
          color: #6d757a;
          cursor: pointer;
        }
        .icon-arrow-down {
          background-position: -475px -157px;
          display: inline-block;
          vertical-align: middle;
          width: 12px;
          height: 6px;
          margin-left: 5px;
          margin-top: -1px;
          background-image: url(//static.hdslb.com/images/base/icons.png);
        }
        .dropdown-list {
          border: 1px solid #e5e9ef;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          border-radius: 4px;
          width: 113px;
          .dropdown-item {
            display: block;
            padding-left: 15px;
            height: 24px;
            line-height: 24px;
          }
        }
      }
    }
  }
}
.bili-dropdown {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  background-color: #fff;
  cursor: default;
  padding: 0 7px;
  height: 22px;
  line-height: 22px;
  border: 1px solid #ccd0d7;
  border-radius: 4px;
  .selected {
    display: inline-block;
    vertical-align: top;
  }
  .dropdown-list {
    position: absolute;
    width: 100%;
    background: #fff;
    border: 1px solid #ccd0d7;
    border-top: 0;
    left: -1px;
    top: 22px;
    z-index: 10;
    display: none;
    border-radius: 0 0 4px 4px;
    .dropdown-item {
      box-sizing: content-box;
      cursor: pointer;
      margin: 0;
      padding: 3px 7px;
      &:hover {
        background-color: #e5e9ef;
      }
    }
  }
  &:hover {
    z-index: 2 !important;
    .dropdown-list {
      display: block;
    }
  }
}

.error-wrap {
  .subtext {
    font-size: 13px;
    position: absolute;
    top: 250px;
    line-height: 20px;
    left: 350px;
  }
}
</style>