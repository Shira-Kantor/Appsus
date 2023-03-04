import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'

import MailDetails from './apps/mail/pages/MailDetails.js'
import MailIndex from './apps/mail/pages/MailIndex.js'
import MailEdit from './apps/mail/pages/MailEdit.js'


const { createRouter, createWebHashHistory } = VueRouter

const routerOptions = {
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			component: HomePage,
		},
		{
			path: '/about',
			component: AboutUs,
		},
		{
			path: '/email',
			component: MailIndex,
		},
		{
			path: '/email/:emailId',
			component: MailDetails,
		},
		{
			path: '/email/edit',
			component: MailEdit,
		},
		{
			path: '/:catchAll(.*)',
			component: HomePage,
		},
	],
}

export const router = createRouter(routerOptions)
