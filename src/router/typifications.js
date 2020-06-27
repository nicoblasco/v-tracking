import Tipification from '../views/apps/tipification/Tipification.vue'
import Brands from '../views/apps/tipification/Brand.vue'

import layouts from '../layout'

export default {
	path: '/tipification',
	name: 'tipification',
	component: Tipification,
	meta: {
		auth: true,
		layout: layouts.navLeft
	},
	children: [
		{
			path: 'brand',
			name: 'brand',
			component: Brands,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				title: 'Marcas',
				tags: ['ecommerce', 'shop', 'products']
			}
		}
	]
}

