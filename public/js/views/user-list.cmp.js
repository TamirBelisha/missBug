import { userService } from "../services/user.service.js"
import userPreview from "../cmps/user-preview.cmp.js"

export default {
  template: `
        <section class="bug-list-container">
            <div v-for="user in users" class="bug-preview">
                <user-preview :user="user"></user-preview>
                <div class="bug-btn-container">
                  <button @click="remove(user._id)" class="bug-btn">Delete</button>
                  <router-link :to="'/user/'+user._id" class="bug-btn">Details</router-link>
                </div>
            </div>
        </section>
    `,
  components: {
      userPreview
  },
  created() {
    userService.query()
      .then(users => {
        this.users =  users
      })
  },
  data() {
    return {
      users: []
    }
  },
  methods: {
      remove(userId) {
        userService.remove(userId)
          .then(res => console.log('msg:',res.msg))
          .catch(err => console.log(err))
      }
  },
  computed: {},
  unmounted() {},
}