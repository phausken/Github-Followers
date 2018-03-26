const path = require('path');

module.exports = {
  entry: './components/root.jsx',
  mode: 'development',
  output: {
    path: path.resolve(__dirname),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
         test: /\.jsx?$/,
         exclude: /(node_modules)/,
         loader: 'babel-loader',
         query: {
           presets: ['env', 'react']
         }
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '*']
  }
};
