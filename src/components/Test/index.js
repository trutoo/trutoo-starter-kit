import React from 'react';

/* Styles */
import style from './style.css';

/* Utilities */

/* Components */

/* Assets */
import image from 'img/test.png';

export default class Test extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div><img src={image} /></div>
		);
	}
}
