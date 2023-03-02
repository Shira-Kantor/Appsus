import { emailService } from '../services/mail.service.js'
import { eventBus } from '../../../services/event-bus.service.js'


export default {
    name: 'MailEdit',
    template: `
        <section class="email-edit">
        <h2>{{(email.id)? 'Edit' : 'Add'}} a email</h2>
            <form @submit.prevent="save">
                <table>
                <tr><input class="new-to" type="text" v-model="email.to" placeholder="To"></tr>
               <tr> <input class="new-subject" type="text" v-model="email.subject" placeholder="Subject"></tr>
               <tr>  <input class="new-body" type="text" v-model="email.body" placeholder="Enter your email"></tr>
               </table>
                <button class="send-btn">Send</button>
            </form>
        </section>
    `,
    data() {
        return {
            email: emailService.getNewEmail()
        }
    },
    created() {
        const { emailId } = this.$route.params
        if (emailId) {
            emailService.get(emailId)
                .then(email => this.email = email)
        }
    },
    methods: {
        save() {
            emailService.save(this.email)
                .then(savedEmail => {
                    eventBus.emit('show-msg', { txt: 'Email saved', type: 'success' })
                    this.$router.push('/email')
                })
                .catch(err => {
                    eventBus.emit('show-msg', { txt: 'Email save failed', type: 'error' })
                })
        }
    }
  
}