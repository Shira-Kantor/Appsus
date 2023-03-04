import { emailService } from '../services/mail.service.js'
import { eventBus } from '../../../services/event-bus.service.js'

export default {
    props: ['email.id'],
    template: `
    <section v-if="email" class="email-details">
     <!-- <pre class="email-subject"> {{email.subject}}  <i :class="{isRead: email.isRead, isStared: email.isStared}"class="fa-regular fa-star" @click="onStared(email)"></i></pre> -->
     <pre class="email-from"><i class="fa-solid fa-user"></i> {{email.from}}</pre>
         <pre class="email-body">{{email.body}}</pre>
         <pre class="sentAt-txt">Sent At:  {{email.sentAt}}</pre>
         
         <RouterLink to="/email"> <button class="remove-mail" @click="remove(email.id)"><i class="fa-regular fa-trash-can"></i></button></RouterLink>


    <RouterLink to="/email">Back to list</RouterLink>
    </section>
    `,

    data() {
        return {
            email: null,
            date: null
        }
    },
    methods: {
        remove(emailId) {
            console.log('remove');
           emailService.get(emailId).then((email) => emailService.remove(emailId))
            .then(() => {
                const idx = this.emails.findIndex(email => email.id === emailId)
                this.emails.splice(idx, 1)
                eventBus.emit('show-msg', { txt: 'Email removed', type: 'success' })
            })
            .catch(err => {
                eventBus.emit('show-msg', { txt: 'Email remove failed', type: 'error' })
            })
        },
        onStared(email) {
            email.isStared = true
            emailService.save(email)
        }
    },
    created() {
        const { emailId } = this.$route.params
        emailService.get(emailId).then((email) => {
            this.email = email
        }) 
    },

}