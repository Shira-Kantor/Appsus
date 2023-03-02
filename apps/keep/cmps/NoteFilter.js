export default {
	template: `
        <section>
            <div class="search-section">
                <input 
                class="search-input"
                v-model="filterBy.txt"
                @input="filter" 
                placeholder="Search"
                type="text" />
                <button @click="clearSearch" title="Clear Search">X</button>
            </div>

            <div class="btns-filter" v-if="showAllFilter">
                    <button @click="filterByLists">Lists</button>
                    <button @click="filterByImages">Images</button>
                </div>
        </section>
    `,
      data() {
        return {
            filterBy: {},
            showAllFilter: false
        }
    },
    methods: {
        filter(){
            this.showAllFilter = true
            this.$emit('filter', {...this.filterBy})
        },
        filterByLists() {
            this.filterBy.type = 'NoteTodos'
            this.$emit('filter', {...this.filterBy})
        },
        filterByImages() {
            this.filterBy.type = 'NoteImg'
            this.$emit('filter', {...this.filterBy})
        },
        clearSearch() {
            this.showAllFilter = false
            this.filterBy = {}
            this.$emit('filter', {...this.filterBy})
        },
    },
    computed: {
      
    },
    created() {
       
    },
    components: {
       
    }
}