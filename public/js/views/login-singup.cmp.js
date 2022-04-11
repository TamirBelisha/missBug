import { userService } from "../services/user.service.js"
export default {
  // props: [""],
  template: `
        <section class="bug-details-container">
            <div class="bug-details">
                <h1>Welcome to Miss Bug</h1>
            </div>
            <div v-if="loggedInUser" class="bug-details login-section">
                <button @click="logout">Logout {{loggedInUser.fullname}}</button>
                <router-link to="/bug" class="mleft">To the app</router-link>
                <router-link v-if="loggedInUser.isAdmin" to="/user/" class="mleft">To user management</router-link>
                <router-link v-else :to="'/user/' + loggedInUser._id" class="mleft">To the user page</router-link>
            </div>
            <div v-else v-if="!isSignUp" class="bug-details login-section">
                <form @submit.prevent="login">
                    <input v-model="username" type="text" placeholder="Username">
                    <input v-model="password" type="text" placeholder="Password">
                    <button>Login</button>
                </form>
                <a class="signup-nav" @click="isSignUp = !isSignUp">To Sign Up</a>
            </div>
            <div v-if="isSignUp" class="bug-details login-section">
                <form @submit.prevent="signup">
                    <input v-model="fullname" type="text" placeholder="Full name">
                    <input v-model="username" type="text" placeholder="Username">
                    <input v-model="password" type="text" placeholder="Password">
                    <button>Sign Up</button>
                </form>
            </div>
        </section>
    `,
  components: {},
  created() {
      this.loggedInUser = userService.getLoggedinUser()
  },
  data() {
    return {
        username: '',
        password: '',
        loggedInUser: '',
        isSignUp: false,
        fullname: ''
    }
  },
  methods: {
      login() {
          userService.login(this.username, this.password)
            .then(user=> {
                this.loggedInUser = user
                this.username = ''
                this.password = ''
            })
      },
      signup() {
        userService.signup(this.fullname, this.username, this.password)
        .then(user=> {
            this.loggedInUser = user
            this.username = ''
            this.password = ''
            this.isSignUp = false
        })
      },
      logout() {
          userService.logout()
            .then(user => {
                this.loggedInUser = user
            })
      }
  },
  computed: {
  },
  unmounted() {},
}