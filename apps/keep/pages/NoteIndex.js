import { notesService } from "../services/note.service.js"
import { utilService } from "../../../services/util.service.js"

import NoteFilter from "../cmps/NoteFilter.js"
import NoteList from '../cmps/NoteList.js'
import NoteAdd from '../cmps/NoteAdd.js'

import { eventBus } from "../../../services/event-bus.service.js"

export default {
    template: `
        <section>
            <NoteFilter @filter="setFilterBy"/>
            <hr />
             <section class="nav-keep">
                   <article class="side-nav-bar">
                     <button @click="getAllNotes" title="Notes"
                             class="light-icon"><i class="fa-regular fa-lightbulb"></i></button> 
                     <button title="Bin" class="trash-icon"><i class="fa-regular fa-trash-can"></i></button> 
                  </article>
            </section>

             <NoteAdd @onAddNote="onAddNote" />

            <section>
                <NoteList 
                :notes="filteredNotes"
                @pinNote="onPinNote"
                @copyNote="onCopyNote"
                @updateColor="onChangeColor"
                @updateText="onUpdateText"
                @remove="onRemoveNote"/>
            </section>
        </section>
    `,
    data() {
        return {
            notes: [],
            filterBy: {},
            isPin: false,
        }
    },
    methods: {
       
        onCopyNote(noteId) {
            console.log('copy note', noteId)
            const idx = this.notes.findIndex(note => note.id === noteId)
            let currNote = this.notes[idx]
            let newNote = JSON.stringify(currNote)
            console.log(newNote) 
            
            // this.items.push({...this.newItem})
            newNote = JSON.parse(newNote)
            console.log('id new note', newNote) 
            newNote.id = utilService.makeId()
            console.log('id new note changed', newNote) 
            notesService.save(newNote)
            .then((savedNote) => {


                this.notes.unshift(newNote)
                   console.log(savedNote) 
                })
        },
        onUpdateText({ noteId, updateNoteText }) {
            const idx = this.notes.findIndex(note => note.id === noteId)
            let prevNote = this.notes[idx]
            prevNote = JSON.parse(JSON.stringify(prevNote))
            prevNote.info.txt = updateNoteText
            notesService.save(prevNote)
                .then((savedNote) => {
                    this.notes[idx] = savedNote
                    eventBus.emit('show-msg', { txt: 'Text changed', type: 'success' })
                })
        },
        onChangeColor({ color, noteId }) {
            const idx = this.notes.findIndex(note => note.id === noteId)
            let prevNote = this.notes[idx]
            prevNote = JSON.parse(JSON.stringify(prevNote))
            prevNote.style.backgroundColor = color
            notesService.save(prevNote)
                .then((savedNote) => {
                    this.notes[idx] = savedNote
                    eventBus.emit('show-msg', { txt: 'Color changed', type: 'success' })
                })
        },
        onRemoveNote(noteId) {
            notesService.remove(noteId)
                .then(() => {
                    const idx = this.notes.findIndex(note => note.id === noteId)
                    this.notes.splice(idx, 1)
                    eventBus.emit('show-msg', { txt: 'Note removed', type: 'success' })
                })
        },
        setFilterBy(filterBy) {
            this.filterBy = filterBy
        },
        onAddNote(newNote) {
            notesService.save(newNote)
                .then(savedNote => {
                    this.notes.unshift(savedNote)
                })
        },
        onPinNote(noteId) {
            const idx = this.notes.findIndex(note => note.id === noteId)
            
            const noteToPinned = JSON.parse(JSON.stringify(this.notes[idx]))
            this.notes.splice(idx, 1)

            notesService.save(noteToPinned)
            .then((savedNote) => {
                this.notes.unshift(savedNote)
            })
        },
        getAllNotes() {
            this.filterBy = {}
        },
    },
    computed: {
        filteredNotes() {
            if (this.filterBy.type === 'NoteTodos') {
                return this.notes.filter(note => note.type === 'NoteTodos')
            }
            if (this.filterBy.type === 'NoteImg') {
                return this.notes.filter(note => note.type === 'NoteImg')
            }
            if (this.filterBy === {}) {
                notesService.query()
                    .then(notes => this.notes = notes)
            }
            const regex = new RegExp(this.filterBy.txt, 'i')
            return this.notes.filter(note => regex.test(note.info.txt))
        },
       
    },
    created() {
        notesService.query()
            .then(notes => {
                console.log(notes)
                this.notes = notes
            })
    },
    components: {
        NoteFilter,
        NoteList,
        NoteAdd,
    }
}
