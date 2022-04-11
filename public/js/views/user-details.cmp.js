import { userService } from "../services/user.service.js";
import userPreview from "../cmps/user-preview.cmp.js";
export default {
    template: `
    <section v-if="user" class="bug-details-container">
        <user-preview :user="user" class="bug-details"></user-preview>
        <router-link to="/" class="bug-btn">Back</router-link>
    </section>
    `,
    components: {
        userPreview
    }
    ,
    data() {
        return {
            user: null,
        }
    },
    created() {
        this.loadUser();
    },
    computed: {
        
    },
    methods: {
        loadUser() {
            const id = this.$route.params.userId
            userService.getById(id)
                .then(user => {
                    this.user = user
                })

        }
    },
    watch: {
        '$route.params.userId'(id) {
            console.log('Changed to', id);
            this.loadUser();
        }
    }
}
