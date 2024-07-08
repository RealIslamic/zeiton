module.exports = {
    env: {
        browser: true,
        node: true,
        serviceworker: true,
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'react-app', 'react-app/jest'],

    rules: {
        'no-restricted-globals': ['error', 'event', 'fdescribe'],
    },
};
