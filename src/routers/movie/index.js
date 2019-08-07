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
            path : 'detail/1/:movieId',
            components : {
                default : ()=> import('@/components/Nowplaying'),
                detail : ()=> import('@/views/Movie/detail')
            },
            props : {
                detail : true
            }
        },
        {
            path : 'detail/2/:movieId',
            components : {
                default : ()=> import('@/components/Comingsoon'),
                detail : ()=> import('@/views/Movie/detail')
            },
            props : {
                detail : true
            }
        }
	]
}