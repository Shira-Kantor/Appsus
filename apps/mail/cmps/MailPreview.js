export default {
  // name: 'pre',
  props: ['email'],
  template: `
  <table class="email-view preview" :class="{isRead: email.isRead, isStared: email.isStared}">
   <tr> <td class="from" > {{email.from}} </td>
    <td class="subject"> {{email.subject}}</td>
    <td class="email-body"> {{showBody}}</td>
    <td class="email-date"> {{date}}</td></tr>
    <!-- <pre class="email-body"> {{showBody}}</pre> -->

    
  </table>
    
 `,
  data() {
    return {
      date: this.email.sentAt
    }
  },
  created() {

    //  body = this.body.slice(0,15)
  },
  computed: {
    showBody() {
      if (this.email.body.length > 90)
        return this.email.body.slice(0, 90) + '...';
      return this.email.body;
      // return this.email.body.slice(0, 90) ;

    },
  },
}