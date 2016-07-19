/* React */
import React from 'react';
import Helmet from 'react-helmet';

/* Assets */

/* Styles */
import s from './style.css';

/* Utilities */

/* View */

export default class NAME extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className={s.NAME}>
				<Helmet title="NAME" />
			</div>
		);
	}
}

NAME.propTypes = {
	name: React.PropTypes.string,
};
