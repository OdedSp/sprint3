import MailServices from '../services/MailServices.js';

export default {
    template:`
    <section>
            <input type="text" placeholder="Recipient" v-model="msg.to" required>
            <input type="text" placeholder="Title" v-model="msg.title" required>
            <input type="checkbox" id="important" v-model="msg.important"><label for="important">Important?</label>
            <textarea cols="30" rows="10" placeholder="Type your message" v-model="msg.text"></textarea>
            <button @click="saveDraft">💾</button><button @click="sendMsg">🖅</button><button @click="deleteMsg">🗑</button>
    </section>
    `,
    data() {
        return {
           msg: null 
        }
    },
    created() {
        var msgId = +this.$route.params.msgId
        MailServices.getMsgById(msgId, MailServices.drafts)
         .then(msg => this.msg = msg)
         .catch(err => {
             this.$router.push('/mail')
         })
    },
    methods: {
        saveDraft(){
            MailServices.deleteMsg(this.msg.id, MailServices.drafts)
            MailServices.saveDraft(this.msg)
            //Needs to move to drafts and not to Mail
            this.$router.push('/drafts')
        },
        sendMsg (){
            MailServices.deleteMsg(this.msg.id, MailServices.drafts)
            MailServices.sendMsg(this.msg)
            //Needs to move to sent and not to Mail
            this.$router.push('/sent')
        },
        deleteMsg(){
            MailServices.deleteMsg(this.msg.id, MailServices.drafts)
            this.$router.push('/inbox')
        }
    }
}