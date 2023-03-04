export default {
    template: `
        <section class="mail-filter">
         
                <input 
                v-model="filterBy.txt" 
                @input="filter"  
                class="search-mail fa-solid fa-magnifying-glas" 
                type="search" 
                placeholder="&#xf002;   Search    email..."> 
              
         
        </section>
    `,
    data() {
        return {
            filterBy: { }
            // filterBy: ''
        }
    },
    methods: {
        filter() {
            // this.filterBy.type = 'txt'
            this.$emit('filter', this.filterBy)
        }
    }
}