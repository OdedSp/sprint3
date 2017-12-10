import MailServices from '../services/MailServices.js';

export default {
    template: `
    <div class="inbox">
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
            dropDown:false
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