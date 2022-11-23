const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const environments = require('./build-environments.json');

const sourcePath = path.resolve(__dirname, 'src');

module.exports = (config) => {
  const production = config.mode === 'production';
  const environment = production ? environments.production : environments.local;

  config.entry.authCallback = `${sourcePath}/app/authentication/callback.ts`;

  config.plugins.push(
    new HtmlWebpackPlugin({
      chunks: ['runtime', 'vendor', 'authCallback'],
      filename: 'callback.html',
      template: `${sourcePath}/app/authentication/callback.html`
    })
  );

  config.plugins.push(
    new HtmlWebpackPlugin({
      chunks: [],
      filename: 'silent-callback.html',
      template: `${sourcePath}/app/authentication/silent-callback.html`
    })
  );

  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.ENVJS': JSON.stringify(environment.envjs)
    })
  );

  return config;
};
