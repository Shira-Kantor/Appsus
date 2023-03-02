import MailPreview from './MailPreview.js'


export default {
    name: 'list',
    props: ['emails'],
    template: `
        <section class="email-list" v-if="emails">
           <h3>Inbox</h3>
           <table>
           
            <tr v-for="email in emails" :key="email.id" class="email-line">
                    <!-- <pre>{{email}}</pre> -->
                   <td class="email-txt"> <RouterLink :to="'/email/' + email.id"> <MailPreview :email="email"/></RouterLink> </td>

                    <!-- <RouterLink :to="'/email/edit/'+email.id">Edit</RouterLink> | -->
                    <td>   <button class="btn-removed" @click="remove(email.id)"><i class="fa-regular fa-trash-can"></i></button></td>
                    <td>   <button class="btn-read" @click="read"><i class="fa-regular fa-envelope-open"></i></button></td>
            </tr>
          
        </table>
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