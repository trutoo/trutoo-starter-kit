/* React */
import React from 'react';

/* Assets */

/* Styles */
import s from './style.css';

/* Utilities */

/* Components */

export default class %NAME% extends React.Component {

	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className={s.%NAME%}></div>
		);
	}
}