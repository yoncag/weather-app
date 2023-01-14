const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevEnv = process.env.NODE_ENV === 'development';
const PORT = process.env.PORT || 3000;

module.exports = {
  mode: isDevEnv ? 'development' : 'production',
  entry: './src/index.js',
  resolve: {
    extensions: ['*', '.js'],
  },
  devServer: {
    port: PORT,
    historyApiFallback: true,
    open: true,
  },
  devtool: isDevEnv ? 'cheap-module-source-map' : 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
          },
        },
      },
      {
        test: /\.(less|css)$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'less-loader' },
        ],
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
  ],
};