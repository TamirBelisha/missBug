export default {
  props: ["bug"],
  template: `
        <section class="mbottom">
                <p>BUG ID: <span>{{bug._id}}</span></p>
                <p>Title: <span>{{bug.title}}</span></p>
                <p>Description: <span>{{bug.description}}</span></p>
                <p>Severity: <span>{{bug.severity}}</span></p>
                <p>Timestamp: <span>{{bug.createdAt}}</span></p>
                <router-link :to="'/user/' + bug.owner._id">
                  <p>Created by: <span>{{bug.owner.fullname}}</span></p>
                </router-link>
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