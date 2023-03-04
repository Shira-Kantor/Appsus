export default {
	template: `
        <section>
            <div class="search-section">
                <h1 class="keep">
                    <i :style="{color: '#fbbc04'}" class="fa-solid fa-file"></i> KEEP
                </h1>
                <div></div>
                <input 
                class="search-input"
                v-model="filterBy.txt"
                @input="filter" 
                placeholder=" Search"
                type="text" />
                <button @click="clearSearch" title="Clear Search">X</button>
            </div>

            <div class="btns-filter" v-if="showAllFilter">
                    <button @click="filterByLists" title="search by lists">
                        <i class="fa-solid fa-list"></i></button>
                    <button @click="filterByImages" title="search by images">
                        <i class="fa-regular fa-image" ></i></button>
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