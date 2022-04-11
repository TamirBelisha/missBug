import bugApp from "./views/bug-app.cmp.js";
import loginPage from "./views/login-singup.cmp.js";
import bugDetails from "./views/bug-details.cmp.js";
import bugEdit from "./views/bug-edit.cmp.js";
import userDetails from "./views/user-details.cmp.js";
import userList from "./views/user-list.cmp.js";

const routes = [
    {
        path: '/',
        component: loginPage,
    },
    {
        path: '/bug',
        component: bugApp,
    },
    {
        path: '/bug/edit/:bugId?',
        component: bugEdit
    },
    {
        path: '/bug/:bugId',
        component: bugDetails
    },
    {
        path: '/user',
        component: userList
    },
    {
        path: '/user/:userId',
        component: userDetails
    }
]

export const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})
