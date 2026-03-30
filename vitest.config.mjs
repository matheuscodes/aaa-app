import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const srcPath = resolve(__dirname, 'src');

export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      api: resolve(srcPath, 'api'),
      app: resolve(srcPath, 'app'),
      constants: resolve(srcPath, 'constants'),
      global: resolve(srcPath, 'global'),
      model: resolve(srcPath, 'model'),
      svg: resolve(srcPath, 'svg'),
      theme: resolve(srcPath, 'theme.js'),
      i18n: resolve(srcPath, 'i18n.js'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/setupTests.js'],
    include: ['test/**/*.test.{js,jsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['src/**/*.{js,jsx}'],
      thresholds: {
        lines: 40,
        branches: 40,
      },
    },
  },
});
