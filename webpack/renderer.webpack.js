module.exports = {
  externals: {
    electron: 'commonjs2 electron',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: require('./rules.webpack'),
  },
}