import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/smurf/",
  plugins: [vue()],
  server: {
    port: 30322,
    host: "0.0.0.0"
  },
})
