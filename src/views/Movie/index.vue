<template>
	<div id = "main">
		<Header :title="title"/>
			<div id="content">
				<div class="movie_menu">
					<router-link tag="div" to="/movie/city" class="city_name"><span>{{$store.state.city.nm}}</span><i class="iconfont icon-lower-triangle"></i></router-link>
					<div class="hot_swtich">
						<router-link tag="div" to="/movie/Nowplaying" class="hot_item">正在热映</router-link>
						<router-link tag="div" to="/movie/comingsoon" class="hot_item">即将上映</router-link>
					</div>
					<router-link tag="div" to="/movie/search" class="search_entry"><i class="iconfont icon-sousuo"></i></router-link>
				</div>
				<keep-alive>
					<router-view />
				</keep-alive>
			</div>
		<TabBer/>
		<router-view name="detail" />
	</div>
</template>

<script>
import Header from '@/components/Header'
import TabBer from '@/components/TabBer'
import { messageBox } from '@/components/Js';
export default {
	name : 'Movie',
	data () {
	  return {
		title:'喵喵电影'
	  }
	},
	components : {
		Header,
		TabBer,
		messageBox
	},
    mounted(){
        setTimeout(()=>{
            this.axios.get('/api/getLocation').then((res)=>{
                var msg = res.data.msg;
                if(msg === 'ok'){

                    var nm = res.data.data.nm;
                    var id = res.data.data.id;
                    if( this.$store.state.city.id == id ){return;}
                    messageBox({
                        title : '定位',
                        content : nm,
                        cancel : '取消',
                        ok : '切换定位',
                        handleOk(){
                            window.localStorage.setItem('nowNm',nm);
                            window.localStorage.setItem('nowId',id);
                            window.location.reload();
                        }
                    });
                }
            });
        },3000);
       
    }
}
</script>

<style>
</style>
