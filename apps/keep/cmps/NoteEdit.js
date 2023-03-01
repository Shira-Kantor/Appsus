export default {
  props: [''],
  template: `
        <section>
          <h1>edit</h1>
        </section>
    `,
  data() {
    return {
      showModal: false,
    }
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal
    }
  }
}