
import { utilService } from './../../../services/util.service.js'
import { storageService } from './../../../services/async-storage.service.js'


const EMAIL_KEY = 'emailDB'

var gEmails = [{
    id: 'e101',
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    sentAt: `${new Date().getHours()} : ${new Date().getMinutes()}
     ${new Date().getDate()}/${new Date().getDay()}/${new Date().getFullYear()}` ,
    removedAt: null,
    from: 'momo@momo.com',
    to: 'user@appsus.com',
    isStared: true
},
{
    id: 'e102',
    subject: 'Hey you!',
    body: 'I just to check how are you',
    isRead: false,
    sentAt:  `${new Date().getHours()} : ${new Date().getMinutes()}
    ${new Date().getDate()}/${new Date().getDay()}/${new Date().getFullYear()}`,
    removedAt: null,
     from: 'user@appsus.com',
    to: 'jojo@jojo.com',
    isStared: false

},
{
    id: 'e103',
    subject: 'BIG SALE',
    body: 'Last day for end of season elimination! hurry up hurry up hurry up hurry up hurry up hurry up',
    isRead: false,
    sentAt:  `${new Date().getHours()} : ${new Date().getMinutes()}
    ${new Date().getDate()}/${new Date().getDay()}/${new Date().getFullYear()}` ,
    removedAt: null,
    from: 'user@appsus.com',
    to: 'popo@jojo.com',
    isStared: false,

},
{
    id: 'e104',
    subject: 'Actively Hiring',
    body: '29 Companies Actively Hiring Now! Check out all the open roles at companies within todays 8 most-searched industries including healthcare, financial services & more.',
    isRead: false,
    sentAt:  `${new Date().getHours()} : ${new Date().getMinutes()}
    ${new Date().getDate()}/${new Date().getDay()}/${new Date().getFullYear()}` ,
    removedAt: null,
    from: 'uri@glass.com',
    to: 'user@appsus.com',
    isStared: false,
},
{
    id: 'e105',
    subject: 'Google Cloud Platform ',
    body: 'We are writing to let you know about the following updates to the Third-Party Subprocessors we engage for Google Cloud Platform:No action is required on your part.You can find information about the tasks our Subprocessors perform on our Google Cloud Platform Subprocessors list.Thanks for choosing Google Cloud Platform.',
    isRead: false,
    sentAt:  `${new Date().getHours()} : ${new Date().getMinutes()}
    ${new Date().getDate()}/${new Date().getDay()}/${new Date().getFullYear()}` ,
    removedAt: null,
    from: 'meir@google.com',
    to: 'user@appsus.com',
    isStared: false,
 
},
]


_createEmails()
export const emailService = {
    query,
    get,
    remove,
    save,
    getNewEmail,
    gEmails
}

function query(filterBy = {}) {
    return storageService.query(EMAIL_KEY)
        .then(emails => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                emails = emails.filter(email => regex.test(email.body))
            }

            return emails
        })
}

function get(emailId) {
    return storageService.get(EMAIL_KEY, emailId)
        // .then(_setNextPrevEmailId)
}

function remove(emailId) {
    return storageService.remove(EMAIL_KEY, emailId)
}

function save(email) {
    console.log('email',email)
    // console.log('email.id',email.id)
    if (email.id) {
        return storageService.put(EMAIL_KEY, email)
    } else {
        return storageService.post(EMAIL_KEY, email)
    }
}

function getNewEmail(subject = '', body = '', to = '') {
    return {
        id: '',
        subject,
        body,
        isRead: false,
        sentAt:  `${new Date().getHours()} : ${new Date().getMinutes()}
        ${new Date().getDate()}/${new Date().getDay()}/${new Date().getFullYear()}`,
        removedAt: null,
        from: 'user@appsus.com',
        to,
    }

}

function _createEmails() {
    let emails = utilService.loadFromStorage(EMAIL_KEY)
    if (!emails || !emails.length) {
        emails = gEmails

        // emails.push(_createEmail('just hey', 'I just to check how are you', 'shira@ggjj.com'))
        utilService.saveToStorage(EMAIL_KEY, emails)
    }
}

function _createEmail(subject, body, to) {
    const email = getNewEmail(subject, body, to)
    email.id = utilService.makeId()
    return email
}


function _setNextPrevEmailId(email) {
    return storageService.query(EMAIL_KEY).then((emails) => {
        const emailIdx = emails.findIndex((currEmail) => currEmail.id === email.id)
        email.nextEmailId = emails[emailIdx + 1] ? emails[emailIdx + 1].id : emails[0].id
        email.prevEmailId = emails[emailIdx - 1] ? emails[emailIdx - 1].id : emails[emails.length - 1].id
        console.log('email', email)
        return email
    })
}
