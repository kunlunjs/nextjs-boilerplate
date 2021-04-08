module.exports = {
  '**/*.{js,jsx,ts,tsx}': [
    'eslint --fix --cache --ext .js,jsx,ts,tsx',
    'prettier --write'
  ],
  // https://stylelint.io/user-guide/usage/options
  '**/*.{css,less,sass}': [
    'stylelint --fix --color --cache --ignore-pattern .stylelintignore'
  ]
}
