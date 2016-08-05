/* React */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* Assets */

/* Utilities */

/* Component */
import NAME from './NAME.jsx';

/* Container */

function mapStateToProps(state) {
	return {
		
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({

	}, dispatch);
}

export default connect (
	mapStateToProps,
	mapDispatchToProps
)(NAME);
