var msgs = [
    {
        id: 1,
        from: 'Ofir Yamin',
        to: 'me',
        title: 'I hate Avinoam',
        text: 'Just kidding',
        isSent: true,
        isRead: true,
        important: false,
        sentOn: null,
        receivedOn: moment([2017, 11, 6]).fromNow(),
        type: 'inbox'
    },
    {
        id: 2,
        from: 'Avi',
        to: 'me',
        title: 'Kill all Jews',
        text: 'Just kidding',
        isSent: true,
        isRead: false,
        important: true,
        sentOn: null,
        receivedOn: moment([2017, 11, 5]).fromNow(),
        type: 'inbox'
    },
    {
        id: 3,
        from: 'Noam',
        to: 'me',
        title: 'I hate sandwiches',
        text: 'Just kidding',
        isSent: true,
        isRead: false,
        important: false,
        sentOn: null,
        receivedOn: moment([2017, 9, 6]).fromNow(),
        type: 'inbox'
    },
    {
        id: 4,
        from: 'me',
        to: 'Naaman',
        title: 'Let\'s make like a grandma',
        text: 'and fuck outta here',
        isSent: true,
        isRead: true,
        important: false,
        sentOn: moment([2001, 8, 11]).fromNow(),
        receivedOn: null,
        type: 'sent'
    },
    {
        id: 5,
        from: 'me',
        to: 'Shem',
        title: 'How deep is your love?',
        text: 'bla bla bla',
        isSent: true,
        isRead: true,
        important: true,
        sentOn: moment([1990, 10, 1]).fromNow(),
        receivedOn: null,
        type: 'sent'
    },
    {
        id: 6,
        from: 'me',
        to: 'Ofir Smol',
        title: 'CRUDL',
        text: 'your opinion requested',
        isSent: false,
        isRead: true,
        important: true,
        sentOn: null,
        receivedOn: null,
        type: 'drafts'
    },
    {
        id: 7,
        from: 'me',
        to: 'Ben',
        title: 'Smooth criminal',
        text: 'tagadagadaga dum dum, taga dum dum, tagadaga dum dum',
        isSent: false,
        isRead: true,
        important: true,
        sentOn: null,
        receivedOn: null,
        type: 'drafts'
    }
]

function getMsgs() {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{resolve(msgs)}, 700)
    });
}

function _findNextId() {
    var maxId = msgs.reduce((acc, msg)=>{
        return (msg.id > acc)? msg.id : acc
    }, 0);
    return maxId + 1;
}

function sendMsg (msgObj) {
    msgObj.isSent = true;
    msgObj.sentOn = moment(Date.now()).fromNow();
    if (msgObj.to==='me') {
        msgObj.type = 'inbox'
    } else msgObj.type = 'sent'
    if (msgObj.id) {
        var msgIdx = msgs.findIndex(msg => msg.id === msgObj.id)
        msgs[msgIdx] = msgObj
    } else {
        msgObj.id = _findNextId(msgs)
        msgs.push(msgObj)
    }
}

function saveDraft (msgObj) {
    if (msgObj.id) {
        var msgIdx = msgs.findIndex(msg => msg.id === msgObj.id)
        msgs[msgIdx] = msgObj
    } else {
        msgObj.id = _findNextId(msgs)
        msgObj.type = 'draft'
        msgs.push(msgObj)
    }
}

function getMsgById(msgId) {
    return new Promise((resolve, reject)=>{
        var foundMsg = msgs.find(msg => msg.id === msgId)
        if (foundMsg) resolve(foundMsg)
        else reject();
    })
}

function deleteMsg(msgId) {
    return new Promise((resolve, reject)=>{
        var msgIdx = msgs.findIndex(msg => msg.id === msgId)
        msgs.splice(msgIdx, 1);
        resolve()
    });
}

function changeReadStatus(msgId, status) {
    var msg = getMsgById(msgId);
    var msgIdx = msgs.findIndex(msg => msg.id === msgId)
    // console.log(msgIdx)
    // console.log(inbox[msgIdx].isRead);
    // console.log(status)
    msgs[msgIdx].isRead = status
    // console.log(inbox[msgIdx].isRead);
}

function search(str){
    var regex = new RegExp (str, 'i')
    var res = msgs.filter(msg => (regex.test(msg.title) || regex.test(msg.text) || regex.test(msg.from) || regex.test(msg.to)))
    console.log(res)
    return res
}

export default {
    getMsgs,
    sendMsg,
    saveDraft,
    msgs,
    getMsgById,
    changeReadStatus,
    deleteMsg,
    search
}