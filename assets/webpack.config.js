const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let output = null;
let htmlOut = null;
let isdev = true;
let pkg = require('./package.json');
let theme = pkg.theme;

output = path.resolve(__dirname, '../app/static/dist');
htmlOut = path.join(__dirname,'../app/view/index.html');
if(process.env.NODE_ENV !== "development") {
  isdev = false;
}
let entryBase = [path.join(__dirname,'./src/index.js')];
let plug = ['lodash'];

let config = {
  entry: {
    system: entryBase,
    plug,
  },
  output: {
    path: output,
    chunkFilename: `[name].min.js`,
    filename: `[name].min.js`
  },
  module:{
    rules: [
      {
        test: /\.(jsx|js)?$/,
        exclude: /(node_modules|bower_components)/, 
        use: { 
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react','env'],
            plugins: [
              ["@babel/transform-runtime"],
              [
                "import",
                {libraryName: "antd", style: true}
              ] 
            ]
          }
        } 
      },
      {
        test: /\.(scss|css|less|styl)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: 'postcss.config.js'  // 这个得在项目根目录创建此文件
              }
            }
          },
          {
            loader: 'less-loader',
            options: { 
              javascriptEnabled: true,
              modifyVars: theme   //antd默认主题样式
            } 
          }
        ],
      },
      {
        test: /\.html$/,
        use: [ 
          {
            loader: 'html-loader',
            options: { 
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[ext]'
            } 
          }
        ]
      }
    ]  
  },
  
  resolve: {
    alias: {
      utils: path.resolve(__dirname + '/src/utils'),
      components: path.resolve(__dirname + '/src/components'),
      config: path.resolve(__dirname + '/src/config')
    },
    extensions: [".js", ".jsx", ".json"]
  },
  mode: process.env.NODE_ENV,
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.ProvidePlugin({
      antd: "antd",
    }),

    // 提取样式，生成单独文件
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: "antd.css"
    }),
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',// 目标文件名
      algorithm: 'gzip',// 使用gzip压缩
      test: new RegExp(
          '\\.(js|css)$' // 压缩 js 与 css
      ),
      threshold: 10240,// 资源文件大于10240B=10kB时会被压缩
      minRatio: 0.8 // 最小压缩比达到0.8时才会被压缩
    }),
  ]
}

if(isdev) {
  config.devtool = 'cheap-module-eval-source-map';
} else {
  config.optimization = {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false 
      }),
    ],
    splitChunks: {
      cacheGroups: {
        utils: { // 抽离自定义公共代码
          test: /\.jsx$/,
          chunks: 'all',
          name: 'utils',
          minSize: 0 // 只要超出0字节就生成一个新包
        }
      }
      
    }
  }
}

module.exports = config;