import Vue from 'vue'
import Router from 'vue-router'
import movieRouter from './movie'
import MineRouter from './mine'
import CinemaRouter from './cinema'

Vue.use(Router)

export default new Router({
  mode: 'history',
  //: process.env.BASE_URL,
  base: 'miaomiao',
  routes: [
    movieRouter,
	MineRouter,
	CinemaRouter,
	{
		path : '/*',
		redirect : '/movie'
	}
  ]
})
