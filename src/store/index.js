import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userinfo: {},// 保存 获取到的用户信息
    isLogin: null, //判断是否登录
    isShowSearchPop: false, //判断是否显示搜索建议或者历史记录
    router: { 'name': 'all', 'index': 0 },//下拉列表默认词 的 key
    allNum: [],//搜索结果页面 各个板块的数量num
    showNum: true,//搜索结果页面 是否显示各个板块的数量num 
  },
  mutations: {
    userinfo(state, userinfo) {
      state.userinfo = userinfo;
    },
    isLogin(state, isLogin) {
      state.isLogin = isLogin;
    },
    isShowSearchPop(state, isShowSearchPop) {
      state.isShowSearchPop = isShowSearchPop;
    },
    router(state, router) {
      state.router = router;
    },
    allNum(state, allNum) {
      state.allNum = allNum;
    },
    showNum(state, showNum) {
      state.showNum = showNum;
    },
  },
  actions: {
  },
  modules: {
  }
})
