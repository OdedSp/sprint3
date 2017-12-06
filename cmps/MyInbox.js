import MailServices from '../services/MailServices.js';

export default {
    template: `
    <div class="inbox">
        <ul>
            <li v-for="msg in msgs" :class="{unread:!msg.isRead}">
            <div @click="routeToMsg(msg.id)">
                <span v-show="msg.important">➲</span>From: {{msg.from}} - {{msg.title}}
                </div>
                <button @click="deleteMsg(msg.id)">🗑</button>
            </li>
        </ul>
    </div>
    `,
    created() {
        MailServices.getMsgs(MailServices.msgsToMe)
            .then(msgs => {
                this.msgs = msgs
            })
            .catch(err => {
                this.msgs = []
            })
    },
    data() {
        return {
            msgs: []
        }
    },
    methods: {
        routeToMsg(msgId) {
            this.$router.push('/inbox/'+msgId)
            MailServices.changeReadStatus(msgId, true)
        },
        deleteMsg(msgId){
            MailServices.deleteMsg(msgId, MailServices.msgsToMe)
        }
    }
}