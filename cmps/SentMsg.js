import MailServices from '../services/MailServices.js';

export default {
    template:`
    <section>
        <h3>{{msg.title}}</h3>
        <h6> {{msg.to}} </h6>
        <p>{{msg.sentOn}} </p>
        <p>{{msg.text}} </p>
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
        MailServices.getMsgById(msgId, MailServices.sentMsgs)
         .then(msg => this.msg = msg)
         .catch(err => {
             this.$router.push('/mail')
         })
    },
    methods: {
        deleteMsg(msgId){
            MailServices.deleteMsg(this.msg.id, MailServices.sentMsgs)
            this.$router.push('/mail')
        }
    }
}