const path = require('path')

module.exports = {
  devtool: false,
  entry: {
    app: './src/index.js',
  },
  output: {
    library: 'index',
    libraryTarget: 'commonjs2',
    filename: 'index.js',
    hashFunction: 'xxhash64',
  },
  resolve: {
    modules: [__dirname, 'node_modules', 'src'],
    extensions: ['*', '.js', '.json'],
  },
  resolveLoader: {
    modules: [path.join(__dirname, 'node_modules')],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: [path.join(__dirname, 'src')],
        exclude: /node_modules/,
      },
    ],
  },
  target: 'node',
}
