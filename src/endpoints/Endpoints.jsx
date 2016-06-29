/* Endpoint Controllers */
import EmailEndpoint from './EmailEndpoint';

const Endpoints = function(app) {

	/* Email endpoint */
	app.post('/email', function(req, res) {
		EmailEndpoint.send(req.body, function(response) {
			res.json(response);
		})
	});
}

export default Endpoints;