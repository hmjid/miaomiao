<template>
	<div class="movie_body">
		<Loading v-if="isLoading" />
		<Scrollder v-else>
			<ul>
				<li class="pullDown"></li>
				<li v-for="item in cominglist">
					<div class="pic_show"><img :src="item.img|setwh('128.180')"></div>
					<div class="info_list">
						<h2>{{item.nm}} <img v-if="item.version" src="@/assets/3d.png"
							 alt=""></h2>
						<p><span class="person">{{item.wish}}</span> 人想看</p>
						<p>主演: {{item.star}}</p>
						<p>{{item.rt}} 上映</p>
					</div>
					<div class="btn_pre">
                    预售
					</div>
				</li>
			</ul>
		</Scrollder>
	</div>
</template>

<script>
export default{
	name:'Comingsoon',
	data(){
		return {
			cominglist:[],
            isLoading : true,
            prevCityId : -1
		}
	},
	mounted(){
        var cityId = this.$store.state.city.id;
        if( this.prevCityId === cityId ){ return; }
        this.isLoading = true;
        this.axios.get('/api/movieComingList?cityId='+cityId).then((res)=>{
            var msg = res.data.msg;
            if(msg === 'ok'){
                this.cominglist = res.data.data.comingList;
                this.isLoading = false;
                this.prevCityId = cityId;
            }
        })
	}
}
</script>

<style scoped>
	#content .movie_body{-webkit-box-flex:1;-ms-flex:1;flex:1;overflow:auto}.movie_body ul{margin:0 12px;overflow:hidden}.movie_body ul li{margin-top:12px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;border-bottom:1px solid #e6e6e6;padding-bottom:10px}.movie_body .pic_show{width:64px;height:90px}.movie_body .pic_show img{width:100%}.movie_body .info_list{margin-left:10px;-webkit-box-flex:1;-ms-flex:1;flex:1;position:relative}.movie_body .info_list h2{font-size:17px;line-height:24px;width:150px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.movie_body .info_list p{font-size:13px;color:#666;line-height:22px;width:200px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.movie_body .info_list .grade{font-weight:700;color:#faaf00;font-size:15px}.movie_body .info_list img{width:50px;position:absolute;right:10px;top:5px}.movie_body .btn_mall,.movie_body .btn_pre{width:47px;height:27px;line-height:28px;text-align:center;background-color:#f03d37;color:#fff;border-radius:4px;font-size:12px;cursor:pointer}.movie_body .btn_pre{background-color:#3c9fe6}.movie_body .pullDown{margin:0;padding:0;border:none}
</style>
