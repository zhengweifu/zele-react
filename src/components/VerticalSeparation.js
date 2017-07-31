import React, { Component, PropTypes } from 'react';

import { GUTTER } from '../styles/constants';

import Is from '../utils/Is';

function getStyles(props) {
	return {
		root: {
			marginBottom: -props.gutter
		},

		item: {
			paddingBottom: props.gutter
		},
	};
}

export default class VerticalSeparation extends Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		gutter: PropTypes.number
	};

	static defaultProps = {
		gutter: GUTTER
	};

	render() {
		let styles = getStyles(this.props);

		let { children } = this.props;

		if(!Is(children, 'Array')) {
			children = [children];
		}

		const wrappedChildren = children.map((child, index) => {
			return (
				<div key={'vs_' + index} style={styles.item}>{child}</div>
			);
		});
		return (
			<div style={styles.root}>
				{wrappedChildren}
			</div>
		);
	}
}