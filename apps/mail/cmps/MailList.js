import MailPreview from './MailPreview.js'
import { emailService } from '../services/mail.service.js'


export default {
    name: 'list',
    props: ['emails'],
    template: `
        <section class="email-list" v-if="emails">
           <h3>Inbox</h3>
           <table>
           
            <tr v-for="email in emails" :key="email.id" class="email-line" @click="markEmailRead(email)">
                    <!-- <pre>{{email}}</pre> -->
                   <td class="email-txt"> <RouterLink :to="'/email/' + email.id"> <MailPreview :email="email"/></RouterLink> </td>

                    <!-- <RouterLink :to="'/email/edit/'+email.id">Edit</RouterLink> | -->
                    <td>   <button class="btn-removed" @click="remove(email.id)"><i class="fa-regular fa-trash-can"></i></button></td>
                    <td>   <button class="btn-read" @click="onRead(email)"><i class="fa-regular fa-envelope-open"></i></button></td>
            </tr>
          
        </table>
        </section>
    `,
    methods: {
        remove(emailId) {
            this.$emit('remove', emailId)
        },
        onRead(email) {
            // console.log('read',email);
            email.isRead = !email.isRead
        },
        markEmailRead(email) {
            email.isRead = true
            emailService.save(email)
            console.log('markEmailRead',email)
        }
       
    },
    components: {
        MailPreview
    }
}