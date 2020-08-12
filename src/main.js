import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//导入全局样式表
import './assets/css/global.css'
import './assets/css/popover.less'
import './assets/bilifont/iconfont.js'

import "./assets/js/gt.js"

Vue.config.productionTip = false

//导入全局过滤器
import * as filters from './assets/js/filters.js'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
})

//RSA加密
import JSEncrypt from 'jsencrypt'
//JSEncrypt加密方法
Vue.prototype.$encryptedData = function (publicKey, data) {
  //new一个对象
  let encrypt = new JSEncrypt()
  //设置公钥
  encrypt.setPublicKey(publicKey)
  //password是要加密的数据,此处不用注意+号,因为rsa自己本身已经base64转码了,不存在+,全部是二进制数据
  let result = encrypt.encrypt(data)
  return result
}

import axios from 'axios'
import './plugins/element.js'
Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
