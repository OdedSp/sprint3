var notes = [
    {
        noteId: 101,
        title: 'my first note',
        text: 'weelcome to Naaman Keeper weelcome to Naaman Keeper weelcome to Naaman Keeper weelcome to Naaman Keeper',
        imgUrl: null,
        color: 'red',
        priority: 5,
        date: Date.now()
    },
    {
        noteId: 102,
        title: 'my 2nd note',
        text:  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.' , 
        imgUrl: '../img/dontForget.jpg',
        color: 'red',
        priority: 5,
        date: Date.now()
    },
]
function _getNextId() {
    var maxId = notes.reduce((acc, note) => {
        return (note.noteId > acc) ? note.noteId : acc
    }, 0);
    return maxId + 1;
}

function getNotes() {
    return new Promise((resolve, reject) => {
        setTimeout(() => { resolve(notes) }, 1000)
    });
    // return Promise.reject();
    // return Promise.resolve(cars);
}

function delNote(noteId) {
    var noteTodelIdx = notes.findIndex(note => note.noteId === noteId)
    notes.splice(noteTodelIdx, 1)
}

function addNote(newNote) {
    return   new Promise((resolve, reject) => {
        if (newNote.title) {
            newNote.noteId = _getNextId()
            // newNote.date = Date.Now()
            notes.push(newNote)
            resolve()
        } else {
           reject('pls add title')
        }
    })

}
function getNoteById(noteId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => { resolve(notes.find(note => note.noteId === noteId)) }, 1000)
    });
}
function updateNote(noteUpdated) {
    console.log('noteUpdated',noteUpdated);
    var idx = notes.findIndex(note => note.noteId === noteUpdated.noteId)
    notes.splice(idx,1,noteUpdated)
}



export default {
    getNotes,
    delNote,
    addNote,
    getNoteById,
    updateNote
}
