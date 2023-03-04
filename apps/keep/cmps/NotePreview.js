
export default {
    props: ['note'],
    template: `
        <article class="note"
                  :style="{'background-color': note.style?.backgroundColor || 'white'}">

             <button class="btn-pin-note" @click="onPinNote(note.id)">
                        <i v-if="!note.isPinned" class="fa-solid fa-thumbtack"></i>
                        <i v-if="note.isPinned" :style="{color: 'red'}" class="fa-solid fa-thumbtack"></i>
             </button>
        
            <!-- <h2  @click="update(note.id)" >{{ note.info.title }}</h2> -->
            <h3  @click="update(note.id)" >{{ note.info.txt }}</h3>
            <img :src="note.info.url"/>

            <div class="btns-section">
                <button class="btn-delete" @click="removeNote(note.id)">
                    <i class="fa-solid fa-trash"></i>
                </button>
                    
                <button class="btn-color"
                        @click="isOpenPalette = !isOpenPalette">
                     <i class="fa-solid fa-palette"></i>
                 </button>

                <button class="btn-copy"
                        @click="copyNote(note.id)">
                    <i class="fa-solid fa-copy"></i>
                 </button>
            </div>
            
            <!-- UPDATE MODAL -->
            <div v-if="showModal" class="modal">

                <button class="btn-close"
                        @click="showModal = false"
                        title="Close">close</button>

                   <img :src="note.info.url"/>
               <!-- <div>  -->
                 <textarea  class="modal-txt" v-model="updateNote"
                   :style="{'background-color': note.style?.backgroundColor || 'white'}">
                  
                 </textarea>
               <!-- </div> -->

               <button class="btn-save-update" @click="saveUpdate"
                        title="Save">save</button>
            </div>

            <!-- PALETTE COLOR -->
            <div v-if="isOpenPalette" class="modal-color-palette">
                <div class="select-color"
                     :key="color"
                     :style="{'background-color': color}"
                     v-for="color in paletteColors"
                     @click="selectNoteColor(color)">
                </div>
            </div>

        </article>
    `,
    data() {
        return {
            isOpenPalette: false,
            showModal: false,
            updateNote: '',
            color: '',
            paletteColors: [
                '#ffadad',
                '#ffd6a5',
                '#fdffb6',
                '#caffbf',
                '#cbf0f8',
                '#fdcfe8',
                '#f3f3ec',
                '#d8e2dc'
            ],
        }
    },
    methods: {
        copyNote(noteId) {
            this.$emit('copyNote', noteId)
        },
        saveColor() {
            console.log('save color')
        },
        selectNoteColor(color) {
            console.log('select color', this.note.id)
            const noteId = this.note.id
            this.$emit('updateColor', { color, noteId })
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
            console.log('update', this.note.type)
            this.showModal = !this.showModal
            this.updateNote = this.note.info.txt
        },
        onPinNote(noteId) {
            this.$emit('pinNote', noteId)
        },
        saveUpdate() {
            const noteId = this.note.id
            const updateNoteText = this.updateNote
            this.$emit('updateText', { noteId, updateNoteText })
            this.showModal = !this.showModal
        },
    },
    computed: {
        printUpdateNote() {
            return this.updateNote
        },
    },
    created() {

    },
}

