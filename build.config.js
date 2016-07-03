var path = require('path');
var webpack = require('webpack');
var extend = require('extend');
var AssetsPlugin = require('assets-webpack-plugin');

var DEBUG = process.argv.indexOf('--release') == -1;
var VERBOSE = process.argv.indexOf('--verbose') != -1;
var AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 7',
  'Opera >= 12',
  'Safari >= 7.1',
];
var GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  __DEV__: DEBUG,
};

//
// Common configuration to be used for both
// client-side (client.js) and server-side (server.js) bundles
// -----------------------------------------------------------------------------
var config = {
  context: path.resolve(__dirname, 'src'),

  output: {
    path: path.resolve(__dirname, 'build/public/assets'),
    publicPath: '/assets/'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [
          //path.resolve(__dirname, 'node_modules/react-routing/src'),
          path.resolve(__dirname, 'src'),
        ],
        query: {
          // https://github.com/babel/babel-loader#options
          cacheDirectory: DEBUG,

          // https://babeljs.io/docs/usage/options/
          babelrc: false,
          presets: [
            'react',
            'es2015',
            'stage-0',
          ],
          plugins: ['transform-runtime'].concat(DEBUG ? [] : [
            'transform-react-remove-prop-types',
            'transform-react-constant-elements',
            'transform-react-inline-elements'
          ]),
        },
      },
      {
        test: /\.css$/,
        exclude: path.resolve(__dirname, 'src/index.css'),
        loaders: [
          //'isomorphic-style-loader',
          'css-loader?' + JSON.stringify({
            sourceMap: DEBUG,
            // CSS Modules https://github.com/css-modules/css-modules
            modules: true,
            localIdentName: DEBUG ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]',
            // CSS Nano http://cssnano.co/options/
            minimize: !DEBUG,
          }),
          'postcss-loader?pack=default',
        ],
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src/index.css'),
        loaders: [
          //'isomorphic-style-loader',
          'css-loader?' + JSON.stringify({
            sourceMap: DEBUG,
            localIdentName: DEBUG ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]',
            // CSS Nano http://cssnano.co/options/
            minimize: !DEBUG,
          }),
          'postcss-loader?pack=default',
        ],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.txt$/,
        loader: 'raw-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader',
        query: {
          name: DEBUG ? '[name].[ext]?[hash]' : '[hash].[ext]',
          limit: 10000,
        },
      },
      {
        test: /\.(eot|ttf|wav|mp3)$/,
        loader: 'file-loader',
        query: {
          name: DEBUG ? '[name].[ext]?[hash]' : '[hash].[ext]',
        },
      },
      {
        test: /\.jade$/,
        loader: 'jade-loader',
      },
    ],
  },

  resolve: {
    root: path.resolve(__dirname, 'src'),
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx', '.json'],
  },

  cache: DEBUG,
  debug: DEBUG,

  stats: {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE,
  },

  postcss(bundler) {
    return {
      default: [
        // Transfer @import rule by inlining content, e.g. @import 'normalize.css'
        // https://github.com/postcss/postcss-import
        require('postcss-import')({ addDependencyTo: bundler }),
        // Simple template to prevent repeating code, e.g. @define-mixin headline $size { font-size: $size; } span { @mixin headline 32px; }
        // https://github.com/postcss/postcss-mixins
        require('postcss-mixins')(),
        // Sass like variables, e.g. $red: #f00 div { background: $red; }
        // https://github.com/postcss/postcss-simple-vars
        require('postcss-simple-vars')(),
        // Custom vr unit to help maintain a vertical rhythm, e.g. body { font: 16px / 1.5 sans-serif; } p { margin-bottom: 2vr; }
        // https://github.com/jameskolce/postcss-lh
        require('postcss-lh')({ rootSelector: 'body', rhythmUnit: 'vr' }),
        // W3C CSS Custom Media Queries, e.g. @custom-media --small-viewport (max-width: 30em);
        // https://github.com/postcss/postcss-custom-media
        require('postcss-custom-media')(),
        // CSS4 Media Queries, e.g. @media screen and (width >= 500px) and (width <= 1200px) { }
        // https://github.com/postcss/postcss-media-minmax
        require('postcss-media-minmax')(),
        // W3C CSS Custom Selectors, e.g. @custom-selector :--heading h1, h2, h3, h4, h5, h6;
        // https://github.com/postcss/postcss-custom-selectors
        require('postcss-custom-selectors')(),
        // Allows you to nest one style rule inside another
        // https://github.com/jonathantneal/postcss-nesting
        require('postcss-nesting')(),
        // Enables @for loop syntax, e.g. @for @i from $from to $to { .a-@i { width: calc(100% / $to * @i) } }
        // https://github.com/xori/postcss-for
        require('postcss-for-var')(),
        // W3C calc() function, e.g. div { height: calc(100px - 2em); }
        // https://github.com/postcss/postcss-calc
        require('postcss-calc')(),
        // W3C color() function, e.g. div { background: color(red alpha(90%)); }
        // https://github.com/postcss/postcss-color-function
        require('postcss-color-function')(),
        // Convert CSS shorthand filters to SVG equivalent, e.g. .blur { filter: blur(4px); }
        // https://github.com/iamvdo/pleeease-filters
        require('pleeease-filters')(),
        // Generate pixel fallback for "rem" units, e.g. div { margin: 2.5rem 2px 3em 100%; }
        // https://github.com/robwierzbowski/node-pixrem
        require('pixrem')(),
        // W3C CSS Level4 :matches() pseudo class, e.g. p:matches(:first-child, .special) { }
        // https://github.com/postcss/postcss-selector-matches
        require('postcss-selector-matches')(),
        // Transforms :not() W3C CSS Level 4 pseudo class to :not() CSS Level 3 selectors
        // https://github.com/postcss/postcss-selector-not
        require('postcss-selector-not')(),
        // Add vendor prefixes to CSS rules using values = require(caniuse.com
        // https://github.com/postcss/autoprefixer
        require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS }),
      ]
    };
  },
};

//
// Configuration for the client-side bundle (client.js)
// -----------------------------------------------------------------------------
var clientConfig = extend(true, {}, config, {
  entry: './client.jsx',

  output: {
    filename: DEBUG ? '../[name].js?[chunkhash]' : '../[name].[chunkhash].js',
    chunkFilename: DEBUG ? '../[name].[id].js?[chunkhash]' : '../[name].[id].[chunkhash].js',
  },

  target: 'web',

  plugins: [

    // Define free variables
    // https://webpack.github.io/docs/list-of-plugins.html#defineplugin
    new webpack.DefinePlugin(extend({}, GLOBALS, {'process.env.BROWSER': true})),

    // Emit a file with assets paths
    // https://github.com/sporto/assets-webpack-plugin#options
    new AssetsPlugin({
      path: path.resolve(__dirname, 'build'),
      filename: 'assets.js',
      processOutput: function (x) { return 'module.exports = ' + JSON.stringify(x) },
    }),

    // Assign the module and chunk ids by occurrence count
    // Consistent ordering of modules required if using any hashing ([hash] or [chunkhash])
    // https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
    new webpack.optimize.OccurrenceOrderPlugin(true)

  ].concat(DEBUG ? [] : [

    // Search for equal or similar files and deduplicate them in the output
    // https://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
    new webpack.optimize.DedupePlugin(),

    // Minimize all JavaScript output of chunks
    // https://github.com/mishoo/UglifyJS2#compressor-options
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true, // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
        warnings: VERBOSE,
      },
    }),

    // A plugin for a more aggressive chunk merging strategy
    // https://webpack.github.io/docs/list-of-plugins.html#aggressivemergingplugin
    new webpack.optimize.AggressiveMergingPlugin(),
  ]),

  // Choose a developer tool to enhance debugging
  // http://webpack.github.io/docs/configuration.html#devtool
  devtool: DEBUG ? 'cheap-module-eval-source-map' : false,
});

//
// Configuration for the server-side bundle (server.js)
// -----------------------------------------------------------------------------

var serverConfig = extend(true, {}, config, {
  entry: './server.jsx',

  output: {
    filename: '../../server.js',
    libraryTarget: 'commonjs2',
  },

  target: 'node',

  externals: [
    /^\.\/assets$/,
    function filter(context, request, cb) {
      var isExternal =
        request.match(/^[@a-z][a-z\/\.\-0-9]*$/i) &&
        !request.match(/^react-routing/) &&
        !context.match(/[\\/]react-routing/);
      cb(null, Boolean(isExternal));
    },
  ],

  plugins: [

    // Define free variables
    // https://webpack.github.io/docs/list-of-plugins.html#defineplugin
    new webpack.DefinePlugin(extend({}, GLOBALS, {'process.env.BROWSER': false})),

    // Adds a banner to the top of each generated chunk
    // https://webpack.github.io/docs/list-of-plugins.html#bannerplugin
    new webpack.BannerPlugin('require("source-map-support").install();',
      { raw: true, entryOnly: false }),
  ],

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },

  devtool: 'source-map',
});

module.exports = [clientConfig, serverConfig];