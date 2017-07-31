import React, { Component, PropTypes } from 'react';

import { GUTTER } from '../styles/constants';

function getStyles(props) {
	return {
		root: {
			float: 'left',
			boxSizing: 'border-box',
			width: `${props.width * 100}%`,
			paddingLeft: props.gutter / 2,
			paddingRight: props.gutter / 2,
		}
	};
}

export default class Col extends Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		gutter: PropTypes.number,
		style: PropTypes.object,
		width: PropTypes.number
	};

	static defaultProps = {
		gutter: GUTTER,
		width: 0.5
	};

	render() {
		const { children, style } = this.props;
		const styles = getStyles(this.props);
		return (
			<div style={Object.assign({}, styles.root, style)}>{children}</div>
		);
	}
}