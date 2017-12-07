import MailServices from '../services/MailServices.js';

export default {
    template: `
    <div class="inbox">
        <ul>
            <li v-for="msg in msgs" :class="{unread:!msg.isRead}">
            <div @click="msgCliked(msg.id)">
                <span v-show="msg.important">➲</span>From: {{msg.from}} - {{msg.title}}
                </div>
                <button @click="deleteMsg(msg.id)">🗑</button>
            </li>
        </ul>
    </div>
    `,
    props: ['msgs'],
    // created() {
    //     MailServices.getMsgs(MailServices.msgsToMe)
    //         .then(msgs => {
    //             this.msgs = msgs
    //         })
    //         .catch(err => {
    //             this.msgs = []
    //         })
    // },
    data() {
        return {
            // msgs: []
        }
    },
    methods: {
        msgCliked(id){
            this.$emit('msgCliked', id)
        },
        routeToMsg(msgId) {
            this.$router.push('/inbox/'+msgId)
            MailServices.changeReadStatus(msgId, true)
        },
        deleteMsg(msgId){
            MailServices.deleteMsg(msgId, MailServices.msgsToMe)
        }
    }
}