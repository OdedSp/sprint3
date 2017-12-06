import MailServices from '../services/MailServices.js';

export default {
    template: `
    <div class="inbox">
        <ul>
            <li v-for="msg in msgs" :class="{unread:msg.isRead}" @click="routeToMsg(msg.id)">
                <span v-if="msg.important">🔖</span>From: {{msg.from}} - {{msg.title}}
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
            //make message unread
        }
    }
}