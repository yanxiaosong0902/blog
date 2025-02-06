import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

// const eslintConfig = [
//   ...compat.extends("next/core-web-vitals", "next/typescript"),
// ];
const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next'),
  // {
  //   rules: {
  //     "react/react-in-jsx-scope": "off",
  //     'quotes': ['error', 'single'],
  //     'no-console': 'error',
  //   },
  // },
  {
    // root: true,
    // extends: [
    //   "eslint:recommended",
    //   "plugin:@typescript-eslint/recommended"
    // ],
    // parser: "@typescript-eslint/parser",
    // parserOptions: {
    //   project: "./tsconfig.json",
    // },
    // plugins: ["@typescript-eslint", 'react', 'react-hooks'],
    // settings: {
    //   'import/resolver': {
    //     node: {
    //       extensions: ['.js', '.jsx', '.ts', '.tsx'],
    //       moduleDirectory: ['node_modules', './src']
    //     }
    //   }
    // },
    rules: {
      'no-underscore-dangle': 'off',
      'quotes': ['error', 'single'],
      'no-console': 'warn',
      'space-infix-ops': ['error', { 'int32Hint': false }],
      'space-before-blocks': 'error',
      'no-explicit-any': 'off',
      'semi': ['error', 'never'],
      'no-unused-vars': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
      // 'react/jsx-indent': ['error', 'always'],
      'react/jsx-indent': ['error', 2, {
        'indentLogicalExpressions': true
      }],
      'react/jsx-tag-spacing': ['error', { 'beforeSelfClosing': 'always' }],
      'react/jsx-curly-spacing': [
        'error',
        'never',
        {
          'allowMultiline': true
        }
      ],
      'react/jsx-indent-props': ['error', 2],
      'react/jsx-max-props-per-line': [
        'error',
        {
          'maximum': 1,
          'when': 'multiline'
        }
      ],
      'react/self-closing-comp': ['error', { 'component': true, 'html': true }],
      'indent': ['error', 2, {
        'ignoredNodes': ['ConditionalExpression', 'TSTypeParameterInstantiation'],
        'SwitchCase': 1,
        // "ObjectExpression": 1,
        // "MemberExpression": "off",
        // "flatTernaryExpressions": true,
        // "FunctionDeclaration": {"body": 1, "parameters": 0}
      }],
      'eol-last': ['error', 'always'],
      'arrow-spacing': [
        'error',
        {
          'before': true,
          'after': true
        }
      ],
      'no-trailing-spaces': [
        'error',
        {
          'skipBlankLines': false,
          'ignoreComments': false
        }
      ],
    }
  }
]
export default eslintConfig
