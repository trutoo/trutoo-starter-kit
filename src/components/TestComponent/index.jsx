import React from 'react';

/* Styles */
import style from './style.css';

/* Utilities */

/* Components */

/* Assets */
import image from '../../public/img/tiger.svg';
import image2 from '../../public/img/test2.jpg';

export default class TestComponent extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div><img src={image2} /></div>
		);
	}
}
