<template>
	<div id="main">
		<Header :title="title" />
		<div id="content">
			<div class="cinema_menu">
				<div class="city_switch">
					全城 <i class="iconfont icon-lower-triangle"></i></div>
				<div class="brand_swtich">
					品牌 <i class="iconfont icon-lower-triangle"></i></div>
				<div class="feature_switch">
					特色 <i class="iconfont icon-lower-triangle"></i></div>
			</div>
			<keep-alive>
				<router-view />
			</keep-alive>
		</div>
		<TabBer />
	</div>
</template>

<script>
	import Header from '@/components/Header'
	import TabBer from '@/components/TabBer'
	export default {
		name: 'Cinema',
		data() {
			return {
				title: '喵喵影院'
			}
		},
		components: {
			Header,
			TabBer
		}
	}
</script>

<style scoped>
	#content .cinema_menu{width:100%;height:45px;border-bottom:1px solid #e6e6e6;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-pack:distribute;justify-content:space-around;-webkit-box-align:center;-ms-flex-align:center;align-items:center;background:#fff}
</style>
