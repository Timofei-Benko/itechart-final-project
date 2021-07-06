module.exports = {
    root: false,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/ban-types': 1,
        'quotes': ['warn', 'single'],
        'no-console': 'off',
    },
    env: {
        browser: true,
        node: true,
        es6: true
    },
};