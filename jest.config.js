/** @type {import('jest').Config} */
const config = {
  verbose: true,
  testPathIgnorePatterns: [
    '/node_modules/',
    '/2021/',
    '/2022/',
    '/2023/',
  ],
  setupFilesAfterEnv: ['./src/utils/setupTests.js'],
  transform: {
    '\\.js$': ['babel-jest', { configFile: './babel-jest.config.cjs' }],
  },
};

export default config;
