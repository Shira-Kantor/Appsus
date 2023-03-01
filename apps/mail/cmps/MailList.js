import MailPreview from './MailPreview.js'


export default {
    name: 'list',
    props:['emails'],
    template: `
        <section class="email-list" v-if="emails">
           <h3>hey from list</h3>
           
           <ul>
            <li v-for="email in emails" :key="email.id">
                    <!-- <pre>{{email}}</pre> -->
                    <RouterLink :to="'/email/' + email.id"> <MailPreview :email="email"/></RouterLink> 
               
               
                    <!-- <RouterLink :to="'/email/edit/'+email.id">Edit</RouterLink> | -->
                    <button class="btn-remove" @click="remove(email.id)">🗑</button>
            </li>
           </ul>
        </section>
    `,
    methods: {
        remove(emailId) {
            this.$emit('remove', emailId)
        },
    },
    components: {
        MailPreview
    }
}