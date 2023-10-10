import { resolve } from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  resolve:{
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }]

  },
  test: {
    environment: 'jsdom',
    setupFiles: ["./src/setupTests.ts"],
    include: ['**/*.test.tsx'],
    globals: true
  },
})