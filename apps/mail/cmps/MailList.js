import MailPreview from './MailPreview.js'
import { emailService } from '../services/mail.service.js'


export default {
    name: 'list',
    props: ['emails'],
    template: `
        <section class="email-list" v-if="emails">
           <h3>Inbox</h3>
           <table>
           
            <tr v-for="email in emails" :key="email.id" class="email-line">
                    <!-- <pre>{{email}}</pre> -->
                    <td>   <button class="btn-star" @click="isStared(email)" :class="{isStared: email.isStared}"><i class="fa-solid fa-star" ></i></button></td>
                   <td   @click="markEmailRead(email)" class="email-txt"> <RouterLink :to="'/email/' + email.id"> <MailPreview :email="email"/></RouterLink> </td>

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
            email.isRead = !email.isRead
            emailService.save(email)
        },
        isStared(email) {
            email.isStared = !email.isStared
            emailService.save(email)
            console.log('email.isStared',email.isStared)
        },
        markEmailRead(email) {
            email.isRead = true
            emailService.save(email)
            // emailService.save(email)
            console.log('markEmailRead', email)
        }

    },
    components: {
        MailPreview
    }



}