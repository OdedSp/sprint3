import MailServices from '../services/MailServices.js';

export default {
    template: `
    <div class="inbox">
        <ul>
            <li v-for="msg in msgs" @click="routeToMsg(msg.id)">
                <span v-if="msg.important">🔖</span>To: {{msg.to}} - {{msg.title}}
            </li>
        </ul>
    </div>
    `,
    created() {
        MailServices.getMsgs(MailServices.drafts)
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
            this.$router.push('/drafts/'+msgId)
        }
    }
}