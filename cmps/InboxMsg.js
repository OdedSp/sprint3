import MailServices from '../services/MailServices.js';

export default {
    template:`
    <section>
        <h3>{{msg.title}}</h3>
        <h6> {{msg.from}} </h6>
        <p>{{msg.receivedOn}} </p>
        <p>{{msg.text}} </p>
        <button @click="markUnread">🖂</button>
        <button @click="deleteMsg">🗑</button>
    </section>
    `,
    data() {
        return {
           msg: null 
        }
    },
    created() {
        var msgId = +this.$route.params.msgId
        MailServices.getMsgById(msgId, MailServices.msgsToMe)
         .then(msg => this.msg = msg)
         .catch(err => {
             this.$router.push('/mail')
         })
    },
    methods: {
        markUnread(){
            MailServices.changeReadStatus(this.msg.id, false)
            this.$router.push('/mail')
        },
        deleteMsg(msgId){
            MailServices.deleteMsg(this.msg.id, MailServices.msgsToMe)
            this.$router.push('/mail')
        }
    }
}