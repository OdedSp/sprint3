var msgsToMe = [
    {
        id: 1,
        from: 'Ofir Yamin',
        to: 'me',
        title: 'I hate Avinoam',
        text: 'Just kidding',
        isRead: true,
        important: false,
        receivedOn: Date.now()
    },
    {
        id: 2,
        from: 'Avi',
        to: 'me',
        title: 'Kill all Jews',
        text: 'Just kidding',
        isRead: false,
        important: true,
        receivedOn: Date.now()
    },
    {
        id: 3,
        from: 'Noam',
        to: 'me',
        title: 'I hate sandwiches',
        text: 'Just kidding',
        isRead: false,
        important: false,
        receivedOn: Date.now()
    }
]

var sentMsgs = [
    {
        id: 1,
        from: 'me',
        to: 'Naaman',
        title: 'Let\'s make like a grandma',
        text: 'and fuck outta here',
        isSent: true,
        important: false,
        sentOn: Date.now()
    },
    {
        id: 2,
        from: 'me',
        to: 'Shem',
        title: 'How deep is your love?',
        text: 'bla bla bla',
        isSent: true,
        important: true,
        sentOn: Date.now()
    },
]

var drafts = [
    {
        id: 1,
        from: 'me',
        to: 'Ofir Smol',
        title: 'CRUDL',
        text: 'your opinion requested',
        isSent: false,
        important: true,
        sentOn: Date.now()
    },
    {
        id: 2,
        from: 'me',
        to: 'Ben',
        title: 'Smooth criminal',
        text: 'tagadagadaga dum dum, taga dum dum, tagadaga dum dum',
        isSent: false,
        important: true,
        sentOn: Date.now()
    },
]

function getMsgs(msgs) {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{resolve(msgs)}, 700)
    });
}

function _findNextId(arr) {
    var maxId = arr.reduce((acc, msg)=>{
        return (msg.id > acc)? msg.id : acc
    }, 0);
    return maxId + 1;
}

function sendMsg (msgObj) {
    msgObj.id = _findNextId(sentMsgs)
    msgObj.isSent = true;
    msgObj.sentOn = Date.now();
    sentMsgs.push(msgObj)
}

function saveDraft (msgObj) {
    msgObj.id = _findNextId(drafts)
    drafts.push(msgObj)
}

function getMsgById(msgId, msgs) {
    return new Promise((resolve, reject)=>{
        var foundMsg = msgs.find(msg => msg.id === msgId)
        if (foundMsg) resolve(foundMsg)
        else reject();
    })
}

export default {
    getMsgs,
    sendMsg,
    saveDraft,
    msgsToMe,
    drafts,
    sentMsgs,
    getMsgById
}