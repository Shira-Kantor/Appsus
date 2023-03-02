import { emailService } from '../services/mail.service.js'
import { eventBus } from '../../../services/event-bus.service.js'

import MailFilter from '../cmps/MailFilter.js'
import MailList from '../cmps/MailList.js'


export default {
    name: 'MailIndex',
    template: `
        <section class="email-index">
            <nav class="nav-mail">
                <img src="../../../assets/img/gmail.png" alt="gmail-logo" class="gmail-logo" />
           <h3 class="gmail-txt">Gmail</h3>
           <!-- <input class="search-mail fa-solid fa-magnifying-glas" type="search" placeholder="&#xf002;   Search    email..."> 
               -->
                <mailFilter @filter="setFilterBy"/>
            </nav>
            <!-- <RouterLink to="/email/inbox">INBOX</RouterLink> -->
            <article class="mail-container">
                <table class="side-filter">
              <tr><button  class="new-email"> <RouterLink to="/email/edit"><i class="fa-solid fa-pen"> </i>compose</RouterLink></button></tr> 
                    <tr><td><button class="side inbox-btn"><i class="fa-solid fa-inbox"></i>  Inbox {{num}}</button></td></tr>
                    <tr><td><button class="side sent-btn"><i class="fa-regular fa-paper-plane"></i>  Sent</button></td></tr>
                    <tr><td><button class="side draft-btn"> Drafts </button></td></tr>
                    <tr><td><button class="side trash-btn"><i class="fa-regular fa-trash-can"></i>  Trash</button></td></tr>
           </table>
      <mailList :emails="filteredEmails" @remove="removeEmail"  v-if="filteredEmails"/>
      </article>
        </section>
    `,
    data() {
        return {
            emails: [],
            filterBy: {},
            selectedMailId: null,
            num: emailService.gEmails.length

        }
    },

    created() {
        emailService.query()
            .then(emails => {
                console.log('emails', emails)
                this.emails = emails
            })
    },
    methods: {
        removeEmail(emailId) {
            emailService.remove(emailId)
                .then(() => {
                    const idx = this.emails.findIndex(email => email.id === emailId)
                    this.emails.splice(idx, 1)
                    eventBus.emit('show-msg', { txt: 'Email removed', type: 'success' })
                })
                .catch(err => {
                    eventBus.emit('show-msg', { txt: 'Email remove failed', type: 'error' })
                })
        },
        setFilterBy(filterBy) {
            this.filterBy = filterBy
        }
    },
    computed: {
        filteredEmails() {
            const regex = new RegExp(this.filterBy.txt, 'i')
            let emails = this.emails
            emails = emails.filter(email => regex.test(email.body) || regex.test(email.subject))
            // && email.from.includes(this.filterBy.from) && email.isStared === this.filterBy.isStared &&
            return emails
        }
    },
    components: {
        MailFilter,
        MailList,
    }
}
