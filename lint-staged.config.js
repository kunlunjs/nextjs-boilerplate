module.exports = {
  '**/*.{js?(x),ts?(x)}': ['eslint --fix --cache', 'prettier --write'],
  // https://stylelint.io/user-guide/usage/options
  '**/*.{css,less,sass}': [
    'stylelint --fix --color --cache --ignore-pattern .stylelintignore'
  ]
}
