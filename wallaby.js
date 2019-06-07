var wallabyWebpack = require('wallaby-webpack');

module.exports = function () {

  var webpackPostprocessor = wallabyWebpack({
    entryPatterns: [
      'src/test.wallaby.js',
      'src/**/*.spec.js'
    ],

    module: {
      rules: [
        {test: /\.css$/, loader: ['raw-loader']},
        {test: /\.html$/, loader: 'raw-loader'},
        {test: /\.ts$/, loader: '@ngtools/webpack', include: /node_modules/, query: {tsConfigPath: 'tsconfig.json'}},
        {test: /\.js$/, loader: 'angular2-template-loader', exclude: /node_modules/},
        {test: /\.styl$/, loaders: ['raw-loader', 'stylus-loader']},
        {test: /\.less$/, loaders: ['raw-loader', {loader: 'less-loader'}]},
        {test: /\.scss$|\.sass$/, loaders: [{loader: 'raw-loader'}, {loader: 'sass-loader', options: {implementation: require('sass')}}]},
        {test: /\.(jpg|png|svg)$/, loader: 'raw-loader'}
      ]
    },

    resolve: {
      extensions: ['.js', '.ts']
    },
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      dns: 'empty'
    }
  });

  return {
    files: [
      {pattern: 'src/**/*.+(ts|css|less|scss|sass|styl|html|json|svg)', load: false},
      {pattern: 'src/**/*.spec.ts', ignore: true}
    ],

    tests: [
      {pattern: 'src/**/*.spec.ts', load: false}
    ],

    testFramework: 'jasmine',

    middleware: function (app, express) {
      var path = require('path');
      app.use('/favicon.ico', express.static(path.join(__dirname, 'src/favicon.ico')));
      app.use('/assets', express.static(path.join(__dirname, 'src/assets')));
    },

    env: {
      kind: 'chrome'
    },

    postprocessor: webpackPostprocessor,

    setup: function () {
      window.__moduleBundler.loadTests();
    },

    debug: true
  };
};
