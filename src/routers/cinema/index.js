export default {
	path: '/cinema',
	component : () => import('@/views/Cinema'),
	children : [
		{
		  path: '/',
		  redirect: 'Clist'
		},
		{
			path : 'Clist',
			component :  () => import('@/components/Clist')
		}
	]
}