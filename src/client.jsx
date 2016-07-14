/* React */
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer as HotLoaderAppContainer } from 'react-hot-loader';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

/* Global Styles */
import './styles/index.css';

/* Routes */
import Routes from './endpoints/Routes.jsx';

/* Store */
const store = createStore(
  combineReducers({
    routing: routerReducer
  })
)

/* Enhanced History */
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <HotLoaderAppContainer>
  	<Provider store={store}>
    	<Router history={history} routes={Routes} />
    </Provider>
  </HotLoaderAppContainer>,
  document.getElementById('root')
);

/* Hot Reload */
if (module.hot) {
  module.hot.accept();
}