module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  root: true,
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {},
    },
  },
  plugins: ['react'],
  rules: {
    radix: 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-array-index-key': 'off', // we will want to turn this back on
    'import/no-cycle': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    // 'parser': 'babel-eslint',
    'linebreak-style': 0,
    indent: ['error', 2],
  },
};
