import MailServices from '../services/MailServices.js';

export default {
    template:`
    <section>
        <h3>{{msg.title}}</h3>
        <h6> {{msg.from}} </h6>
        <p>{{msg.receivedOn}} </p>
        <p>{{msg.text}} </p>
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
        //  .catch(err => {
        //      this.$router.push('/mail')
        //  })
    },
    methods: {
        
    }
}