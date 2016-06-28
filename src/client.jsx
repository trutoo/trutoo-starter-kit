/* React */
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistroy} from 'react-router';

/* Routes */
import Routes from 'endpoint/Routes.jsx';

ReactDOM.render(<Router history={browserHistroy} routes={Routes} />, document.getElementById('root'));