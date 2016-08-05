/* React */
import React from 'react';

/* Assets */

/* Styles */
import s from './style.css';

/* Utilities */

/* Children */

/* Component */

export default class NAME extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className={s.NAME}></div>
		);
	}
}

NAME.propTypes = {
	name: React.PropTypes.string,
};
