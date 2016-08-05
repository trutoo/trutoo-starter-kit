var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var extend = require('extend');
var AssetsPlugin = require('assets-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var NodeExternals = require('webpack-node-externals');

var DEBUG = process.argv.indexOf('--production') == -1;
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

//------------------------------------------------------------------------------------
// BASE CONFIGURATION
//------------------------------------------------------------------------------------

var config = {
	context: path.resolve(process.cwd(), 'src'),

	output: {
		path: path.resolve(process.cwd(), 'build/public/assets'),
		publicPath: DEBUG ? 'http://localhost:9200/assets/' : '/assets/',
		hotUpdateChunkFilename: 'debug/[id].[hash].hot-update.js',
		hotUpdateMainFilename: 'debug/[hash].hot-update.json',
	},

	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				include: [
					path.resolve(process.cwd(), 'src'),
				],
				loader: [
					'babel-loader?' + JSON.stringify({
						// https://github.com/babel/babel-loader#options
						cacheDirectory: DEBUG,

						// https://babeljs.io/docs/usage/options/
						babelrc: false,
						presets: [
							'es2015',
							'react',
						],
						plugins: ['react-hot-loader/babel', 'transform-runtime'].concat(DEBUG ? [] : [
							'transform-react-remove-prop-types',
							'transform-react-constant-elements',
							'transform-react-inline-elements'
						]),
					})
				].concat(DEBUG ? [] : [
					'eslint-loader?' + JSON.stringify({
						configFile: '.eslintrc'
					})
				]).join('!')
			},
			{
				test: /\.jade$/,
				loader: 'jade-loader',
			},
			{
				test: /\.json$/,
				exclude: [
					path.resolve(process.cwd(), 'src/public/favicons/manifest.json'),
				],
				loader: 'json-loader',
			},
			{
				test: /\.txt$/,
				loader: 'raw-loader',
			},
			{
				test: /\.(png|jpe?g|gif|ico|svg|woff2?)$/,
				loader: 'url-loader',
				query: {
					name: DEBUG ? '[name].[ext]?[hash]' : '[hash].[ext]',
					limit: 10000,
				},
			},
			{
				test: /manifest\.json|\.(xml|eot|ttf|wav|mp3)$/,
				loader: 'file-loader',
				query: {
					name: DEBUG ? '[name].[ext]?[hash]' : '[hash].[ext]',
				},
			},
			{
				test: /\.(xml|json|txt)$/,
				loader: 'nested-require-loader',
			},
		],
	},

	plugins: [
		function() {
			this.plugin('done', function(stats) {
				if (stats.compilation.errors && stats.compilation.errors.length) {
					process.on('beforeExit', function() {
						process.exit(1);
					});
				}
			});
		}
	],

	resolve: {
		root: path.resolve(process.cwd(), 'src'),
		modulesDirectories: ['node_modules'],
		extensions: ['', '.js', '.jsx'],
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
};

//------------------------------------------------------------------------------------
// CLIENT SPECIFIC CONFIGURATION
//------------------------------------------------------------------------------------

var clientConfig = extend(true, {}, config, {
	entry: [
		'react-hot-loader/patch',
		'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&noInfo=true',
		'./client.jsx'
	],

	output: {
		filename: DEBUG ? '../[name].js?[hash]' : '../[name].[hash].js',
		chunkFilename: DEBUG ? '../[name].[id].js?[hash]' : '../[name].[id].[hash].js',
	},

	target: 'web',

	module: {
		loaders: config.module.loaders.concat([
			{
				test: /\.css$/,
				exclude: path.resolve(process.cwd(), 'src/styles/index.css'),
				loader: ExtractTextPlugin.extract(
					'style-loader',
					['css-loader?' + JSON.stringify({
						sourceMap: DEBUG,
						// CSS Modules https://github.com/css-modules/css-modules
						modules: true,
						localIdentName: DEBUG ? '[local]_[hash:base64:4]' : '[hash:base64:4]',
						// CSS Nano http://cssnano.co/options/
						minimize: !DEBUG,
					}),
					'postcss-loader?pack=default'].join('!')
				),
			},
			{
				test: /\.css$/,
				include: path.resolve(process.cwd(), 'src/styles/index.css'),
				loader: ExtractTextPlugin.extract(
					'style-loader',
					['css-loader?' + JSON.stringify({
						sourceMap: DEBUG,
						// CSS Nano http://cssnano.co/options/
						minimize: !DEBUG,
					}),
					'postcss-loader?pack=default'].join('!')
				),
			}
		])
	},

	postcss(bundler) {
		return {
			default: [
				// Transfer @import rule by inlining content, e.g. @import 'normalize.css'
				// https://github.com/postcss/postcss-import
				require('postcss-import')({ path: 'src/', addDependencyTo: bundler }),
				// Simple template to prevent repeating code, e.g. @define-mixin headline $size { font-size: $size; } span { @mixin headline 32px; }
				// https://github.com/postcss/postcss-mixins
				require('postcss-mixins')(),
				// Sass like variables, e.g. $red: #f00 div { background: $red; }
				// https://github.com/postcss/postcss-simple-vars
				require('postcss-simple-vars')(),
				// Allows resolving for assets regardless of import location div { background: resolve('img.jpg'); }
				// https://github.com/assetsjs/postcss-assets
				require('postcss-assets')({ basePath: 'src/', loadPaths: ['**'], relative: true }),
				// Custom vr unit to help maintain a vertical rhythm, e.g. p { margin-bottom: 2vr; }
				// https://github.com/jameskolce/postcss-lh
				require('postcss-lh')({ lineHeight: 2.8, rhythmUnit: 'vr' }),
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
				// https://github.com/postcss/postcss-nested
				require('postcss-nested')(),
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
				// Generate pixel fallback for 'rem' units, e.g. div { margin: 2.5rem 2px 3em 100%; }
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

	plugins: config.plugins.concat([

		// Define free variables
		// https://webpack.github.io/docs/list-of-plugins.html#defineplugin
		new webpack.DefinePlugin(extend({}, GLOBALS, {'process.env.BROWSER': true})),

		// Emit a file with assets paths
		// https://github.com/sporto/assets-webpack-plugin#options
		new AssetsPlugin({
			path: path.resolve(process.cwd(), 'build'),
			filename: 'assets.json',
		}),

		// Move every require('style.css') in entry chunks into a separate css output file.
		// https://github.com/webpack/extract-text-webpack-plugin
		new ExtractTextPlugin(DEBUG ? '../[name].css?[hash]' : '../[name].[hash].css', {
			disable: DEBUG,
			allChunks: true,
		}),
		// Assign the module and chunk ids by occurrence count
		// Consistent ordering of modules required if using any hashing ([hash] or [chunkhash])
		// https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
		new webpack.optimize.OccurrenceOrderPlugin(true),

		/* Hot Reload */
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),

	]).concat(DEBUG ? [] : [

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

//------------------------------------------------------------------------------------
// SERVER SPECIFIC CONFIGURATION
//------------------------------------------------------------------------------------

var serverConfig = extend(true, {}, config, {
	entry: [
		'./server.jsx'
	],

	output: {
		filename: '../../server.js',
		libraryTarget: 'commonjs2',
	},

	target: 'node',

	module: {
		loaders: config.module.loaders.concat([
			{
				test: /\.css$/,
				exclude: path.resolve(process.cwd(), 'src/styles/index.css'),
				loader:
					'css-loader/locals?' + JSON.stringify({
						// CSS Modules https://github.com/css-modules/css-modules
						modules: true,
						localIdentName: DEBUG ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]',
					})
			}
		])
	},

	plugins: config.plugins.concat([

		// Define free variables
		// https://webpack.github.io/docs/list-of-plugins.html#defineplugin
		new webpack.DefinePlugin(extend({}, GLOBALS, {'process.env.BROWSER': false})),

		// Adds a banner to the top of each generated chunk
		// https://webpack.github.io/docs/list-of-plugins.html#bannerplugin
		new webpack.BannerPlugin("require('source-map-support').install();",
			{ raw: true, entryOnly: false }
		),
	]),

	externals: [
		/^\.\/assets$/,
		NodeExternals({ modulesFromFile: true }),
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