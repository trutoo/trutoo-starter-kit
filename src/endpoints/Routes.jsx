/* React */
import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

/* App */
import App from '../components/App/App.jsx';

/* Views */
import HomeView from '../views/HomeView/HomeView.jsx';

const Routes = (
	<Route path="/" component={App}>
		<IndexRoute component={HomeView} />
		<Redirect from="home" to="/" component={HomeView} />
	</Route>
);

export default Routes;
