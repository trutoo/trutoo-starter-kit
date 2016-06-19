import React from 'react';

/* Styles */
import './Test.css'

/* Utilities */

/* Components */

export default class Test extends React.Component {
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
