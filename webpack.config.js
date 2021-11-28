const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const {
  NODE_ENV,
} = process.env;

const filename = (ext) => (NODE_ENV === 'development' ? `[name].${ext}` : `[name].[contenthash].${ext}`);

const plugins = () => {
  const basePlugins = [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
      favicon: './assets/favicon.ico',
      minify: {
        collapseWhitespace: NODE_ENV === 'production',
      },
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, './src/arenas.html'),
      filename: 'arenas.html',
      favicon: './assets/favicon.ico',
      minify: {
        collapseWhitespace: NODE_ENV === 'production',
      },
    }),
    new MiniCssExtractPlugin({
      filename: `./css/${filename('css')}`,
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, './src/assets/'),
        to: path.resolve(__dirname, './dist'),
      }],
    }),
  ];

  if (NODE_ENV === 'production') {
    basePlugins.push();
  }

  return basePlugins;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './js/main.js',
  mode: NODE_ENV || 'development',
  output: {
    filename: `./js/${filename('js')}`,
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  watch: NODE_ENV === 'development',
  watchOptions: {
    ignored: /node_modules/,
    poll: 1000,
  },
  module: {
    rules: [{
      test: /\.html$/,
      loader: 'html-loader',
    },
    {
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
      },
      exclude: [/node_modules/],
    },
    {
      test: /\.css$/i,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
      ],
    },
    {
      test: /\.s[ac]ss$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader',
      ],
    },
    {
      test: /\.(?:|png|jpe?g|gif|bmp|svg)$/i,
      type: 'asset/resource',
      generator: {
        filename: NODE_ENV === 'development' ? './img/[name][ext][query]' : './img/[name].[hash][ext][query]',
      },
      use: [
        {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              quality: 80,
              progressive: true,
            },
            optipng: {
              enabled: false,
            },
            pngquant: {
              quality: [0.75, 0.90],
              speed: 4,
            },
            gifsicle: {
              interlaced: false,
            },
            webp: {
              quality: 80,
            },
            disable: NODE_ENV === 'development',
          },
        },
      ],
      enforce: 'pre',
    },
    {
      test: /\.(?:|woff2)$/i,
      type: 'asset/resource',
      generator: {
        filename: NODE_ENV === 'development' ? './fonts/[name][ext][query]' : './fonts/[name].[hash][ext][query]',
      },
    },
    ],
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
  plugins: plugins(),
  devServer: {
    historyApiFallback: true,
    static: path.resolve(__dirname, './dist'),
    client: {
      overlay: true,
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
  },
  devtool: NODE_ENV === 'development' ? 'source-map' : false,
};
