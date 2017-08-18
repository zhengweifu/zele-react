import React, { Component, PropTypes } from 'react';

import Is from '../utils/Is';

require('../csses/clearfix.css');

function getStyles(props) {
	return {
		root: {
			// overflow: 'hidden',
			whiteSpace: 'nowrap'
		},

		item: {
			// float: 'left',
			display: 'inline-block',
			boxSizing: 'border-box',
			whiteSpace: 'normal'
		},
	};
}

class Left extends Component {
	static propTypes = {
		children: PropTypes.node,
		style: PropTypes.object
	};

	static defaultProps = {
		style: {}
	};

	render() {

		const styles = getStyles(this.props);

		let { children } = this.props;

		if(!Is(children, 'Array')) {
			children = [children];
		}

		const wrappedChildren = children.map((child, index) => {
			const itemStyle = Object.assign({}, styles.item);
			return (
				<div key={'grid_' + index} style={Object.assign({}, itemStyle)}>{child}</div>
			);
		});

		return (
			<div style={Object.assign({}, styles.root, this.props.style)}>{wrappedChildren}</div>
		);
	}
}

export default Left;