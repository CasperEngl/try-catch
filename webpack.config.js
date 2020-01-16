/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');

module.exports = {
  entry: './src/try-catch.ts',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'try-catch.js',
    path: path.resolve(__dirname, 'lib'),
  },
};
