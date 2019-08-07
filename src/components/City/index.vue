<template>
	<div class="city_body">
		<div class="city_list">
			<Loading v-if="isloading" />
			<Scrollder v-else ref="city_list">
				<div>
					<div class="city_hot">
						<h2>热门城市</h2>
						<ul class="clearfix">
							<li v-for="item in hoslist" :key="item.id" @tap="handleToCity(item.nm,item.id)">{{item.nm}}</li>
						</ul>
					</div>
					<div class="city_sort" ref="city_sort">
						<div v-for="item in citylist" :key="item.id">
							<h2>{{item.index}}</h2>
							<ul>
								<li v-for="name in item.list" :key="name.id" @tap="handleToCity(item.nm,item.id)">{{name.nm}}</li>
							</ul>
						</div>
					</div>

				</div>
			</Scrollder>
		</div>
		<div class="city_index">
			<ul>
				<li v-for="(item,index) in citylist" :key="item.id" @touchstart="handletoindex(index)">{{item.index}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
	
	export default {
		name: 'City',
		data() {
			return {
				citylist: [],
				hoslist: [],
				isloading:true
			}
		},
		mounted() {
			var citylist = window.localStorage.getItem('citylist')
			var hoslist = window.localStorage.getItem('hoslist')
			
			if(citylist && hoslist){
				this.citylist = JSON.parse(citylist);
				this.hoslist = JSON.parse(hoslist);
				this.isloading=false;
			}else{
				this.axios.get('/api/cityList').then((res) => {
					var msg = res.data.msg;
					if (msg === 'ok') {
						var {citylist,hoslist}=this.formatcitylist(res.data.data.cities)
						this.isloading=false;
						this.citylist = citylist;
						this.hoslist = hoslist;
						window.localStorage.setItem('citylist',JSON.stringify(citylist))
						window.localStorage.setItem('hoslist',JSON.stringify(hoslist))
					}
				})
			}
		},
		methods: {
			formatcitylist(cities) {
				var citylist = [];
				var hoslist = [];
				for (var i = 0; i < cities.length; i++) {
					if (cities[i].isHot === 1) {
						hoslist.push({
							nm: cities[i].nm,
							id: cities[i].id
						})
					}
					var firstletter = cities[i].py.substring(0, 1).toUpperCase();
					if (toCom(firstletter)) {
						citylist.push({
							index: firstletter,
							list: [{
								nm: cities[i].nm,
								id: cities[i].id
							}]
						})
					} else { //累加到已有index中
						for (var j = 0; j < citylist.length; j++) {
							if (citylist[j].index === firstletter) {
								citylist[j].list.push({
									nm: cities[i].nm,
									id: cities[i].id
								})
							}
						}
					}
				}

				function toCom(firstletter) {
					for (var i = 0; i < citylist.length; i++) {
						if (citylist[i].index === firstletter) {

							return false;
						}
					}
					return true;
				}
				citylist.sort(function(x, y) {
					return ((x.index < y.index) ? -1 : (x.index > y.index) ? 1 : 0)
				})
				window.localStorage.setItem('citylist',JSON.stringify(citylist))
				window.localStorage.setItem('hoslist',JSON.stringify(hoslist))
				return {
					citylist,
					hoslist
				}
			},

			handletoindex(index) {

				var h2 = this.$refs.city_sort.getElementsByTagName('h2');
				//this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
				this.$refs.city_list.toScrollTop(-h2[index].offsetTop);

			},
			handleToCity(nm,id){
            this.$store.commit('city/CITY_INFO',{ nm , id });
            window.localStorage.setItem('nowNm',nm);
            window.localStorage.setItem('nowId',id);
            this.$router.push('/movie/Nowplaying');
			}

		}
	}
</script>

<style scoped>
	#content .city_body {
		margin-top: 45px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		width: 100%;
		position: absolute;
		top: 0;
		bottom: 0
	}

	.city_body .city_list {
		-webkit-box-flex: 1;
		-ms-flex: 1;
		flex: 1;
		overflow: auto;
		background: #fff5f0
	}

	.city_body .city_list::-webkit-scrollbar {
		background-color: transparent;
		width: 0
	}

	.city_body .city_hot {
		margin-top: 20px
	}

	.city_body .city_hot h2 {
		padding-left: 15px;
		line-height: 30px;
		font-size: 14px;
		background: #f0f0f0;
		font-weight: 400
	}

	.city_body .city_hot ul li {
		float: left;
		background: #fff;
		width: 29%;
		height: 33px;
		margin-top: 15px;
		margin-left: 3%;
		padding: 0 4px;
		border: 1px solid #e6e6e6;
		border-radius: 3px;
		line-height: 33px;
		text-align: center;
		-webkit-box-sizing: border-box;
		box-sizing: border-box
	}

	.city_body .city_sort div {
		margin-top: 20px
	}

	.city_body .city_sort h2 {
		padding-left: 15px;
		line-height: 30px;
		font-size: 14px;
		background: #f0f0f0;
		font-weight: 400
	}

	.city_body .city_sort ul {
		padding-left: 10px;
		margin-top: 10px
	}

	.city_body .city_sort ul li {
		line-height: 30px
	}

	.city_body .city_index {
		width: 20px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-ms-flex-direction: column;
		flex-direction: column;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
		text-align: center;
		border-left: 1px solid #e6e6e6
	}
</style>
