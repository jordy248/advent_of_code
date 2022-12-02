/** @type {import('jest').Config} */
const config = {
  verbose: true,
  testPathIgnorePatterns: ['/node_modules/', '/2021/'],
  setupFilesAfterEnv: ['./utils/setupTests.js'],
  transform: {
    '\\.js$': ['babel-jest', { configFile: './babel-jest.config.cjs' }],
  },
};

export default config;
