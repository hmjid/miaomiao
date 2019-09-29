import Vue from 'vue'
import Router from 'vue-router'
import movieRouter from './movie'
import MineRouter from './mine'
import CinemaRouter from './cinema'
import AdminRouter from './admin'

Vue.use(Router)

export default new Router({
  mode: 'history',
  //: process.env.BASE_URL,
  base: 'miaomiao',
  routes: [
    movieRouter,
    MineRouter,
    CinemaRouter,
    AdminRouter,
    {
      path : '/*',
      redirect : '/movie'
    }
  ]
})
