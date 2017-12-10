import MailServices from '../services/MailServices.js';

export default {
    template:`
    <section>
        <div class="editMsg" v-if="selectedMsg.type==='drafts'">
            <input type="text" placeholder="Recipient" v-model="selectedMsg.to" required>
            <input type="text" placeholder="Title" v-model="selectedMsg.title" required>
            <input type="checkbox" id="important" v-model="selectedMsg.important"><label for="important">Important?</label>
            <textarea cols="30" rows="10" placeholder="Type your message" v-model="selectedMsg.text"></textarea>
            <button @click="saveDraft">💾</button>
            <button @click="sendMsg">🖅</button>
            <button @click="deleteMsg">🗑</button>
        </div>
        <div class="viewMsg" v-else>
            <h3>{{selectedMsg.title}}</h3>
            <h6> {{selectedMsg.from}} </h6>
            <p>{{selectedMsg.receivedOn}} </p>
            <p>{{selectedMsg.text}} </p>
            <button v-if="selectedMsg.type==='inbox'" @click="markUnread">🖂</button>
            <button @click="deleteMsg">🗑</button>
        </div>
    </section>
    `,
    data() {
        return {}
    },
    props: ['selectedMsg'],
    created() {
        console.log('from showMsg', this.selectedMsg);
        // var msgId = +this.$route.params.msgId
        // MailServices.getMsgById(msgId, MailServices.inbox)
        //  .then(msg => this.msg = msg)
        //  .catch(err => {
        //      this.$router.push('/mail')
        //  })
    },
    methods: {
        markUnread(){
            this.$emit('markUnread', this.selectedMsg.id)
            this.$router.push('/mail')
        },
        deleteMsg(msgId){
            this.$emit('deleteMsg', this.selectedMsg.id)
        },
        sendMsg() {
            this.$emit('sendMsg', this.selectedMsg)
        },
        saveDraft (){
            this.$emit('saveDraft', this.selectedMsg)
        }
    }
}