import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(), 
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'HqSport',
        short_name: 'HqSport',
        description: 'Premium Pickleball Court Booking in Kolkata',
        theme_color: '#ffffff',
        background_color: '#000000', // Matches your site's black background
        display: 'standalone',
        scope: '/',        // Updated for hqsport.in
        start_url: '/',    // Updated for hqsport.in
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  base: '/', // CRITICAL: Ensures assets load from hqsport.in/ instead of hqsport.in/HqSport/
})