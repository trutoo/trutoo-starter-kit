/* React */
import React from 'react';
import {renderToString, renderToStaticMarkup} from 'react-dom/server'
import Helmet from 'react-helmet';
import {match, RouterContext} from 'react-router';

/* Config */
import {port, auth} from './config.js';

/* Express */
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/* Static Assets */
import assets from './assets.js'
app.use(express.static('build/public'));

/* Routes */
import Routes from 'endpoint/Routes.jsx';
app.get('*', function (req, res) {

	match({routes: Routes, location: req.url}, (error, redirectLocation, renderProps) => {

		if (error) {
			res.status(500).send(error.message);

		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search);

		} else if (renderProps) {
			const index = require('./index.pug');
			const data = {title: '', body: '', entry: assets.main.js};
			data.body = renderToString(<RouterContext {...renderProps} />);
			data.title = Helmet.rewind().title.toString();
			res.status(200).send(index(data));

		} else {
			res.status(404).send('Not found');
		}
	})
})

/* Enpoints */
import Endpoints from 'endpoint/Endpoints.js'
Endpoints(app);

/* Init Server */
app.listen(port, function() {
	console.log('Server started on port ' + port);
});