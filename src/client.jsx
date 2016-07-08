/* React */
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';

/* Global Styles */
import './styles/index.css';

/* Routes */
import Routes from './endpoints/Routes.jsx';

/* Hot Reload */
if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(<Router history={browserHistory} routes={Routes} />, document.getElementById('root'));