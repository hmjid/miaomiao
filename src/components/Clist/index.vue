<template>
	<div class="cinema_body">
		<Loading v-if="isloading" />
		<Scrollder v-else>
			<ul style="transition-duration: 0ms;">
				<li style="pointer-events: auto;" v-for="item in yylist" :key="item.id">
					<div><span>{{item.nm}}</span><span class="q">
					<span class="price">{{item.sellPrice}}</span>
					元起</span></div>
					<div class="address"><span>{{item.addr}}</span><span>{{item.distance}}</span></div>
					<div class="card">
						<div v-for="(val,key) in item.tag" v-if="val===1" :key="key" :class="key|classcard">
						{{key,val|formatcard}}
						</div>	
					</div>

				</li>
			</ul>
		</Scrollder>
	</div>

</template>

<script>
export default {
	name: 'Clist',
	data() {
		return {
			yylist: [],
			isloading:true,
			prevCityId : -1
		}
	},
	activated() {
		var cityId = this.$store.state.city.id;
		if( this.prevCityId === cityId ){ return; }
		this.isloading = true;
        this.axios.get('/api/cinemaList?cityId='+cityId).then((res)=>{
            var msg = res.data.msg;
            if(msg === 'ok'){
                this.yylist = res.data.data.cinemas;
                this.isloading = false;
                this.prevCityId = cityId
            }
        });
		
	},
	filters:{
		formatcard(key,val){
			var card=[
				{key : 'allowRefund',value:'改签'},
				{key : 'buyout',value:''},
				{key : 'cityCardTag',value:''},
				{key : 'deal',value:''},
				{key : 'endorse',value:'退'},
				{key : 'hallTypeVOList',value:''},
				{key : 'sell',value:'改签'},
				{key : 'snack',value:'小吃'},
				{key : 'vipTag',value:val}
			];
			for (var i=0;i<card.length;i++) {
				if(card[i].key===key){
					return card[i].value;
				}
			}
			return '';
		},
		classcard(key){
			var card=[
				{key : 'allowRefund',value:'bl'},
				{key : 'buyout',value:'or'},
				{key : 'cityCardTag',value:'or'},
				{key : 'deal',value:'or'},
				{key : 'endorse',value:'bl'},
				{key : 'hallTypeVOList',value:'or'},
				{key : 'sell',value:'bl'},
				{key : 'snack',value:'or'},
				{key : 'vipTag',value:'or'}
			];
			for (var i=0;i<card.length;i++) {
				if(card[i].key===key){
					return card[i].value;
				}
			}
			return '';
		}
	}
}
</script>

<style scoped>
#content .cinema_body{-webkit-box-flex:1;-ms-flex:1;flex:1;overflow:auto}.cinema_body ul{padding:20px}.cinema_body li{border-bottom:1px solid #e6e6e6;margin-bottom:20px}.cinema_body div{margin-bottom:10px}.cinema_body .q{font-size:11px;color:#f03d37}.cinema_body .price{font-size:18px}.cinema_body .address{font-size:13px;color:#666}.cinema_body .address span:nth-of-type(2){float:right}.cinema_body .card{display:-webkit-box;display:-ms-flexbox;display:flex}.cinema_body .card div{padding:0 3px;height:15px;line-height:15px;border-radius:2px;color:#f90;border:1px solid #f90;font-size:13px;margin-right:5px}.cinema_body .card div.or{color:#f90;border:1px solid #f90}.cinema_body .card div.bl{color:#589daf;border:1px solid #589daf}
</style>
