import { emailService } from '../services/mail.service.js'

export default {
    props: ['email.id'],
    template: `
    <section v-if="email" class="email-details">
     <h1>Subject: {{email.subject}}</h1>
         <h4>{{email.body}}</h4>
         <h4>{{email.sentAt}}</h4>
         <h4>{{date}}</h4>
         <button class="remove-mail"><i class="fa-regular fa-trash-can"></i></button>


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
           
            this.$emit('remove', emailId)
        },
     },
    created() {
        const { emailId } = this.$route.params
        emailService.get(emailId).then((email) => (this.email = email))
        const date = 0
    },

}