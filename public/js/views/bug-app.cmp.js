import bugList from "../cmps/bug-list.cmp.js"
import bugFilter from "../cmps/bug-filter.cmp.js"
import { bugService } from "../services/bug-app-service.js"
import { userService } from "../services/user.service.js"


export default {
  // props: [""],
  template: `
        <section class="bug-list-container">
            <bug-filter @filtered="setFilter"/>
            <router-link to="/bug/edit" class="bug-add-btn">Add a new bug!</router-link>
            <bug-list :bugs="bugs" :user="loggedInUser" @remove="removeBug" />
            <div class="pagination-container">
              <button @click="getPage(-1)" class="bug-btn">Prev Page</button>
              <button @click="getPage(1)" class="bug-btn">Next Page</button>
            </div>
        </section>
    `,
  components: {
    bugList,
    bugFilter
  },
  created() {
    this.loadBugs()
  },
  data() {
    return {
        bugs: [],
        loggedInUser: '',
        filterBy: {txt: '', page: null}
    }
  },
  methods: {
      removeBug(id) {
          bugService.remove(id)
            .then(res => console.log('res.msg',res.msg))
      },
      loadBugs() {
        bugService.query(this.filterBy)
            .then(bugs => {
              this.bugs = bugs
              this.loggedInUser = userService.getLoggedinUser()
            })
      },
      setFilter(filterBy) {
        console.log('filterBy',filterBy);
        this.filterBy = filterBy
        this.filterBy.page = 0
        this.loadBugs()
      },
      getPage(dir){
        console.log('Implement Paging');
        if(this.bugs.length < 4 && dir > 0) return
        this.filterBy.page += dir
        if(this.filterBy.page < 0) this.filterBy.page = 0
        this.loadBugs()
    },
    },
  computed: {},
  unmounted() {},
}