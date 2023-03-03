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
                    <tr><td><button  @click="setFilterBy('inbox')" class="side inbox-btn"><i class="fa-solid fa-inbox"></i>  Inbox {{num}}</button></td></tr>
                    <tr><td><button  @click="setFilterBy('sent')" class="side sent-btn"><i class="fa-regular fa-paper-plane"></i>  Sent</button></td></tr>
                    <tr><td><button  @click="setFilterBy('stared')" class="side stared-btn"><i class="fa-regular fa-star"></i> Stared </button></td></tr>
                    <tr><td><button  @click="setFilterBy('trash')" class="side trash-btn"><i class="fa-regular fa-trash-can"></i>  Trash</button></td></tr>
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
            // inboxNum: ''

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
            this.num = this.num-1
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
            // console.log('filterBy',filterBy)
            this.filterBy = filterBy
        }
    },
    computed: {
        filteredEmails() {
            // console.log(this.filterBy);
            let emails = this.emails
            if (this.filterBy === 'inbox') {
                return this.emails.filter(email => email.to === 'user@appsus.com')
            }
            if (this.filterBy === 'sent') {
                return this.emails.filter(email => email.from === 'user@appsus.com')
            }
            if (this.filterBy === 'stared') {
                return this.emails.filter(email => email.isStared)
            }
            // if (this.filterBy === 'trash') {
            //     return this.emails.filter(email => email.removedAt !== null)
            // }
           
            const regexTxt = new RegExp(this.filterBy.txt, 'i')
            emails = emails.filter(email => regexTxt.test(email.body) || regexTxt.test(email.subject))
             return emails
        },
        num() {
            //   if (this.filterBy === 'inbox') {
                return this.emails.filter(email => email.to === 'user@appsus.com').length
        // }
    }
    },
    components: {
        MailFilter,
        MailList,
    }
}
