import React from 'react';

/* Assets */

/* Styles */
import trutooStyle from '../../libs/trutoo-style-kit/main.css'
import style from './style.css'

/* Utilities */

/* Components */
import TestComponent from '../TestComponent'

export default class App extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<TestComponent />
				{this.props.children}
			</div>
		);
	}
}
