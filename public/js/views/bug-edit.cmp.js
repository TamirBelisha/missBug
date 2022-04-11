import { bugService } from '../services/bug-app-service.js'
import { userService } from '../services/user.service.js'
// import { eventBus } from '../services/event-bus.service.js'

export default {
    template: `
   <section v-if="bugToEdit" class="bug-details-container">
       <div class="bug-details">
           <h3>{{title}}</h3>
           <p>Bug id: {{bugToEdit._id}}</p>
       </div>
        <form @submit.prevent="save" class="bug-input-container">
            <label class="bug-input">Title: 
                <input type="text" placeholder="Title" v-model="bugToEdit.title">
            </label>
            <label  class="bug-input">Description: 
                <input type="text" placeholder="Description" v-model.number="bugToEdit.description">
            </label>
            <label class="bug-input">Severity: 
                <input type="range" placeholder="Severity" min="1" max="3" v-model="bugToEdit.severity" class="severity-input">
                {{bugToEdit.severity}}
            </label>
            <button class="bug-btn btn-margin">Save</button>
        </form>
        <router-link to="/bug" class="bug-btn btn-margin">Back</router-link>
   </section>
    `,
    data() {
        return {
            bugToEdit: null,
            user: ''
        }
    },
    
    methods: {
        save() {
            bugService.save(this.bugToEdit)
                .then(bug => {
                    console.log('Saved bug:', bug);
                    // const msg = {
                    //     txt: 'Car saved succesfully',
                    //     type: 'success'
                    // }
                    // eventBus.emit('show-msg', msg)
                    this.$router.push('/bug')
                })
                .catch(err => {
                    console.log(err);
                    // const msg = {
                    //     txt: 'Error, please try again later',
                    //     type: 'error'
                    // }
                    // eventBus.emit('show-msg', msg)
                })
        }
    },
    computed: {
        title() {
            return this.bugId ? 'bug Edit' : 'bug Add'
        },
        bugId() {
            return this.$route.params.bugId
        }
    },
    created() {
        if (this.bugId) {
            bugService.getById(this.bugId).then(bug => this.bugToEdit = bug)
        } else {
            this.bugToEdit = bugService.getEmptyBug()
        }
        this.user = userService.getLoggedinUser()
    }
   
}
