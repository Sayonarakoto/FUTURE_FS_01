import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended, // ESLint's recommended rules
      reactHooks.configs.flat.recommended, // React Hooks specific rules
      reactRefresh.configs.vite, // Rules for React Refresh (often used with Vite)
    ],
    languageOptions: {
      ecmaVersion: 2020, // ECMAScript version
      globals: globals.browser, // Browser global variables
      parserOptions: {
        ecmaVersion: 'latest', // Use the latest ECMAScript syntax
        ecmaFeatures: { jsx: true }, // Enable JSX
        sourceType: 'module', // Enable ES module syntax
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }], // Disallow unused variables, but allow those starting with uppercase letters or underscore (e.g., for constants)
    },
  },
]);
