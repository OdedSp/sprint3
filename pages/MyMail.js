import MailServices from '../services/MailServices.js';


import MyInbox from '../cmps/MyInbox.js';
import MyDrafts from '../cmps/MyDrafts.js';
import MySent from '../cmps/MySent.js';
import ComposeMsg from '../cmps/ComposeMsg.js';
// import ListMsgs from '../cmps/ListMsgs.js';

export default {
    template:`
    <section>
        <aside>
            Inbox
            Sent Mail
            Drafts
        </aside>
        
        <my-inbox :msgs="msgs" @msgCliked="routeToMsg" v-show="show='inbox'"></my-inbox>
        <my-sent v-show="show='sent'></my-sent>
        <my-drafts v-show="show='drafts'></my-drafts>
        <compose-msg v-if="compose" v-show="show='compose'></compose-msg>
        <button @click="compose=!compose">🖉</button>
    </section>
    `,
    data() {
        return {
            compose: false,
            msgs: [],
            show: 'inbox'
        }
    },
    created(){
        MailServices.getMsgs(MailServices.msgsToMe)
        .then(msgs => {
            this.msgs = msgs
        })
        .catch(err => {
            console.log(err)
            this.msgs = []
        })
        console.log(MailServices.allMsgs);
    },
    methods: {
        routeToMsg(id){
            this.$router.push('/inbox/'+id)
            MailServices.changeReadStatus(id, true)
        },
    },
    components: {
        MyInbox,
        MyDrafts,
        ComposeMsg,
        MySent,
        // ListMsgs
    }
}