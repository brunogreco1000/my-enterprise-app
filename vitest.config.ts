import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,            // allows global `expect` and `test`
    environment: 'jsdom',     // needed for DOM APIs
    setupFiles: './src/setupTests.ts', // points to your jest-dom setup
  },
});
