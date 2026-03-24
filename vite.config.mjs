import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const srcPath = resolve(__dirname, 'src');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  publicDir: 'public',
  build: {
    outDir: 'build',
  },
  resolve: {
    alias: {
      // Mirror jsconfig.json baseUrl: "src" so all top-level src imports resolve
      api: resolve(srcPath, 'api'),
      app: resolve(srcPath, 'app'),
      constants: resolve(srcPath, 'constants'),
      global: resolve(srcPath, 'global'),
      model: resolve(srcPath, 'model'),
      svg: resolve(srcPath, 'svg'),
      // Material-UI uses mixed-case Fab but some imports use lowercase 'fab'
      '@material-ui/core/fab': '@material-ui/core/Fab',
    },
  },
  define: {
    // Vite doesn't define process.env like webpack/CRA does.
    // Expose the specific process.env keys used in the source code.
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
    'process.env.clientRequestURL': JSON.stringify(process.env.clientRequestURL || ''),
  },
});
