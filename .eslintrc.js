module.exports = {
  "extends": "airbnb",
  "plugins": [
    "react"
  ],
  "rules" : {
    "no-param-reassign": ["error", { "props": false }],
    "react/prefer-es6-class": ['error', 'never'],
    "strict": 0,
    "no-underscore-dangle": 0,
    "import/no-unresolved": 0,
    "react/prefer-stateless-function": 0,
    "no-nested-ternary": 0,
    "react/no-did-mount-set-state": 0,
    "no-new": 0,
    "no-console": 0,
  }
};