import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import daStyle from 'eslint-config-dicodingacademy';


/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,jsx}'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    settings: {
      react: {
        version: 'detect', // ⬅️ Tambahkan agar warning "React version not specified" hilang
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // ⬅️ Matikan error import React
      'no-unused-vars': 'warn',
    },
  },
  daStyle
];