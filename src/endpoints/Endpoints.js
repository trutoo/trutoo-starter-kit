/* Endpoint Controllers */
import ExampleEndpoint from './ExampleEndpoint';

const Endpoints = (app) => {
	/* Email endpoint */
	app.post('/email', (req, res) => {
		ExampleEndpoint.send(req.body, (response) => {
			res.json(response);
		});
	});
};

export default Endpoints;
