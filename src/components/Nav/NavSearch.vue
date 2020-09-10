<template>
  <div class="nav-search-box" v-if="isdefultSearch">
    <div class="nav-search">
      <input
        class="search-input"
        autocomplete="off"
        type="text"
        :placeholder="defultSearch.show_name"
        @keyup.enter="search"
        @click.stop="focus"
        v-model="searchKey"
      />
      <div class="search-btn" @click="search">
        <svg class="icon icon-search" aria-hidden="true">
          <use xlink:href="#icon-search" />
        </svg>
      </div>
      <ul
        v-if="$store.state.isShowSearchPop && this.searchKeyArr!=''"
        class="bilibili-search-history"
        id="searchHistory"
      >
        <li class="histroy-item" v-for="(item,index) in searchKeyArr" :key="index">
          <a :href="'#/searchresult/all?keyword='+ item.value" target="_blank">{{item.value}}</a>
          <svg class="icon icon-cancel" aria-hidden="true" @click="clearHistory(index)">
            <use xlink:href="#icon-cancel" />
          </svg>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
var timer;
export default {
  data() {
    return {
      searchKey: "", //input 输入的 搜索词
      searchKeyArr: [], // 历史搜索记录
      defultSearch: {}, //input默认的搜索词
      isdefultSearch: false, //是否显示搜索栏
      inputFocus: false, // 输入框聚焦时 显示搜索历史
    };
  },
  methods: {
    //获取搜索默认词
    getSearch() {
      this.$http.get("api/x/web-interface/search/default").then((res) => {
        this.defultSearch = res.data.data;
        this.isdefultSearch = true;
      });
    },
    //搜索
    search() {
      if (this.searchKey == "") {
        this.searchKey = this.defultSearch.show_name;
      }
      let serarch_History = JSON.parse(localStorage.getItem("serarch_History"));
      if (serarch_History == null) {
        let li = [];
        li.unshift({
          value: this.searchKey,
          isHistory: 1,
          timestamp: new Date().getTime(),
        });
        localStorage.setItem("serarch_History", JSON.stringify(li));
      } else {
        let obj = JSON.parse(localStorage.getItem("serarch_History"));
        if (!obj.find((v) => v.value === this.searchKey)) {
          if (this.searchKeyArr.length > 9) {
            this.searchKeyArr.pop();
          }
          let li = this.searchKeyArr;
          li.unshift({
            value: this.searchKey,
            isHistory: 1,
            timestamp: new Date().getTime(),
          });
          localStorage.setItem("serarch_History", JSON.stringify(li));
        }
      }

      window.open("#/searchresult/all?keyword=" + this.searchKey);
    },
    //删除搜索历史记录
    clearHistory(id) {
      for (let i = 0; i < this.searchKeyArr.length; i++) {
        if (i == id) {
          this.searchKeyArr.splice(i, 1);
        }
      }

      let li = this.searchKeyArr;
      localStorage.setItem("serarch_History", JSON.stringify(li));
    },
    focus() {
      this.$store.commit("isShowSearchPop", true);
    },
  },
  mounted() {
    this.getSearch();
  },
  created() {
    if (localStorage.getItem("serarch_History") !== null) {
      this.searchKeyArr = JSON.parse(localStorage.getItem("serarch_History"));
    }
  },
};
</script>

<style lang="less" scoped>
.nav-search-box {
  margin: 0 10px;
  width: 500px;
  transition: width 0.3s;
}
.nav-search {
  position: relative;
  .search-input {
    border: none;
    padding: 0 38px 0 16px;
    border-radius: 2px;
    display: block;
    height: 36px;
    border: 1px solid hsla(0, 0%, 100%, 0);
    width: 100%;
    color: #999;
    transition: all 0.2s;
    &:focus {
      color: #000;
    }
  }
}
.search-btn {
  position: absolute;
  top: 0;
  right: 0;
  margin: 0;
  padding: 0;
  width: 48px;
  height: 36px;
  border: none;
  border-radius: 2px;
  background: #e7e7e7;
  line-height: 26px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    .icon-search {
      color: #00a1d6 !important;
    }
  }
}
.icon-search {
  font-size: 18px;
  color: #505050 !important;
  transition: all 0.2s;
}
.icon-cancel {
  font-size: 12px;
  color: #999 !important;
  &:hover {
    color: #00a1d6 !important;
  }
}
.bilibili-search-history {
  position: absolute;
  width: 100%;
  background-color: #fff;
  font-size: 14px;
  padding: 10px 0;
  border: 1px solid #e5e9ef;
  margin-top: 1px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);
  border-radius: 2px;
}
.histroy-item {
  padding: 6px 10px 6px 16px;
  height: 32px;
  cursor: pointer;
  word-wrap: break-word;
  word-break: break-all;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  transition: all 0.2s ease;
  &:hover {
    background-color: #f4f4f4;
  }
  a {
    width: 100%;
    color: #222;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

@media screen and (max-width: 1190px) {
  .nav-search-box {
    display: none;
  }
}
</style>