import { defineConfig } from 'tsup';

export default defineConfig({
  entryPoints: ['src'],
  format: ['esm', 'cjs'],
  dts: true,
  outDir: 'dist',
  minify: true,
});
