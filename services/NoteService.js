import storageService from './StorageService.js'
const KEY_STORE = 'myNotes';
var notes = storageService.load(KEY_STORE) || 
    [ {
    noteId: 101,
    title: 'this is my first note',
    text: 'welcome to Naaman and Oded notes Keeper, feel free to add, remove, list, show and make up more shortcuts like CRUDL',
    imgUrl: null,
    color: 'red',
    priority: 5,
    date :moment([2001, 8, 11]).fromNow(),
}]


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
    storageService.store(KEY_STORE, notes)
}

function addNote(newNote) {
    return   new Promise((resolve, reject) => {
            newNote.noteId = _getNextId()
            newNote.date = moment().startOf('min').fromNow();
            newNote.priority = +newNote.priority
            notes.push(newNote)
            storageService.store(KEY_STORE, notes)
            resolve(newNote)
    })
}
function getNoteById(noteId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => { resolve(notes.find(note => note.noteId === noteId)) }, 100)
    });
}
function updateNote(noteUpdated) {
    console.log('noteUpdated',noteUpdated);
    var idx = notes.findIndex(note => note.noteId === noteUpdated.noteId)
    notes.splice(idx,1,noteUpdated)
    storageService.store(KEY_STORE, notes)
}
var sortUp = false

function sortByPriority() {
    sortUp = !sortUp
    return new Promise((resolve, reject) => {
        notes.sort(function (a, b) {
            return a.priority - b.priority;
        });    
        resolve()
    });
}

function sortByTime() {
    sortUp = !sortUp
    console.log(sortUp);
    return new Promise((resolve, reject) => {
        notes.sort(function (a, b) {
            return  a.date - b.date 
        });    
        resolve()
    });
}



export default {
    getNotes,
    delNote,
    addNote,
    getNoteById,
    updateNote,
    sortByTime,
    sortByPriority
}
