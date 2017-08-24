import React, { Component, PropTypes } from 'react';

import { GUTTER } from '../../styles/constants';

function getStyles(props, gutter) {
	return {
		root: {
			float: 'left',
			boxSizing: 'border-box',
			width: `${props.width * 100}%`,
			paddingLeft: gutter / 2,
			paddingRight: gutter / 2,
		}
	};
}

export default class Col extends Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		style: PropTypes.object,
		width: PropTypes.number
	};

	static defaultProps = {
		width: 0.5
	};

	static contextTypes = {
		component: PropTypes.any
	};

	render() {
		const { children, style } = this.props;
		const parent = this.context.component;
		const styles = getStyles(this.props, parent.props.gutter);
		return (
			<div style={Object.assign({}, styles.root, style)}>{children}</div>
		);
	}
}