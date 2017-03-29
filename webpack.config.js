let webpack = require('webpack');
let path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractLess = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: false
});

const NODE_ENV = process.env.NODE_ENV || 'production';
const AUTH = process.env.AUTH || false;

module.exports = {

  entry: [
    './app/app'
  ],

  devtool: '#inline-source-map',

  devServer: {
    historyApiFallback: true
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'build/bundle.js',
    publicPath: '/build/',
  },

  resolve: {
    modules: [
      path.join(__dirname, 'app'), "node_modules"
    ],
    extensions: ['.js', '.jsx']
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'react-hot-loader'
        },
        {
          loader: 'babel-loader'
        },
      ],
    }, {
      test: /\.jsx$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'react-hot-loader'
        },
        {
          loader: 'babel-loader'
        },
      ],
    }, {
      test: /\.json$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'json-loader'
        },
      ],
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'style!css'
        },
      ],
    }, {
      test: /\.less$/,
      loader: extractLess.extract({
        use: [{
          loader: "css-loader"
        }, {
          loader: "less-loader"
        }],
        fallback: "style-loader"
      })
    }, {
      test: /\.woff$/,
      use: [
        {
          loader: 'url-loader?limit=10000&minetype=application/font-woff'
        },
      ],
    }, {
      test: /\.ttf$/,
      use: [
        {
          loader: 'file-loader'
        },
      ],
    }, {
      test: /\.eot$/,
      use: [
        {
          loader: 'file-loader'
        },
      ],
    }, {
      test: /\.svg$/,
      use: [
        {
          loader: 'file-loader'
        },
      ],
    }, {
      test: /\.png$/,
      use: [
        {
          loader: 'file-loader'
        },
      ],
    }, {
      test: /\.gif$/,
      use: [
        {
          loader: 'file-loader'
        },
      ],
    }, {
      test: /\.swf$/,
      use: [
        {
          loader: 'file-loader'
        },
      ],
    }
    ]
  },

  node: {
    fs: "empty"
  },

  externals: {
    'showdown': 'window.Showdown'
  },

  plugins: NODE_ENV == 'development' ? [
    extractLess,
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('development')
      },
      NODE_ENV: JSON.stringify(NODE_ENV),
      AUTH: AUTH
    }),
  ] : [
      new webpack.DefinePlugin({
        'process.env':{
          'NODE_ENV': JSON.stringify('production')
        },
        NODE_ENV: JSON.stringify(NODE_ENV),
        AUTH: AUTH
      }),
      new webpack.optimize.UglifyJsPlugin({
        output: {
          comments: false
        },
        compress: {
          warnings: false,
        },
      }),
    ]
};