/* Endpoint Controllers */
import ExampleEndpoint from './ExampleEndpoint/ExampleEndpoint.js';

const Endpoints = (app) => {
	/* Email endpoint */
	app.post('/example', (req, res) => {
		ExampleEndpoint.send(req.body, (response) => {
			res.json(response);
		});
	});
};

export default Endpoints;
