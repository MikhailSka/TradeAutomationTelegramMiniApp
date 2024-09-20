import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,  // Change port to 3000
    hmr: {
      clientPort: 3000,  // Ensure the client connects on the right port
    },
  },
});
