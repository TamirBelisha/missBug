export default {
  props: ["user"],
  template: `
        <section class="mbottom">
                <p>User ID: <span>{{user._id}}</span></p>
                <p>Fullname: <span>{{user.fullname}}</span></p>
                <p>Username: <span>{{user.username}}</span></p>
                <p>Bugs added: <span>{{user.bugCount}}</span></p>
                <p>Timestamp: <span>{{user.createdAt}}</span></p>
                <p v-if="user.isAdmin">You are an Admin</p>
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