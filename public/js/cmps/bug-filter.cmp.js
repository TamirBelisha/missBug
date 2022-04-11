export default {
    template: `
    <section class="bug-filter">
        <label> Search a bug: </label>    
        <input 
            v-model="filterBy.txt" 
            ref="searchInput"
            type="text" 
            @input="setFilterBy" 
            placeholder="Search....">
    </section>
    `,
    data() {
        return {
            filterBy: {
                txt: '',
                page: 0
            }
        }
    },
    methods:{
        setFilterBy(){
           this.$emit('filtered', this.filterBy)
        }
    },
    created(){
        // console.log('created');
    },
    mounted(){
        // console.log('mounted');
        // this.$refs.searchInput.focus()
    }
}
