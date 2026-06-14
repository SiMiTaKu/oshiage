import js from '@eslint/js'
import globals from 'globals'
import eslintConfigPrettier from 'eslint-config-prettier'
import jsdoc from 'eslint-plugin-jsdoc'
import svelte from 'eslint-plugin-svelte'
import tsdoc from 'eslint-plugin-tsdoc'
import unusedImports from 'eslint-plugin-unused-imports'
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
      '**/storybook-static/**',
      '**/api/runtime.ts',
      'backend/jest.config.js',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...svelte.configs['flat/recommended'],
  {
    plugins: {
      'unused-imports': unusedImports,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      'no-restricted-globals': [
        'error',
        {
          name: 'parseInt',
          message: 'Use Number.parseInt instead of global parseInt.',
        },
      ],
      'unused-imports/no-unused-imports': 'error',
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
    ignores: ['**/*.stories.*', '**/*.spec.*', '**/tests/**', '**/+*.ts', '**/+*.js'],
    plugins: {
      jsdoc,
      tsdoc,
      'unused-imports': unusedImports,
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
    rules: {
      // Svelte コンパイラ警告（未使用 CSS セレクタ等）をエラーに昇格
      'svelte/valid-compile': 'error',
      // テンプレートで使用しているが <style> に定義がないクラス名をエラー
      // ※ SCSS の &--modifier ネスト is リント時未コンパイルのため BEM モディファイア（-- を含むクラス）は除外
      'svelte/no-unused-class-name': ['error', { allowedClassNames: ['/^.*--.*$/'] }],
      // {#each} ブロックにキーがない場合はエラー
      'svelte/require-each-key': 'error',
      // 1行あたりの最大属性数を3に制限
      'svelte/max-attributes-per-line': [
        'error',
        {
          multiline: 1,
          singleline: 3,
        },
      ],
    },
  },
  eslintConfigPrettier,
]
