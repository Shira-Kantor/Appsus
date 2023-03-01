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
            <NoteList 
                :notes="filteredNotes"
                @remove="removeNote"/>
        </section>
    `,
    data() {
        return {
            notes: [],
            filterBy: {},
           
        }
    },
    methods: {
        removeNote(noteId) {
            console.log(noteId)
            notesService.remove(noteId)
            .then(() => {
                const idx = this.notes.findIndex(note => note.id === noteId)
                console.log(idx)
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
                console.log('saved note', savedNote) 
                this.notes.push(savedNote)
            })
        }
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
