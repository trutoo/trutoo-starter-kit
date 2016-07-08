/* Endpoint Controllers */
import ExampleEndpoint from './ExampleEndpoint';

const Endpoints = function(app) {

	/* Email endpoint */
	app.post('/email', function(req, res) {
		ExampleEndpoint.send(req.body, function(response) {
			res.json(response);
		})
	});
}

export default Endpoints;