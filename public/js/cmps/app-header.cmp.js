export default {
  // props: [""],
  template: `
        <section class="app-header">
            <h1 class="logo">Miss Bug</h1>
            <div class="header-nav-container">
                <router-link to="/">Login</router-link>
                <router-link to="/bug">Bug app</router-link>
            </div>
        </section>
    `,
  components: {},
  created() {},
  data() {
    return {}
  },
  methods: {},
  computed: {},
  unmounted() {},
}