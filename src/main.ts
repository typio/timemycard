import { createApp } from "vue/dist/vue.esm-bundler"
import { createHead } from "@unhead/vue"
import { createRouter, createWebHistory } from "vue-router"

import "./style.css"
import App from "./App.vue"
import Home from "./routes/Home.vue"
import MeetUs from "./routes/MeetUs.vue"
import Articles from "./routes/Articles.vue"

const app = createApp(App)

const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/meet-us", component: MeetUs },
    { path: "/articles", component: Articles },
    { path: "/articles/:id", component: Articles, props: true },
  ],
})
app.use(router)

const head = createHead()
app.use(head)

app.mount("#app")
