import appHeader from './cmps/app-header.cmp.js'
import { router } from './routes.js'


const options = {
    router: router,
    template: `
        <section class="main-layout">
            <app-header></app-header>
            <router-view></router-view>
        </section>
    `,
    components: {
        appHeader
    }
}

const app = Vue.createApp(options)
app.use(router)
app.mount('#app')

