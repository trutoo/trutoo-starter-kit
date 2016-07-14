/* React */
import React from 'react';
import {renderToString, renderToStaticMarkup} from 'react-dom/server'
import Helmet from 'react-helmet';
import {match, RouterContext} from 'react-router';

/* Config */
import {port, auth} from './config.jsx';

/* Express */
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/* Static Assets */
import fs from 'fs';
var assets;
fs.readFile(__dirname + '/assets.json', function (err, data) {
  if (err)
    throw err;
  assets = JSON.parse(data);
});

app.use(express.static('build/public'));

//------------------------------------------------------------------------------------
// HOT RELOAD FOR DEVELOPMENT
//------------------------------------------------------------------------------------

process.env.NODE_ENV == 'development' && (function() {

  // Step 1: Create & configure a webpack compiler
  var webpack = require('webpack');
  var webpackConfig = require('../tools/build.config');
  var webCompiler = webpack(webpackConfig[0]);
  var nodeCompiler = webpack(webpackConfig[1]);

  nodeCompiler.inputFileSystem = webCompiler.inputFileSystem;
  var watchOptions = {
    aggregateTimeout: 300,
    poll: true
  }

  nodeCompiler.watch(watchOptions, function(err, stats) {
		if (err)
			throw(err);
		stats = stats.toJson();
		console.log('Server bundle built ' + stats.hash + ' in ' + stats.time + 'ms');
	});

	webCompiler.watch(watchOptions, function(err, stats) {
		if (err)
			throw(err);
		stats = stats.toJson();
		console.log('Client bundle built ' + stats.hash + ' in ' + stats.time + 'ms');
	});

  // Step 3: Attach the hot middleware to the compiler & the server
  app.use(require("webpack-hot-middleware")(webCompiler, {
    log: false,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  }));
})();

/* Static Markup Render to avoid checksum missmatch when hot reloading */
const render = (process.env.NODE_ENV == 'development' ? renderToStaticMarkup : renderToString);

//------------------------------------------------------------------------------------
// SERVER
//------------------------------------------------------------------------------------

/* Routes */
import index from './index.jade';
import Routes from './endpoints/Routes.jsx';
app.get('*', function (req, res) {

	match({routes: Routes, location: req.url}, (error, redirectLocation, renderProps) => {

		if (error) {
			res.status(500).send(error.message);

		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search);

		} else if (renderProps) {
			var data = {title: '', body: '', css: assets.main.css, javascript: assets.main.js};
			data.body = render(<RouterContext {...renderProps} />);
			data.title = Helmet.rewind().title.toString();
			res.status(200).send(index(data));

		} else {
			res.status(404).send('Not found');
		}
	})
})

/* Enpoints */
import Endpoints from './endpoints/Endpoints.jsx'
Endpoints(app);

/* Init Server */
app.listen(port, function() {
	console.log('Server started on port ' + port);
});