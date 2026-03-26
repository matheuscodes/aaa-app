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
    dedupe: ['react', 'react-dom'],
    // Vite 8 uses Rolldown for pre-bundling. Rolldown has a bug where it generates
    // broken __esmMin lazy initializers for the ESM builds of @material-ui/styles,
    // causing `import_react$2 is undefined` when ThemeProvider calls React.useMemo.
    // Forcing resolution to prefer the CJS 'main' entry over the ESM 'module' entry
    // makes Rolldown use __commonJSMin instead, which initializes correctly.
    mainFields: ['browser', 'main'],
    alias: {
      // Mirror jsconfig.json baseUrl: "src" so all top-level src imports resolve
      api: resolve(srcPath, 'api'),
      app: resolve(srcPath, 'app'),
      constants: resolve(srcPath, 'constants'),
      global: resolve(srcPath, 'global'),
      model: resolve(srcPath, 'model'),
      svg: resolve(srcPath, 'svg'),
    },
  },
  optimizeDeps: {
    // Vite 8 uses Rolldown for pre-bundling. Rolldown has a bug where it generates
    // broken __esmMin lazy initializers for @material-ui/styles ESM modules, causing
    // `import_react$2 is undefined` at runtime. Forcing Rolldown to use the CJS entry
    // (via mainFields without 'module') avoids the ESM code path and the bug.
    rolldownOptions: {
      resolve: {
        mainFields: ['browser', 'main'],
      },
    },
  },
  define: {
    // Vite doesn't define process.env like webpack/CRA does.
    // Expose the specific process.env keys used in the source code.
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
    'process.env.clientRequestURL': JSON.stringify(process.env.clientRequestURL || ''),
  },
});
