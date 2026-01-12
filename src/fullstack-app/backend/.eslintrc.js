module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // Customize rules as needed
    'no-console': 'off', // Allow console.log in Node.js
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
};
