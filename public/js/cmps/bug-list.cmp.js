import bugPreview from "./bug-preview.cmp.js"

export default {
  props: ["bugs", "user"],
  template: `
        <section class="bug-list-container">
            <div v-for="bug in bugs" class="bug-preview">
                <bug-preview :bug="bug" ></bug-preview>
                <div class="bug-btn-container">
                  <button v-if="(bug.owner._id === user._id || user.isAdmin)" @click="remove(bug._id)" class="bug-btn">Delete</button>
                  <router-link :to="'/bug/'+bug._id" class="bug-btn">Details</router-link>
                  <router-link v-if="(bug.owner._id === user._id || user.isAdmin)" :to="'/bug/edit/'+bug._id" class="bug-btn">Edit</router-link>
                </div>
            </div>
        </section>
    `,
  components: {
      bugPreview
  },
  created() {},
  data() {
    return {}
  },
  methods: {
      remove(bugId) {
          this.$emit('remove', bugId)
      }
  },
  computed: {},
  unmounted() {},
}