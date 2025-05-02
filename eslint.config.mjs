import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import prettier from 'eslint-plugin-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Specify environment from environment variable or default to 'development'
const env = process.env.NODE_ENV || 'development';

const config = [
  // Configuration from Next.js core-web-vitals and typescript
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  // Prettier Configuration
  {
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
    },
  },
  // Custom rule for no-console
  {
    rules: {
      'no-console': [
        'error',
        {
          allow: env === 'development' ? ['log', 'warn', 'error'] : [],
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off', // Allows use of any
    },
  },
];

export default config;
