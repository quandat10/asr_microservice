/** @type {import('@jest/types').Config.InitialOptions} */

module.exports = {
    rootDir: '.',
    testMatch: ['<rootDir>/test/**/*.spec.ts'],
    testPathIgnorePatterns: ['<rootDir>/src/__mocks__/*', '<rootDir>/src/__helper__/*'],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        "^#/(.*)$": "<rootDir>/core/$1"
    },
    testEnvironment: "node",
    setupFiles: ["<rootDir>/test/setup-tests.ts"]
}