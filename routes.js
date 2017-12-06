<<<<<<< HEAD
import HomePage from './pages/HomePage.js'
import MyNotes from './pages/MyNotes.js'
import MyMail from './pages/MyMail.js'
import MyPlaces from './pages/MyPlaces.js'
import InboxMsg from './pages/InboxMsg.js'

const routes = [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/notes',
        component: MyNotes
    },
    {
        path: '/mail',
        component: MyMail
    },
    {
        path: '/places',
        component: MyPlaces
    },
    {
        path: '/inbox/:msgId',
        component: InboxMsg
    },
=======
import PlaceMgMt from './pages/PlaceMgmt.js'

const routes = [
    {
        path: '/Place-Mangment',
        component : PlaceMgMt
    },

>>>>>>> 65577baa0cfdea620972f6d9a1d7181a5ee961d4
];

export default routes;