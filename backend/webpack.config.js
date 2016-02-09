var webpack = require('webpack');

module.exports = {
  entry: './app.jsx',
  output: {
    path: '../app/assets/javascripts/backend/',
    filename: 'app.js'
  },
  module: {
    preloaders: [
      {
        test: /(\.jsx$)/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /(\.jsx$)/,
	exclude: /node_modules/,
	loader: 'babel',
	query: {
	  presets: [ 'es2015', 'react' ]
 	}
      }
    ]
  },
  eslint: {
    configFile: '.eslintrc'
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
};
        
