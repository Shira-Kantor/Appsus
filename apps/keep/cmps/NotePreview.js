
export default {
    props: ['note'],
    template: `
        <article class="note"
                 :style="note.backgroundColor">

             <button class="btn-pin-note" @click="onPinNote(note.id)">
                        <i class="fa-solid fa-thumbtack"></i>
             </button>
        
            <h2  @click="update(note.id)" >{{ note.info.txt }}</h2>

            <div class="btns-section">
                <button class="btn-delete" @click="removeNote(note.id)">
                    <i class="fa-solid fa-trash"></i>
                </button>
                    
                <button class="btn-color" :class="openPallete"
                        @click="isOpenPalette = !isOpenPalette">
                    <i class="fa-solid fa-palette"></i>
                 </button>
            </div>
            
            <!-- UPDATE MODAL -->
            <div v-if="showModal" class="modal">

                <button class="btn-close"
                        @click="showModal = false"
                        title="Close">close</button>

               <div> 
                 <blockquote contenteditable="true">
                     <p>{{ printUpdateNote }}</p>
                 </blockquote>
               </div>

               <button class="btn-save-update" @click="saveUpdate"
                        title="Save">save</button>
            </div>

            <!-- PALETTE COLOR -->
            <div v-if="isOpenPalette" class="modal-color-palette">
                <div class="select-color" @click="selectNoteColor"></div>
            </div>
        </article>
    `,
    data() {
        return {
            isOpenPalette: false,
            showModal: false,
            updateNote: '',
            color: '',
        }
    },
    methods: {
        selectNoteColor() {
            console.log('select color')
            this.isOpenPalette = false
        },
        toggleModal() {
            this.showModal = false
            console.log(this.showModal)
        },
        removeNote(noteId) {
            this.$emit('remove', noteId)
        },
        changeColor(noteId) {
            console.log(noteId)
            console.log(this.color)
            this.$emit('color', this.color)
            this.note.style.backgroundColor = this.color
            console.log(this.notes[idx].style.backgroundColor)
        },
        update() {
            console.log('update')
            this.showModal = !this.showModal
            this.updateNote = this.note.info.txt
        },
        onPinNote(noteId) {
            console.log(noteId)
            this.$emit('pinNote', noteId)
        },
        saveUpdate() {
            console.log('save changes')
            this.showModal = !this.showModal
        },
    },
    computed: {
        printUpdateNote() {
            return this.updateNote
        },
        openPallete() {
            return 'open-pallete'
        },
    },
    created() {

    },
}

const paletteColors = ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#ffc6ff', '#fffffc', '#d8e2dc']
