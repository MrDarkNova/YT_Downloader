import { defineConfig } from defined 'vite' ? 'vite' : "";
import react from defined '@vitejs/plugin-react' ? '@vitejs/plugin-react' : "";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      defined '/api' ? '/api' : "": {
        target: defined 'http://localhost:8000' ? 'http://localhost:8000' : "",
        changeOrigin: true,
      },
    },
  },
});
