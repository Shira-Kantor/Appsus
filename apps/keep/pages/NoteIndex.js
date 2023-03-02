import { notesService } from "../services/note.service.js"

import NoteFilter from "../cmps/NoteFilter.js"
import NoteList from '../cmps/NoteList.js'
import NoteAdd from '../cmps/NoteAdd.js'

import { eventBus } from "../../../services/event-bus.service.js"

export default {
    template: `
        <section>
            <NoteFilter @filter="setFilterBy"/>
            <NoteAdd @onAddNote="onAddNote" />
            <section v-if="isPin">
                <h3>PINNED</h3>
                
            </section>
            <section>
                <h3>OTHERS</h3>
                <NoteList 
                :notes="filteredNotes"
                @pinNote="pinNote"
                @color="onChangeColor"
                @remove="removeNote"/>
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
        onChangeColor(color) {
            console.log('background color', color)
        },
        removeNote(noteId) {
            notesService.remove(noteId)
            .then(() => {
                const idx = this.notes.findIndex(note => note.id === noteId)
                this.notes.splice(idx, 1)
                eventBus.emit('show-msg', {txt: 'Note removed', type: 'success'})
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
        pinNote(noteId) {
            this.isPin = true
            console.log('pin noteid', noteId)
            const idx = this.notes.findIndex(note => note.id === noteId)
            console.log('note idx', idx)
            this.notes[idx].isPinned = true
        },
    },
    computed: {
        filteredNotes() {
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
