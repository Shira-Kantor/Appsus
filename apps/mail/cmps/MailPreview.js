export default {
    props:['email'],
    template: `
  <section class="email-view preview" :class="{isRead: email.isRead}">
    <pre class="from" > {{email.from}} </pre>
    <pre class="subject"> {{email.subject}}</pre>
    <pre class="email-body"> {{email.body}}</pre>

    
  </section>
    
    `,
    
}