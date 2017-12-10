import MailServices from '../services/MailServices.js';

import MsgsBox from '../cmps/MsgsBox.js';
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
        
        <input type="text" v-model="searchTerm" @keyup="changeView">

        <div class="statusDisplay" v-show="show==='inbox'">
        <input v-model="statusDisplay" type="radio" id="all"
        name="statusDisplay" value="all" checked>
        <label for="all">All</label>
        
        <input v-model="statusDisplay" type="radio" id="read"
        name="statusDisplay" value="read">
        <label for="read">Read</label>
        
        <input v-model="statusDisplay" type="radio" id="unread"
        name="statusDisplay" value="unread">
        <label for="unread">Unread</label>
        </div>

        {{statusDisplay}}
        <msgs-box :msgs="msgs" :show="show" :searchTerm="searchTerm" :statusDisplay="statusDisplay"
        @msgCliked="routeToMsg" @deleteMsg="deleteMsg" @markUnread="markUnread">
        </msgs-box>
        <show-msg :selectedMsg="selectedMsg" v-if="selectedMsg"
        @deleteMsg="deleteMsg" @sendMsg="sendMsg" @saveDraft="saveDraft" @markUnread="markUnread">
        </show-msg>
        <compose-msg v-show="compose" @sendMsg="sendMsg" @saveDraft="saveDraft"></compose-msg>
        <button @click="compose=!compose" @msgSent="compose=false">🖉</button>
    </section>
    `,
    data() {
        return {
            compose: false,
            msgs: [],
            show: 'inbox',
            statusDisplay: 'all',
            searchTerm: '',
            selectedMsg: null,
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
                .then (MailServices.changeReadStatus(id, true))
                .catch(err => {
                    console.log('something happened')
                })
        },
        sendMsg(msg){
            MailServices.sendMsg(msg)
            if (msg.to==='me') {
                this.$router.push(`/mail/inbox/`)
            } else this.$router.push(`/mail/sent/`)
            this.compose = false
            this.selectedMsg = null
        },
        saveDraft (msg){
            MailServices.saveDraft(msg)
            this.$router.push(`/mail/drafts/`)
            this.compose = false
            this.selectedMsg = null
        },
        deleteMsg(id) {
            MailServices.deleteMsg(id)
            this.selectedMsg = null
        },
        markUnread(id){
            MailServices.changeReadStatus(id, false)
            this.selectedMsg = null
        },
        changeView() {
            if (this.searchTerm) {
                this.msgs = MailServices.search(this.searchTerm)
                this.show = 'search'
            } else {
                MailServices.getMsgs()
                .then(res => {
                    this.msgs = res
                })
                this.show = 'inbox'
            }
        },
        folderClicked(folder) {
            this.$router.push(`/mail/` + folder)
            this.show = folder
        },

    },
    components: {
        ComposeMsg,
        ShowMsg,
        // ListMsgs,
        MsgsBox
    }
}