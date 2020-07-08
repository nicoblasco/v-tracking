import Tipification from '../views/apps/tipification/Tipification.vue'
import Brands from '../views/apps/tipification/Brand.vue'
import Model from '../views/apps/tipification/Model.vue'

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
				modelo: {
					id: '',
					description: '',					
					enabled: true
				},
				columns: [
					{
						label: 'Id',
						field: 'id',
						type: 'number',
						tdClass: 'text-center',
						width: '50px',
						filterable: true
					},
					{
						label: 'Marca',
						field: 'description',
						type: 'text',
						tdClass: 'text-left',
						filterable: true
					},
					{
						label: 'Acciones',
						field: 'actions',
						width: '180px',
						tdClass: 'text-left',
						html: true
					}  				
				]				
			}
		},
		{
			path: 'model',
			name: 'model',
			component: Model,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				modelo: {
					id: '',
					description: '',
					vehicleBrandId: '',	
					brand:'',				
					enabled: true
				},
				columns: [
					{
						label: 'Id',
						field: 'id',
						type: 'number',
						tdClass: 'text-center',
						width: '50px',
						filterable: true
					},
					{
						label: 'Marca',
						field: 'brand',
						type: 'text',
						tdClass: 'text-left',
						filterable: true
					},					
					{
						label: 'Modelo',
						field: 'description',
						type: 'text',
						tdClass: 'text-left',
						filterable: true
					},
					{
						label: 'Acciones',
						field: 'actions',
						width: '180px',
						tdClass: 'text-left',
						html: true
					}  				
				]				
			}
		}		
	]
}

