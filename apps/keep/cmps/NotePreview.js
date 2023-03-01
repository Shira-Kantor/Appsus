export default {
    props: ['note'],
    template: `
        <article class="note" v-if="note.type = 'NoteTxt'">
        <blockquote contenteditable="false">
            <h2>{{ note.info.txt }}</h2>
        </blockquote>
            <!-- <h2>{{ note.type }}</h2> -->
        </article>
    `,
}