/* eslint-disable import/no-anonymous-default-export */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  'baseDirectory': __dirname,
  'recommendedConfig': js.configs.recommended,
  'allConfig': js.configs.all
});

export default [
  ...compat.extends('next/core-web-vitals', 'plugin:@typescript-eslint/recommended'),
  {
    'rules': {
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'curly': ['error', 'all'],

      'no-multi-spaces': ['error', { 'ignoreEOLComments': true, }],

      'array-bracket-newline': ['error', { 'multiline': true, }],

      'array-bracket-spacing': ['error', 'never'],
      'block-spacing': ['error', 'always'],
      'brace-style': ['error', '1tbs'],

      'comma-spacing': [
        'error', {
          'before': false,
          'after': true,
        }
      ],

      'comma-style': ['error', 'last'],
      'computed-property-spacing': ['error', 'never'],
      'eol-last': ['error', 'never'],
      'func-call-spacing': ['error', 'never'],
      'function-paren-newline': ['error', 'multiline'],

      'indent': [
        'error', 2, {
          'SwitchCase': 1,
          'outerIIFEBody': 0,
          'ImportDeclaration': 1,
          'flatTernaryExpressions': false,
        }
      ],

      'jsx-quotes': ['error', 'prefer-double'],

      'key-spacing': [
        'error', {
          'beforeColon': false,
          'afterColon': true,
          'mode': 'strict',
        }
      ],

      'keyword-spacing': [
        'error', {
          'before': true,
          'after': true,
        }
      ],

      'lines-between-class-members': ['error', 'always'],

      'max-len': [
        'error', {
          'code': 80,
          'ignoreTrailingComments': true,
          'ignoreComments': true,
          'ignoreUrls': true,
          'ignoreStrings': true,
          'ignoreTemplateLiterals': true,
          'ignoreRegExpLiterals': true,
        }
      ],

      'no-multiple-empty-lines': ['error', { 'max': 1, }],

      'no-trailing-spaces': 'error',
      'no-whitespace-before-property': 'error',

      'object-curly-newline': ['error', { 'multiline': true, }],

      'object-curly-spacing': ['error', 'always'],
      'operator-linebreak': ['error', 'after'],
      'padded-blocks': ['error', 'never'],

      'padding-line-between-statements': [
        'error', {
          'blankLine': 'always',
          'prev': ['const', 'let', 'var'],
          'next': '*',
        }, {
          'blankLine': 'any',
          'prev': ['const', 'let', 'var'],
          'next': ['const', 'let', 'var'],
        }, {
          'blankLine': 'always',
          'prev': ['function'],
          'next': '*',
        }, {
          'blankLine': 'always',
          'prev': '*',
          'next': ['function'],
        }
      ],

      'quote-props': ['error', 'always'],

      'semi-spacing': [
        'error', {
          'before': false,
          'after': true,
        }
      ],

      'semi-style': ['error', 'last'],

      'space-before-function-paren': [
        'error', {
          'anonymous': 'always',
          'named': 'never',
          'asyncArrow': 'always',
        }
      ],

      'space-in-parens': ['error', 'never'],
      'space-infix-ops': 'error',

      'space-unary-ops': [
        2, {
          'words': true,
          'nonwords': false,

          'overrides': { 'new': false, },
        }
      ],

      'switch-colon-spacing': [
        'error', {
          'after': true,
          'before': false,
        }
      ],

      'arrow-body-style': ['error', 'as-needed'],
      'arrow-parens': ['error', 'as-needed'],
      'arrow-spacing': 'error',
      'generator-star-spacing': ['error', 'after'],
      'rest-spread-spacing': ['error', 'never'],
      'template-curly-spacing': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];