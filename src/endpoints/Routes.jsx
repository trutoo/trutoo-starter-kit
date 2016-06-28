/* React */
import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';

/* App */
import App from 'component/App.jsx';

/* Views */
import TestView from 'view/TestView';

export default const Routes = (
	<Route path="/" component={App}>
		<IndexRoute component={TestView} />
		<Redirect from="home" to="/" component={TestView} />
	</Route>
);