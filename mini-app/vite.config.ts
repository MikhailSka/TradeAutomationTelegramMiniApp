import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  base: '/TradeAutomationTelegramMiniApp/',
  server: {
    port: 3000, 
    hmr: {
      clientPort: 3000,  
    },
  },
  build: {
    outDir: 'build', 
  },
});
