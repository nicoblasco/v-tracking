import Vue from 'vue'
import Router from 'vue-router'

//apps
import Dashboard from '../views/apps/Dashboard.vue'
import Admin from '../router/admin'
import Tipification from '../router/typifications'
import System from '../router/system'

//pages
import Login from '../views/pages/authentication/Login.vue'
import Profile from '../views/pages/Profile.vue'
import NotFound from '../views/pages/NotFound.vue'
import Vehicles from '../views/pages/Vehicles.vue'
import Devices from '../views/pages/Devices.vue'


//ui
import Visor from '../views/ui/Maps/GMap.vue'

import layouts from '../layout'
import store from '../store'

Vue.use(Router)


const router = new Router({
	mode: 'history',
	//base: '/sub-path/',
	routes: [
		{
			path: '/',
			alias: '/dashboard',
			name: 'dashboard',
			component: Dashboard,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['app']
			}
		},
		{
			path: '/visor',
			name: 'visor',
			component: Visor,
			meta: {
				auth: true,
//				layout: layouts.navLeft,
				layout: layouts.contenOnlyNothing,				
				//searchable: true,
				title: 'Visor',
				tags: ['app']
			}
		},
		{
			path: '/devices',
			name: 'devices',
			component: Devices,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['pages']
			}
		},
		{
			path: '/vehicles',
			name: 'vehicles',
			component: Vehicles,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['pages']
			}
		},
		{
			path: '/profile',
			name: 'profile',
			component: Profile,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['pages']
			}
		},
		{
			path: '/login',
			name: 'login',
			component: Login,
			meta: {
				layout: layouts.contenOnly
			}
		},
		{ 
			path: '/logout',
			beforeEnter (to, from, next) {
				auth.logout()
				next({path:'/login'})
			}
		},
		{
			path: '*',
			name: 'not-found',
			component: NotFound,
			meta: {
				layout: layouts.contenOnly
			}
		},
		Admin,
		Tipification,
		System
	]
})


const l = {
	contenOnly(){
		store.commit('setLayout', layouts.contenOnly)
	},
	contenOnlyNothing(){
		store.commit('setLayout', layouts.contenOnlyNothing)
	},	
	navLeft(){
		store.commit('setLayout', layouts.navLeft)
	},
	navSystem(){
		store.commit('setLayout', layouts.navSystem)
	},
	navRight(){
		store.commit('setLayout', layouts.navRight)
	},
	navTop(){
		store.commit('setLayout', layouts.navTop)
	},
	navBottom(){
		store.commit('setLayout', layouts.navBottom)
	},
	set(layout){
		store.commit('setLayout', layout)
	}
}

//insert here login logic
const auth = {
	loggedIn() {
		return store.getters.isLogged
	},
	logout() {
		store.commit('setLogout')
	}
}


router.beforeEach((to, from, next) => {
	let authrequired = false
	if(to && to.meta && to.meta.auth)
		authrequired = true
		
	//console.log('authrequired', authrequired, to.name)

	if(authrequired) {
		if(auth.loggedIn()) {
			if(to.name === 'login') {
				window.location.href = '/'
				return false
			} else { 
				next()
			}
		} else {
			if(to.name !== 'login'){
				window.location.href = '/login'
				return false
			}
			next()
		}
	} else {
		if(auth.loggedIn() && to.name === 'login'){
			window.location.href = '/'
			return false
		} else {
			next()
		}
	}

	if(to && to.meta && to.meta.layout){
		l.set(to.meta.layout)
	}	
})

router.afterEach((to, from) => {
	setTimeout(()=>{
		store.commit('setSplashScreen', false)
	}, 500)
})

export default router