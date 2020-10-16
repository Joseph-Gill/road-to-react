module.exports = {
    "env": {
        "browser": true,
        // "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        // note you must disable the base rule as it can report incorrect errors
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": ["error"]
    }
};
