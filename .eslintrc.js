module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "semi": [2, "always"],
    "no-extra-semi": 0,
    'generator-star-spacing': 'off',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'ignore',
        named: 'ignore'
      }
    ],
  }
}
