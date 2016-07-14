import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

/* Assets */
import content from './content.jade';

/* Styles */
import s from './style.css'

/* Utilities */

/* Components */

export default class HomeView extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<section className={s.HomeView + ' container narrow card'} >
				<article dangerouslySetInnerHTML={{__html: content()}} />
			</section>
		);
	}
}