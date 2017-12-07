import MailServices from '../services/MailServices.js';

export default {
    template: `
    <div class="msgBox">
        <ul>
            <li v-for="msg in msgs" v-if="show===msg.type" :class="{unread:!msg.isRead}" @click="msgCliked(msg.id)">
                <span v-show="msg.important">➲</span>From: {{msg.from}} &#09; To: {{msg.to}} &#09; {{msg.title}}
                <button @click.stop="deleteMsg(msg.id)">🗑</button>
            </li>
        </ul>
    </div>
    `,
    props: ['msgs','show'],
    data() {
        return {}
    },
    methods: {
        msgCliked(id){
            this.$emit('msgCliked', id)
        },
        deleteMsg(id){
            this.$emit('deleteMsg', id)
        }
    }
}