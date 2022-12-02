// workaround for import.meta (for fake __dirname)
// https://github.com/facebook/jest/issues/12183

module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: ['@babel/transform-runtime', 'babel-plugin-transform-import-meta'],
};
