import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userinfo: {},// 保存 获取到的用户信息
    isLogin: null, //判断是否登录
  },
  mutations: {
    userinfo(state, userinfo) {
      state.userinfo = userinfo;
    },
    isLogin(state, isLogin) {
      state.isLogin = isLogin;
    },
  },
  actions: {
  },
  modules: {
  }
})
