import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import blogIndex from './src/blog/blogIndex.json'

export default defineConfig({
  plugins: [vue()],
  ssgOptions: {
    includedRoutes(paths: string[]) {
      return paths.flatMap(p =>
        p === '/articles/:id'
          ? blogIndex.posts
              .filter(post => !post.preview)
              .map(post => `/articles/${post.id}`)
          : [p],
      )
    },
  },
})
