<template>
	<div class="movie_body">
		<Loading v-if="isloading" />
		<Scrollder v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
			<ul>
				<li class="pullDown">{{pullDownMsg}}</li>
				<li v-for="item in movelist" :key="item.id">
					<div class="pic_show"><img :src="item.img|setwh('128.180')"></div>
					<div class="info_list">
						<h2>{{item.nm}} <img v-if="item.version" src="@/assets/3d.png"
							 alt=""></h2>
						<p>观众评 <span class="grade">{{item.sc}}</span></p>
						<p>主演: {{item.star}}</p>
						<p>{{item.showInfo}}</p>
					</div>
					<div class="btn_mall">
						购票
					</div>
				</li>
			</ul>
		</Scrollder>
	</div>
</template>

<script>
import BScroll from 'better-scroll';
export default{
	name:'Nowplaying',
	data(){
		return {
			movelist:[],
			isloading:true,
			pullDownMsg:'',
			prevCityId:-1
		}
	},
	mounted(){
		var cityId=this.$store.state.city.id;
		console.log(cityId);
		if(this.prevCityId === cityId){ return ;}
		this.isloading=true; 
		this.axios.get('/api/movieOnInfoList?cityId=11').then((res)=>{
			var msg= res.data.msg;
			if(msg === 'ok'){
				this.movelist=res.data.data.movieList;
				this.isloading=false;
				this.prevCityId=cityId;
			}
			
		})
	},
	methods:{
		handleToScroll(pos){
			if( pos.y > 30){
				this.pullDownMsg='正在更新中...'
			}
		},
		handleToTouchEnd(pos){
			if( pos.y > 30){
				this.axios.get('/api/movieOnInfoList?cityId=20').then((res)=>{
					var msg= res.data.msg;
					if(msg === 'ok'){
						this.pullDownMsg='更新成功';
						setTimeout(()=> {
							this.movelist=res.data.data.movieList;
							this.pullDownMsg='';
							console.log(this.pullDownMsg)
						}, 1000);
					}
					
				})
			}
		}
	}
}
</script>

<style scoped>
	#content .movie_body{-webkit-box-flex:1;-ms-flex:1;flex:1;overflow:auto}.movie_body ul{margin:0 12px;overflow:hidden}.movie_body ul li{margin-top:12px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;border-bottom:1px solid #e6e6e6;padding-bottom:10px}.movie_body .pic_show{width:64px;height:90px}.movie_body .pic_show img{width:100%}.movie_body .info_list{margin-left:10px;-webkit-box-flex:1;-ms-flex:1;flex:1;position:relative}.movie_body .info_list h2{font-size:17px;line-height:24px;width:150px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.movie_body .info_list p{font-size:13px;color:#666;line-height:22px;width:200px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.movie_body .info_list .grade{font-weight:700;color:#faaf00;font-size:15px}.movie_body .info_list img{width:50px;position:absolute;right:10px;top:5px}.movie_body .btn_mall,.movie_body .btn_pre{width:47px;height:27px;line-height:28px;text-align:center;background-color:#f03d37;color:#fff;border-radius:4px;font-size:12px;cursor:pointer}.movie_body .btn_pre{background-color:#3c9fe6}.movie_body .pullDown{margin:0;padding:0;border:none;line-height: 30px;justify-content: center;}
</style>
