const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  mode:'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    // to find the dist in the current path = ./dist
    filename: 'bundle.js'
  },
  plugins:[
    new HtmlWebpackPlugin({
      title: 'Custom template',
      template: './src/index.html'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets:['@babel/preset-react']
            },
          },
        ],
      },
    ],
  } ,

};