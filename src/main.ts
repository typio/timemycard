import { ViteSSG } from 'vite-ssg'
import { createHead as createClientHead } from '@unhead/vue/client'
import { createHead as createServerHead } from '@unhead/vue/server'

import './style.css'
import App from './App.vue'
import Home from './routes/Home.vue'
import MeetUs from './routes/MeetUs.vue'
import Articles from './routes/Articles.vue'

export const createApp = ViteSSG(
  App,
  {
    scrollBehavior: () => ({ top: 0 }),
    routes: [
      { path: '/', component: Home },
      // {path: , component}
      { path: '/articles', component: Articles },
      { path: '/articles/:id', component: Articles, props: true },
      { path: '/meet-us', component: MeetUs },
    ],
  },
  ({ app }) => {
    const head = import.meta.env.SSR ? createServerHead() : createClientHead()
    app.use(head)
  },
)



