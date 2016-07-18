/* React */
import React from 'react';
import { connect } from 'react-redux';

/* Assets */

/* Styles */
import s from './style.css';

/* Utilities */

/* Components */

function mapStateToProps (state) {
	return {

	};
}

export class %NAME% extends React.Component {

	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className={s.%NAME%}>
			</div>
		);
	}
}

export default connect (
	mapStateToProps,
	// Implement map dispatch to props
)(%NAME%);
