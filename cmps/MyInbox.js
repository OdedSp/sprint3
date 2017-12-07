import MailServices from '../services/MailServices.js';

export default {
    template: `
    <div class="inbox">
        <ul>
            <li v-for="msg in msgs" :class="{unread:!msg.isRead}" @click="msgCliked(msg.id, 'inbox')">
                <span v-show="msg.important">➲</span>From: {{msg.from}} - {{msg.title}}
                <button @click.stop="deleteMsg(msg.id, 'inbox')">🗑</button>
            </li>
        </ul>
    </div>
    `,
    props: ['msgs'],
    // created() {
    //     MailServices.getMsgs(MailServices.inbox)
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
        msgCliked(id, folder){
            this.$emit('msgCliked', id, folder)
        },
        // routeToMsg(msgId) {
        //     this.$router.push('/inbox/'+msgId)
        //     MailServices.changeReadStatus(msgId, true)
        // },
        deleteMsg(id, folder){
            this.$emit('deleteMsg', id, folder)
            // MailServices.deleteMsg(msgId, MailServices.inbox)
        }
    }
}