export default {
    props:['email'],
    template: `
  <section class="email-view">
     {{email.from}} ----
     {{email.subject}}

    
  </section>
    
    `,
}