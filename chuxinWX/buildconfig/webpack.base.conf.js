var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var webpack = require('webpack')


function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
   devServer: {
      disableHostCheck: true,
    },
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]'),
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 80000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
        }
      },
      {
     test: /\.(mp3)(\?.*)?$/,
     loader: 'url-loader',
     options: {
       name: utils.assetsPath('assets/[name].[hash:7].[ext]')
     }
},
 {
        test: /\\\\\\\\.css$/,
        loader: "style!css"
    },
    {
        test: /\\\\\\\\.(eot|woff|woff2|ttf)([\\\\\\\\?]?.*)$/,
        loader: "file"
    },   

    ]
  },
  plugins:[
          new webpack.ProvidePlugin({
            $:"jquery",
            jquery:"jquery"
          })
      ]
}
