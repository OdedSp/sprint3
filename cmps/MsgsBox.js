import MailServices from '../services/MailServices.js';

export default {
    template: `
    <div class="MsgsBox">
        <ul>
            <li v-for="msg in msgs" v-if="shouldDisplay(msg)" @click="msgCliked(msg.id)" class="msg-head">
                <header class="card-header">
                    <p class="card-header-title" :class="{unread:!msg.isRead}">
                        <span v-show="msg.important">➲</span>From: {{msg.from}} &#09; To: {{msg.to}} &#09; {{msg.title}}
                    </p>
                    <a href="#" class="card-header-icon">
                    ▼
                    </a>
                    <a @click.stop="deleteMsg(msg.id)" class="card-header-icon">🗑</a>
                    <a v-show="msg.type==='inbox'" @click.stop="markUnread(msg.id)" class="card-header-icon">🖂</a>
                </header>
            </li>
        </ul>
    </div>
    `,
    props: ['msgs','show', 'statusDisplay'],
    methods: {
        msgCliked(id){
            this.$emit('msgCliked', id)
        },
        deleteMsg(id){
            this.$emit('deleteMsg', id)
        },
        markUnread(id){
            this.$emit('markUnread', id)
        },
        shouldDisplay(msg){
            if (this.show==='inbox' && this.statusDisplay!=='all') {
                return (msg.type ==='inbox' && 
                (this.statusDisplay==='read' && msg.isRead || this.statusDisplay==='unread' && !msg.isRead))    
            } else {
                return (this.show===msg.type || this.show==='search')
            }
        }
    }
}