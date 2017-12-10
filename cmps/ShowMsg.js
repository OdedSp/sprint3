import MailServices from '../services/MailServices.js';

export default {
    template:`
    <section>
    <button class="button is-link close-btn" @click="closeMsg">X</button>
        <div class="editMsg" v-if="selectedMsg.type==='drafts'">
            <input type="text" placeholder="Recipient" v-model="selectedMsg.to" required>
            <input type="text" placeholder="Title" v-model="selectedMsg.title" required>
            <label for="important">Important? </label><input type="checkbox" id="important" v-model="selectedMsg.important">
            <textarea cols="30" rows="10" placeholder="Type your message" v-model="selectedMsg.text"></textarea>
            <a @click="saveDraft" class="card-header-icon">💾</a>
            <a @click="sendMsg" class="card-header-icon">🖅</a>
            <a @click="deleteMsg" class="card-header-icon">🗑</a>
        </div>
        <div class="viewMsg" v-else>
            <h3>{{selectedMsg.title}}</h3>
            <h6>From: {{selectedMsg.from}} </h6>
            <h6>To: {{selectedMsg.to}} </h6>
            <p>{{selectedMsg.receivedOn}} </p>
            <p>{{selectedMsg.text}} </p>
            <a v-if="selectedMsg.type==='inbox'" @click="markUnread" class="card-header-icon">🖂</a>
            <a @click="deleteMsg" class="card-header-icon">🗑</a>
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
        },
        closeMsg(){
            this.$emit('closeMsg')
        }
    }
}