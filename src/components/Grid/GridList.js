import React, { Component, PropTypes } from 'react';

import { GUTTER } from '../../styles/constants';

import Is from '../../utils/Is';

require('../../csses/clearfix.css');

function getStyles(props) {
	return {
		root: {
			marginLeft: -props.gutter / 2,
			marginRight: -props.gutter / 2
		},

		item: {
			float: 'left',
			boxSizing: 'border-box',
			paddingLeft: props.gutter / 2,
			paddingRight: props.gutter / 2,
		},
	};
}

export default class GridList extends Component {
	static propTypes = {
		children: PropTypes.node,
		center: PropTypes.bool,
		cols: PropTypes.number,
		gutter: PropTypes.number,
		style: PropTypes.object,
	};

	static defaultProps = {
		cols: 2,
		center: false,
		gutter: GUTTER
	};

	render() {

		const styles = getStyles(this.props);

		let { children, cols, center } = this.props;

		if(!Is(children, 'Array')) {
			children = [children];
		}

		const wrappedChildren = children.map((child, index) => {
			const itemStyle = Object.assign({}, styles.item, {
				width: `${(100 / cols)}%`,
				textAlign: center ? 'center' : 'left'
			});
			return (
				<div key={'grid_' + index} style={Object.assign({}, itemStyle)}>{child}</div>
			);
		});

		return (
			<div style={{overflow: 'hidden'}}><div style={Object.assign({}, styles.root, this.props.style)} className='clearfix'>
				{wrappedChildren}
			</div></div>
		);
	}
}