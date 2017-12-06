import MyInbox from '../cmps/MyInbox.js';
import MyDrafts from '../cmps/MyDrafts.js';
import MySent from '../cmps/MySent.js';
import ComposeMsg from '../cmps/ComposeMsg.js';

export default {
    template:`
    <section>
        <aside>
            Inbox
            Sent Mail
            Drafts
        </aside>
        <my-inbox></my-inbox>
        <my-sent></my-sent>
        <my-drafts></my-drafts>
        <compose-msg v-if="compose"></compose-msg>
        <button @click="compose=!compose">🖉</button>
    </section>
    `,
    data() {
        return {
            compose: false
        }
    },
    methods: {},
    components: {
        MyInbox,
        MyDrafts,
        ComposeMsg,
        MySent
    }
}