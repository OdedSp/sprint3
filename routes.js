import HomePage from './pages/HomePage.js'
import MyNotes from './pages/MyNotes.js'
import MyMail from './pages/MyMail.js'
import InboxMsg from './cmps/InboxMsg.js'
import SentMsg from './cmps/SentMsg.js'
import EditDraft from './cmps/EditDraft.js'
import PlaceMgMt from './pages/PlaceMgmt.js'

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
        path: '/inbox/:msgId',
        component: InboxMsg
    },
    {
        path: '/sent/:msgId',
        component: SentMsg
    },
    {
        path: '/drafts/:msgId',
        component: EditDraft
    },
];

export default routes;