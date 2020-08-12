import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})


// router.beforeEach((to, from, next) => {
//   //to 将要访问的路径
//   //from 从哪个路径来的
//   if (to.path == '/login') {
//     if (this.$store.state.isLogin == 0) return next('/')
//   }
//   next()
// })

export default router
