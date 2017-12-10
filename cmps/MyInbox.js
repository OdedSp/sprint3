import MailServices from '../services/MailServices.js';

export default {
    template: `
    <div class="inbox">
<<<<<<< HEAD
        <ul>
            <li v-for="msg in msgs" :class="{unread:!msg.isRead}" @click="msgCliked(msg.id, 'inbox')">
                <span v-show="msg.important">➲</span>From: {{msg.from}} - {{msg.title}}
                <button @click.stop="deleteMsg(msg.id, 'inbox')">🗑</button>
            </li>
        </ul>
=======
    <div class="card">
    <ul>
        <li v-for="msg in msgs" :class="{unread:!msg.isRead}">
            <header class="card-header">
                <p @click="msgCliked(msg.id)" class="card-header-title" >
                    <span v-show="msg.important">➲</span>From: {{msg.from}} - {{msg.title}}
                </p>
                    <a href="#" class="card-header-icon" @click="dropDown = !dropDown">
                    ▼
                  </a>
            </header>
                        <div class="card-content" v-if="dropDown">
                            <div class="content">
                            </div>
                        </div>
                    <div class="card-footer">
                        <a href="#" class="card-footer-item" @click="deleteMsg(msg.id)">🗑</a>
                        <a href="#" class="card-header-icon">more options</a>
                    </div>
        </li>
    </ul>
    </div>
>>>>>>> c3c61947b049b006b899ea04f41fb2a4ac5d7fae
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
            dropDown:false
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