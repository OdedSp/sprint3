import HomePage from './pages/HomePage.js'
import MyNotes from './pages/MyNotes.js'
import MyMail from './pages/MyMail.js'
import ShowMsg from './cmps/ShowMsg.js'
import SentMsg from './cmps/SentMsg.js'
import EditDraft from './cmps/EditDraft.js'
import PlaceMgMt from './pages/PlaceMgmt.js'
import PlaceDetail from './pages/PlaceDetail.js'

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
        component: PlaceMgMt
    },
    {
        path: '/mail/message/:msgId',
        component: MyMail
    },
    {
        path: '/places/:placeId',
        component: PlaceDetail
    },
    {
        path: '/mail/:folder',
        component: MyMail
    }
];

export default routes;