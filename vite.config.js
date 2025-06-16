import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Proy-final/', // 👈 IMPORTANTE
  plugins: [react()],
});
