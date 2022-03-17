module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier'],
    extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    rules: {
        'prettier/prettier': 'error',
        'no-empty-function': 'off',
        '@typescript-eslint/no-empty-function': ['warn'],
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'warn',
        '@typescript-eslint/semi': ['error'],
        '@typescript-eslint/camelcase': 'off',
        'space-before-blocks': ['error'],
        'comma-spacing': ['error', { before: false, after: true }],
        'key-spacing': ['error', { mode: 'strict' }],
        'max-len': 'off',
        'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
    overrides: [
        {
            files: ['*.ts'],
            rules: {
                '@typescript-eslint/explicit-member-accessibility': ['off'],
            },
        },
    ],
};
