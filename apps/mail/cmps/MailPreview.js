export default {
  // name: 'pre',
  props: ['email'],
  template: `
  <section class="email-view preview" :class="{isRead: email.isRead}">
    <pre class="from" > {{email.from}} </pre>
    <pre class="subject"> {{email.subject}}</pre>
    <pre class="email-body"> {{email.body}}</pre>
    <!-- <pre class="email-body"> {{showBody}}</pre> -->

    
  </section>
    
 `,
 created() {

  //  body = this.body.slice(0,15)
 },
 computed: {
  showBody() {
          // return this.body.slice(0, 6) ;
     
  },
},
}