export default {
	path: '/movie',
	component : () => import('@/views/Movie'),
	children : [
		{
			path: '/',
			redirect: 'Nowplaying'
		},
		{
			path : 'Nowplaying',
			component :  () => import('@/components/Nowplaying')
		},
		{
			path : 'City',
			component :  () => import('@/components/City')
		},
		{
			path : 'Comingsoon',
			component :  () => import('@/components/Comingsoon')
		},
		{
			path : 'Search',
			component :  () => import('@/components/Search')
		},
		{
			path:'detail',
			components :{
				detail : () => import('@/views/Movie/detail')
			}
		}
	]
}