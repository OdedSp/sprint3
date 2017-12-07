import MailServices from '../services/MailServices.js';

export default {
    template: `
    <div class="inbox">
        <ul>
            <li v-for="msg in msgs">
            <div @click="routeToMsg(msg.id)">
                <span v-if="msg.important">➲</span>To: {{msg.to}} - {{msg.title}}
                </div>
                <button @click="deleteMsg(msg.id)">🗑</button>
            </li>
        </ul>
    </div>
    `,
    created() {
        MailServices.getMsgs(MailServices.sentMsgs)
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
            this.$router.push('/sent/'+msgId)
        },
        deleteMsg(msgId){
            MailServices.deleteMsg(msgId, MailServices.sentMsgs)
        }
    }
}