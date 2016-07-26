/* React */
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer as HotReloadAppContainer } from 'react-hot-loader';
import { createStore, combineReducers } from 'redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

/* Global Styles */
import './styles/index.css';

/* Redux Store */
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
	<HotReloadAppContainer>
		<Root store={store} history={history} />
	</HotReloadAppContainer>,
	$root
);

/* Hot Reload */
if (module.hot) {
	module.hot.accept();
	module.hot.accept('./components/Root.jsx', () => {

		/* [HACKY] Running require tiggers hot reload */
		require('./components/Root.jsx').default; // eslint-disable-line no-unused-expressions

		ReactDOM.render(
			<HotReloadAppContainer>
				<Root store={store} history={history} />
			</HotReloadAppContainer>,
			$root
		);
	});
}
