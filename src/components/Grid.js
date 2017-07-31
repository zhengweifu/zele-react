import React, { Component, PropTypes } from 'react';

import { GUTTER } from '../styles/constants';

require('../csses/clearfix.css');

function getStyles(props) {
	return {
		root: {
			marginLeft: -props.gutter / 2,
			marginRight: -props.gutter / 2,
		}
	};
}

export default class Grid extends Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		gutter: PropTypes.number,
		style: PropTypes.object
	};

	static defaultProps = {
		gutter: GUTTER
	};

	render() {
		const { children, style } = this.props;
		const styles = getStyles(this.props);
		return (
			<div className='clearfix' style={Object.assign({}, styles.root, style)}>
				{children}
				<div style={{clear: 'both'}}></div>
			</div>
		);
	}
}