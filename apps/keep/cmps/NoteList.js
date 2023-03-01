import NotePreview from './../cmps/NotePreview.js'

export default {
    props: ['notes'],
	template: `
        <section class="notes-container">
            <article 
             v-for="note in notes"
             :key="note.id"
             
             class="note-preview">
             <NotePreview :note="note"/>
             <button class="btn-delete" @click="removeNote(note.id)">
                 <i class="fa-solid fa-trash"></i>
                </button>
                <RouterLink :to="'/note/edit/'+note.id">Update</RouterLink>
            </article>
        </section>
    `,
      data() {
        return {
         
        }
    },
    methods: {
        removeNote(noteId) {
            this.$emit('remove', noteId)
        }
    },
    computed: {
      
    },
    created() {
      
    },
    components: {
        NotePreview,
    }
}
