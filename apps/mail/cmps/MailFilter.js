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
            filterBy: { txt: '' ,sent:'' ,trash:'', draft:''}
            // filterBy: ''
        }
    },
    methods: {
        filter() {
            this.$emit('filter', this.filterBy)
        }
    }
     }