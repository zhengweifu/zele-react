import React, { Component, PropTypes } from 'react';

import Is from '../utils/Is';

require('../csses/clearfix.css');

function getStyles(props) {
	return {
		root: {
		},

		item: {
			float: props.float,
			boxSizing: 'border-box',
		},
	};
}

class Float extends Component {
	static propTypes = {
		children: PropTypes.node,
		style: PropTypes.object,
		float: PropTypes.oneOf(['left', 'right']),
	};

	static defaultProps = {
		float: 'left',
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
			<div style={Object.assign({}, styles.root, this.props.style)} className='clearfix'>{wrappedChildren}</div>
		);
	}
}

export default Float;