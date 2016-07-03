/* React */
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';

/* Routes */
import Routes from './endpoints/Routes.jsx';

ReactDOM.render(<Router history={browserHistory} routes={Routes} />, document.getElementById('root'));