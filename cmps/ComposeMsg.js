import MailServices from '../services/MailServices.js';

export default {
    template: `
    <section class="compose">
        <input type="text" placeholder="Recipient" v-model="blankMsg.to" required>
        <input type="text" placeholder="Title" v-model="blankMsg.title" required>
        <input type="checkbox" id="important" v-model="blankMsg.important"><label for="important">Important?</label>
        <textarea cols="30" rows="10" placeholder="Type your message" v-model="blankMsg.text"></textarea>
        <button @click="saveDraft">💾</button><button @click="sendMsg">🖅</button>
    </section>
    `,
    data () {
        return {
            blankMsg: {
                id: undefined,
                from: 'me',
                to: null,
                title: null,
                text: '',
                isSent: false,
                important: false,
                sentOn: null
            }
        }
    },
    methods: {
        sendMsg (){
            this.$emit('sendMsg', this.blankMsg)
            this.blankMsg = {
                id: undefined,
                from: 'me',
                to: null,
                title: null,
                text: '',
                isSent: false,
                important: false,
                sentOn: null
            }
        },
        saveDraft (){
            this.$emit('saveDraft', this.blankMsg)
            this.blankMsg = {
                id: undefined,
                from: 'me',
                to: null,
                title: null,
                text: '',
                isSent: false,
                important: false,
                sentOn: null
            }
            console.log(MailServices.drafts)
        }
    }
}