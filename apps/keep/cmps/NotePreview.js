export default {
    props: ['note'],
    template: `
        <article>
            <h2>{{ note.info.txt }}</h2>
            <h2>{{ note.type }}</h2>
        </article>
    `,
}