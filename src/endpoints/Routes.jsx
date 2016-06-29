/* React */
import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';

/* App */
import App from '../components/App';

/* Views */
import TestView from '../views/TestView';

const Routes = (
	<Route path="/" component={App}>
		<IndexRoute component={TestView} />
		<Redirect from="home" to="/" component={TestView} />
	</Route>
);

export default Routes;