/** @type {import('jest').Config} */
const config = {
  verbose: true,
  testPathIgnorePatterns: ['/node_modules/', '/2021/'],
  setupFilesAfterEnv: ['./utils/setupTests.js'],
};

export default config;
