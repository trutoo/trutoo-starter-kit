/* React */
import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';

/* App */
import App from '../components/App';

/* Views */
import HomeView from '../views/HomeView';

const Routes = (
	<Route path="/" component={App}>
		<IndexRoute component={HomeView} />
		<Redirect from="home" to="/" component={HomeView} />
	</Route>
);

export default Routes;