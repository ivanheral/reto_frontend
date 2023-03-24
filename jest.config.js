module.exports = {
    testEnvironment: 'jsdom',
    maxWorkers: 1,
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.(t|j)sx?$': 'esbuild-jest',
        '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect', './setup.js'],
    testMatch: ['**/(*.)+(test|spec).+(jsx)'],
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
};
