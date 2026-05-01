import js from '@eslint/js'
import globals from 'globals'
import eslintConfigPrettier from 'eslint-config-prettier'
import jsdoc from 'eslint-plugin-jsdoc'
import svelte from 'eslint-plugin-svelte'
import tsdoc from 'eslint-plugin-tsdoc'
import tseslint from 'typescript-eslint'

const EXPORTED_DOC_CONTEXTS = [
  'ExportNamedDeclaration > FunctionDeclaration',
  'ExportDefaultDeclaration > FunctionDeclaration',
  'ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > ArrowFunctionExpression',
  'ExportDefaultDeclaration > ArrowFunctionExpression',
  'ExportNamedDeclaration > ClassDeclaration',
  'ExportDefaultDeclaration > ClassDeclaration',
  'ExportNamedDeclaration > TSInterfaceDeclaration',
  'ExportNamedDeclaration > TSTypeAliasDeclaration',
]

const EXPORTED_FUNCTION_CONTEXTS = [
  'ExportNamedDeclaration > FunctionDeclaration',
  'ExportDefaultDeclaration > FunctionDeclaration',
  'ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > ArrowFunctionExpression',
  'ExportDefaultDeclaration > ArrowFunctionExpression',
]

export default [
  {
    ignores: [
      '**/dist/**',
      '**/.svelte-kit/**',
      '**/coverage/**',
      '**/node_modules/**',
      'openapi/generated/**',
      'web/src/shared/api/generated/**',
      'admin/src/shared/api/generated/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...svelte.configs['flat/recommended'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['**/*.{ts,tsx,js,jsx,mts,cts,mjs,cjs}'],
    ignores: ['**/*.stories.*', '**/*.spec.*', '**/tests/**'],
    plugins: {
      jsdoc,
      tsdoc,
    },
    settings: {
      jsdoc: {
        mode: 'typescript',
      },
    },
    rules: {
      'tsdoc/syntax': 'error',
      'jsdoc/require-jsdoc': [
        'error',
        {
          contexts: EXPORTED_DOC_CONTEXTS,
          require: {
            FunctionDeclaration: true,
            ClassDeclaration: true,
            MethodDefinition: false,
            ArrowFunctionExpression: true,
            FunctionExpression: false,
          },
        },
      ],
      'jsdoc/require-param': [
        'error',
        {
          contexts: EXPORTED_FUNCTION_CONTEXTS,
        },
      ],
      'jsdoc/require-returns': [
        'error',
        {
          contexts: EXPORTED_FUNCTION_CONTEXTS,
        },
      ],
    },
  },
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  eslintConfigPrettier,
]
