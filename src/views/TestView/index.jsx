import React from 'react';

/* Assets */

/* Styles */
import style from './style.css'

/* Utilities */

/* Components */

export class TestView extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div></div>
		);
	}
}
