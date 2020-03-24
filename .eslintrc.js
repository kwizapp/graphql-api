module.exports = {
  extends: ['@kwizapp/eslint-config-ts'],
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  root: true,
  env: {
    node: true,
    jest: true,
  },
}
