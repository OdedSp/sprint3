var msgsToMe = [
    {
        id: 1,
        from: 'Ofir Yamin',
        to: 'me',
        title: 'I hate Avinoam',
        text: 'Just kidding',
        isRead: true,
        important: false,
        receivedOn: moment([2017, 11, 6]).fromNow()
    },
    {
        id: 2,
        from: 'Avi',
        to: 'me',
        title: 'Kill all Jews',
        text: 'Just kidding',
        isRead: false,
        important: true,
        receivedOn: moment([2017, 11, 5]).fromNow()
    },
    {
        id: 3,
        from: 'Noam',
        to: 'me',
        title: 'I hate sandwiches',
        text: 'Just kidding',
        isRead: false,
        important: false,
        receivedOn: moment([2017, 9, 6]).fromNow()
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
        sentOn: moment([2001, 8, 11]).fromNow()
    },
    {
        id: 2,
        from: 'me',
        to: 'Shem',
        title: 'How deep is your love?',
        text: 'bla bla bla',
        isSent: true,
        important: true,
        sentOn: moment([1990, 10, 1]).fromNow()
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
        sentOn: null
    },
    {
        id: 2,
        from: 'me',
        to: 'Ben',
        title: 'Smooth criminal',
        text: 'tagadagadaga dum dum, taga dum dum, tagadaga dum dum',
        isSent: false,
        important: true,
        sentOn: null
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
    msgObj.sentOn = moment(Date.now()).fromNow();
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

function deleteMsg(msgId, msgs) {
    return new Promise((resolve, reject)=>{
        var msgIdx = msgs.findIndex(msg => msg.id === msgId)
        msgs.splice(msgIdx, 1);
        resolve()
    });
}

function changeReadStatus(msgId, status) {
    var msg = getMsgById(msgId,msgsToMe);
    var msgIdx = msgsToMe.findIndex(msg => msg.id === msgId)
    // console.log(msgIdx)
    // console.log(msgsToMe[msgIdx].isRead);
    // console.log(status)
    msgsToMe[msgIdx].isRead = status
    // console.log(msgsToMe[msgIdx].isRead);
}

export default {
    getMsgs,
    sendMsg,
    saveDraft,
    msgsToMe,
    drafts,
    sentMsgs,
    getMsgById,
    changeReadStatus,
    deleteMsg
}