import NotePreview from './../cmps/NotePreview.js'

export default {
    props: ['notes'],
    template: `
        <section class="notes-container">
            <article 
             v-for="note in notes"
             :key="note.id"
             @click="toggleModal"
             class="note-preview">
             <NotePreview :note="note"/>
             <div class="btns-section">
                 <button class="btn-delete" @click="removeNote(note.id)">
                     <i class="fa-solid fa-trash"></i>
                    </button>
                    
                    <button class="btn-color" @click="changeColor(note.id)">
                        <i class="fa-solid fa-palette"></i>
                    </button>
                </div>


        <div v-if="showModal" class="modal">
            <div id="review-form-container"> </div>
            <button class="close-btn" @click="toggleModal"
                    aria-label="close" title="Close">close</button>
        </div>


                <!-- <RouterLink :to="'/note/edit/'+note.id">Update</RouterLink> -->
            </article>
        </section>
    `,
    data() {
        return {
            showModal: false,
        }
    },
    methods: {
        toggleModal() {
            this.showModal = !this.showModal
        },
        removeNote(noteId) {
            this.$emit('remove', noteId)
        },
        changeColor(noteId) {
            console.log(noteId)
        },
        update(noteId) {
            console.log(noteId);
            this.showModal = true
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
