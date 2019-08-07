<template>
	<div id = "main">
		<Header :title="title"/>
		<Login/>
		<TabBer/>
	</div>
</template>

<script>
import Header from '@/components/Header'
import TabBer from '@/components/TabBer'
import Login from '@/components/Login'
export default {
	name : 'Mine',
	data () {
	  return {
		title:'我的喵喵'
	  }
	},
	components : {
		Header,
		TabBer,
		Login
	}
}
</script>

<style>
</style>
