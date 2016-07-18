import React from 'react';
import Helmet from "react-helmet";

/* Assets */
import content from './content.jade';

/* Styles */
import s from './style.css';

/* Utilities */

/* Components */

export default class HomeView extends React.Component {

	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<section className={`${s.HomeView} container narrow card`} >
				<Helmet title="HomeView" />

				<article dangerouslySetInnerHTML={{ __html: content() }} />
			</section>
		);
	}
}
