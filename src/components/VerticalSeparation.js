import React, { Component, PropTypes } from 'react';

import { GUTTER } from '../styles/constants';

import Is from '../utils/Is';

function getStyles(props) {
	return {
		root: {
			// marginBottom: -props.gutter
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
			let itemStyle = {paddingBottom: this.props.gutter};
			if(index === children.length - 1) {
				console.log(index);
				itemStyle.paddingBottom = 0;
			}
			return (
				<div key={'vs_' + index} style={itemStyle}>{child}</div>
			);
		});
		return (
			<div style={styles.root}>
				{wrappedChildren}
			</div>
		);
	}
}