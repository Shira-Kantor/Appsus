import { utilService } from './../../../services/util.service.js'
import { storageService } from './../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'

// demo data
const notesDB = [
    {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: {
            backgroundColor: '#00d'
        },
        info: {
            txt: utilService.makeLorem(20)
        }
    },
    {
        id: 'n102',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: {
            backgroundColor: '#00d'
        },
        info: {
            txt: utilService.makeLorem(20)
        }
    },
    {
        id: 'n103',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: {
            backgroundColor: '#00d'
        },
        info: {
            txt: utilService.makeLorem(20)
        }
    },
    {
        id: 'n104', type: 'NoteImg',
        isPinned: false,
        info: {
            url: 'http://some-img/me',
            title: 'Bobi and Me'
        },
        style: {
            backgroundColor: '#00d'
        }
    },
    {
        id: 'n105', type: 'NoteTodos',
        isPinned: false,
        info: {
            title: 'Get my stuff together',
            todos: [
                { txt: 'Driving license', doneAt: null },
                { txt: 'Coding power', doneAt: 187111111 }
            ]
        }
    }]

_createNotes()

export const notesService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
}

function query() {
    return storageService.query(NOTE_KEY)
        // .then(notes => {
        //     if (filterBy.txt) {
        //         const regex = new RegExp(filterBy.txt, 'i')
        //         notes = notes.filter(note => regex.test(note.info.txt))
        //     }
        //     // } if (filterBy.type) {
        //         // const regex = new RegExp(filterBy.type, 'i')
        //         // notes = notes.filter(note => regex.test(note.type))
        //     // }
        //     return notes
        // })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote() {
    return {
        id: '',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: {
            backgroundColor: '#00d'
        },
        info: {
            txt: '', 
        }
    }
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = notesDB
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}

function _createNote(title) {
    const note = getEmptyNote(title)
    note.id = utilService.makeId()
    return note
}


