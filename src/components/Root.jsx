/* React */
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

/* Routes */
import Routes from '../endpoints/Routes.jsx';

export default function Root(props) {
	return (
		<Provider store={props.store}>
			<Router history={props.history} routes={Routes} />
		</Provider>
	);
}

Root.propTypes = {
	store: React.PropTypes.object
	history: React.PropTypes.object,
};
