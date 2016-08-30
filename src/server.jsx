/* React */
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import Helmet from 'react-helmet';
import { match, RouterContext } from 'react-router';

/* Config */
import { port } from './config.js';

/* Express */
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* Static Assets */
import fs from 'fs';
let assets;
fs.readFile(`${__dirname}/assets.json`, (err, data) => {
	if (err) {
		throw err;
	}
	assets = JSON.parse(data);
});

app.use(express.static('build/public'));

//------------------------------------------------------------------------------------
// HOT RELOAD FOR DEVELOPMENT
//------------------------------------------------------------------------------------
if (process.env.NODE_ENV === 'development') {

	/* Load Config and Setup Compilers */
	const webpack = require('webpack');
	const webpackConfig = require('../tools/build.config');
	const webCompiler = webpack(webpackConfig[0]);
	const nodeCompiler = webpack(webpackConfig[1]);

	/* Joint compiler settings */
	nodeCompiler.inputFileSystem = webCompiler.inputFileSystem;
	const watchOptions = {
		aggregateTimeout: 300,
		poll: true,
	};

	/* Watch for server changes */
	nodeCompiler.watch(watchOptions, (err, stats) => {
		if (err) {
			throw err;
		}
		const statsJSON = stats.toJson();
		console.log(`Server bundle built ${statsJSON.hash} in ${statsJSON.time} ms`);
	});

	/* Watch for client changes */
	webCompiler.watch(watchOptions, (err, stats) => {
		if (err) {
			throw err;
		}
		const statsJSON = stats.toJson();
		console.log(`Client bundle built ${statsJSON.hash} in ${statsJSON.time} ms`);
	});

	/* Attach hot reload to client compiler */
	app.use(require('webpack-hot-middleware')(webCompiler, {
		log: false,
		path: '/__webpack_hmr',
		heartbeat: 10 * 1000,
	}));
}

/* Static Markup Render to avoid checksum missmatch when hot reloading */
const render = (process.env.NODE_ENV === 'development' ? renderToStaticMarkup : renderToString);

//------------------------------------------------------------------------------------
// SERVER
//------------------------------------------------------------------------------------

/* Routes */
import index from './index.pug';
import Routes from './endpoints/Routes.jsx';
app.get('*', (req, res) => {
	match({ routes: Routes, location: req.url }, (error, redirectLocation, renderProps) => {
		if (error) {
			res.status(500).send(error.message);

		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search);

		} else if (renderProps) {
			const data = { title: '', body: '', css: assets.main.css, javascript: assets.main.js };
			data.body = render(<RouterContext {...renderProps} />);
			data.title = Helmet.rewind().title.toString();
			res.status(200).send(index(data));

		} else {
			res.status(404).send('Not found');
		}
	});
});

/* Enpoints */
import Endpoints from './endpoints/Endpoints.js';
Endpoints(app);

/* Init Server */
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
