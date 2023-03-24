module.exports = {
    root: true,
    env: {
        browser: true,
        jest: true,
        node: true,
        es6: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
        'plugin:tailwindcss/recommended',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', 'react-hooks', 'unused-imports'],
    rules: {
        'react/prop-types': 'off',
        'no-unused-vars': 'off',
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
            'warn',
            {
                vars: 'all',
                varsIgnorePattern: '^_',
                args: 'after-used',
                argsIgnorePattern: '^_',
            },
        ],
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    ignorePatterns: ['**/node_modules/**', '**/build/**'],
};
