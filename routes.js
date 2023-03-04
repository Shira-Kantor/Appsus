import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'
// import HomePageBook from './ex-books-vue/pages/HomePageBook.js'
import BookIndex from './ex-books-vue/pages/BookIndex.js'
import BookDetails from './ex-books-vue/pages/BookDetails.js'
import BookEdit from './ex-books-vue/pages/BookEdit.js'
import BookAdd from './ex-books-vue/pages/BookAdd.js'
// import NoteDetails from './apps/keep/pages/NoteDetails.js'
import NoteIndex from './apps/keep/pages/NoteIndex.js'
import NoteEdit from './apps/keep/cmps/NoteEdit.js'
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
			path: '/note',
			component: NoteIndex,
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
            path: '/note/edit/:noteId?',
            component: NoteEdit
        },
		// {
		// 	path: '/email/edit/:emailId?',
		// 	component: EmailEdit,
		// },
		{
			path: '/email/edit',
			component: MailEdit,
		},
		{
			path: '/book',
			component: BookIndex,
		},
        {
            path: '/book/:bookId',
            component: BookDetails
        },
        {
            path: '/book/edit/:bookId?',
            component: BookEdit
        },
        {
            path: '/book/addBook',
            component: BookAdd
        },
		{
			path: '/:catchAll(.*)',
			component: HomePage,
		},
	],
}

export const router = createRouter(routerOptions)
