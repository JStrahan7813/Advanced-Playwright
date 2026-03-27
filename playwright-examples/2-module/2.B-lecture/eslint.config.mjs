import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
//import eslintPluginPlaywright from 'eslint-plugin-playwright';

export default defineConfig([
  {
    ignores: ['package-lock.json', 'playwright-report/**', 'test-results/**'],
  },
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        warnOnUnsupportedTypeScriptVersion: true,
      },
    },
    rules: {
      'no-console': 'error',
      'no-var': 'error',
    },
    // extends: [js.configs.recommended, tsPlugin.configs.recommended],
  },
]);
