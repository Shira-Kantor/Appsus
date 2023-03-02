export default {
    props:['email'],
    template: `
  <section class="email-view preview">
    <pre class="preview-bold from" > {{email.from}} </pre>
    <pre class="preview-bold subject"> {{email.subject}}</pre>

    
  </section>
    
    `,
}