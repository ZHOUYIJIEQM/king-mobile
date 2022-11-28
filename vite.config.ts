import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// https://github.com/antfu/unplugin-vue-components
import Components from 'unplugin-vue-components/vite'
// https://github.com/antfu/unplugin-auto-import
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(), 
    vueJsx(),
    Components({ /* options */ }),
    AutoImport({ 
      imports: ['vue', 'vue-router']  
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {			
    host: '0.0.0.0',
    port: 3001,
  }
})
