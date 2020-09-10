import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Search from '../views/Search.vue'
import Videos from '../views/Video.vue'
import Dplayer from '../views/Dplayer.vue'
import Searchresult from '../views/Searchresult.vue'
import All from "../components/Search/All.vue"
import Video from "../components/Search/Video.vue"
import Bangumi from "../components/Search/Bangumi.vue"
import Pgc from "../components/Search/Pgc.vue"
import Live from "../components/Search/Live.vue"
import Article from "../components/Search/Article.vue"
import Topic from "../components/Search/Topic.vue"
import Photo from "../components/Search/Photo.vue"
import Upuser from "../components/Search/Upuser.vue"

const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
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
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
  },
  {
    path: '/video',
    name: 'Videos',
    component: Videos,
  },
  {
    path: '/dplayer',
    name: 'Dplayer',
    component: Dplayer,
  },
  {
    path: '/searchresult',
    name: 'Searchresult',
    component: Searchresult,
    children: [
      {
        path: '/searchresult/all',
        component: All
      },
      {
        path: '/searchresult/video',
        component: Video
      },
      {
        path: '/searchresult/bangumi',
        component: Bangumi
      },
      {
        path: '/searchresult/pgc',
        component: Pgc
      },
      {
        path: '/searchresult/live',
        component: Live
      },
      {
        path: '/searchresult/article',
        component: Article
      },
      {
        path: '/searchresult/topic',
        component: Topic
      },
      {
        path: '/searchresult/upuser',
        component: Upuser
      },
      {
        path: '/searchresult/photo',
        component: Photo
      },
    ]
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
