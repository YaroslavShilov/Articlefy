const path = require('path');

module.exports = {
  mode: 'development',
  target: 'web',
  devtool: 'eval-source-map',
  devServer: {
    static: path.resolve(__dirname, '../dist'),
    port: 3000,
    hot: true,
    open: true,
    compress: true,
  },
};
