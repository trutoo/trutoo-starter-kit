/* React */
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer as HotLoaderAppContainer } from 'react-hot-loader';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

/* Global Styles */
import './styles/index.css';

/* Store */
const store = createStore(
	combineReducers({
		routing: routerReducer,
	})
);

/* Enhanced History */
const history = syncHistoryWithStore(browserHistory, store);

/* Render */
const Root = require('./components/Root.jsx').default;
const $root = document.getElementById('root');
ReactDOM.render(
	<HotLoaderAppContainer>
		<Root store={store} history={history} />
	</HotLoaderAppContainer>,
	$root
);

/* Hot Reload */
if (module.hot) {
	module.hot.accept('./components/Root.jsx', () => {

		/* [HACK!] Running require tiggers hot reload, however using "dummy" instead of "Root" causes router warnings */
		const dummy = require('./components/Root.jsx').default;

		ReactDOM.render(
			<HotLoaderAppContainer>
				<Root store={store} history={history} />
			</HotLoaderAppContainer>,
			$root
		);
	});
}
