import MailServices from '../services/MailServices.js';

import MsgBox from '../cmps/MsgBox.js';
import ComposeMsg from '../cmps/ComposeMsg.js';
import ShowMsg from '../cmps/ShowMsg.js';

export default {
    template: `
    <section>
        <aside>
            <p @click="folderClicked('inbox')">Inbox</p>
            <p @click="folderClicked('sent')">Sent Mail</p>
            <p @click="folderClicked('drafts')">Drafts</p>
        </aside>
        
        <input type="text" v-model="searchTerm">
        <msg-box :msgs="msgs" :show="show" @msgCliked="routeToMsg" @deleteMsg="deleteMsg"></msg-box>
        <show-msg :selectedMsg="selectedMsg" v-if="selectedMsg"></show-msg>
        <compose-msg v-show="compose"></compose-msg>
        <button @click="compose=!compose" @msgSent="compose=false">🖉</button>
    </section>
    `,
    data() {
        return {
            compose: false,
            msgs: [],
            show: 'inbox',
            searchTerm: '',
            selectedMsg: null
        }
    },
    created() {
        MailServices.getMsgs()
            .then(res => {
                this.msgs = res
            })
            .catch(err => {
                console.log(err)
                this.msgs = []
            })
        if (this.$route.params.folder === null) {
            this.show = 'inbox'
        } else this.show = this.$route.params.folder
    },
    methods: {
        routeToMsg(id) {
            MailServices.getMsgById(id)
                .then(msg => this.selectedMsg = msg)
                .then (this.$router.push(`/mail/message/` + id))
                .catch(err => {
                    console.log('something happened')
                })
            MailServices.changeReadStatus(id, true)
        },
        deleteMsg(id) {
            MailServices.deleteMsg(id)
        },
        changeView(folder) {
            this.show = folder
        },
        folderClicked(folder) {
            console.log(folder);
            this.$router.push(`/mail/` + folder)
            this.changeView(folder)
        }
    },
    components: {
        ComposeMsg,
        ShowMsg,
        // ListMsgs,
        MsgBox
    }
}