import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Moderne browsers — geen legacy polyfills
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          // Animatie-bibliotheken in eigen chunk — worden gedeeld tussen pagina's
          'vendor-motion': ['framer-motion'],
          'vendor-gsap': ['gsap'],
          // React core apart — kleinste shared chunk, altijd in cache
          'vendor-react': ['react', 'react-dom'],
          // Sanity apart — alleen geladen op pagina's die data ophalen
          'vendor-sanity': ['@sanity/client', '@sanity/image-url'],
        },
      },
    },
  },
})
