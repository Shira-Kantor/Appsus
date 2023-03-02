import NotePreview from './../cmps/NotePreview.js'

export default {
    props: ['notes'],
    template: `
        <section class="notes-container">
            <article  v-for="note in notes"
                      :key="note.id"
                      class="note-preview">

             <NotePreview :note="note"
                          @updateColor="$emit('updateColor', $event)"
                          @remove="$emit('remove', $event)"/>
            </article>
        </section>
    `,
    data() {
        return {
           
        }
    },
    methods: {
        
    },
    computed: {
      
    },
    created() {

    },
    components: {
        NotePreview,
    }
}
