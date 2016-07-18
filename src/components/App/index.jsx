/* React */
import React from 'react';
import Helmet from "react-helmet";

/* Assets */

/* Styles */
import s from './style.css';

/* Utilities */

/* Components */

export default class App extends React.Component {

	static propTypes = {
		name: React.PropTypes.string,
		children: React.PropTypes.element,
	};

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className={s.App}>
				<Helmet titleTemplate="%s | Trutoo Starter Kit" />

				{this.props.children}
			</div>
		);
	}
}
