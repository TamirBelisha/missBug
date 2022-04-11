import { bugService } from "../services/bug-app-service.js";
import bugPreview from "../cmps/bug-preview.cmp.js";
export default {
    template: `
    <section v-if="bug" class="bug-details-container app-main">
        <bug-preview :bug="bug" class="bug-details"></bug-preview>
        <router-link to="/bug" class="bug-btn">Back</router-link>
    </section>
    `,
    components: {
        bugPreview
    }
    ,
    data() {
        return {
            bug: null,
        }
    },
    created() {
        this.loadBug();
    },
    computed: {
        
    },
    methods: {
        loadBug() {
            const id = this.$route.params.bugId
            bugService.getById(id)
                .then(bug => {
                    this.bug = bug
                })

        }
    },
    watch: {
        '$route.params.bugId'(id) {
            console.log('Changed to', id);
            this.loadBug();
        }
    }
}
