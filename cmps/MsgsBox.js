import MailServices from '../services/MailServices.js';

export default {
    template: `
    <div class="MsgsBox">
        <ul>
            <li v-for="msg in msgs" v-if="(show===msg.type || show==='search')" :class="{unread:!msg.isRead}" @click="msgCliked(msg.id)">
                <span v-show="msg.important">➲</span>From: {{msg.from}} &#09; To: {{msg.to}} &#09; {{msg.title}}
                <button @click.stop="deleteMsg(msg.id)">🗑</button>
                <button v-show="msg.type==='inbox'" @click.stop="markUnread(msg.id)">🖂</button>
            </li>
        </ul>
    </div>
    `,
    props: ['msgs','show'],
    methods: {
        msgCliked(id){
            this.$emit('msgCliked', id)
        },
        deleteMsg(id){
            this.$emit('deleteMsg', id)
        },
        markUnread(id){
            this.$emit('markUnread', id)
        }
    }
}