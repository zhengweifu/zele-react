import React, { Component, PropTypes } from 'react';

import { GUTTER } from '../styles/constants';

import Is from '../utils/Is';

require('../csses/clearfix.css');

function getStyles(props) {
	return {
		root: {
			marginLeft: -props.gutter / 2,
			marginRight: -props.gutter / 2,
		},

		item: {
			float: 'left',
			boxSizing: 'border-box',
			paddingLeft: props.gutter / 2,
			paddingRight: props.gutter / 2,
		},
	};
}

class SpecialGridList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeId: props.activeId
		};
	}

	static propTypes = {
		children: PropTypes.node,
		center: PropTypes.bool,
		cols: PropTypes.number,
		specialRatio: PropTypes.number,
		activeId: PropTypes.number,
		gutter: PropTypes.number,
		style: PropTypes.object,
	};

	static defaultProps = {
		cols: 2,
		specialRatio: 0.5,
		activeId: 0,
		center: false,
		gutter: GUTTER
	};

	render() {

		const styles = getStyles(this.props);

		let { children, cols, specialRatio, center } = this.props;

		if(!Is(children, 'Array')) {
			children = [children];
		}

		const eachWidth = 100 / (cols + specialRatio);

		const wrappedChildren = children.map((child, index) => {
			const itemStyle = Object.assign({}, styles.item, {
				width: index === this.state.activeId ? `${eachWidth * ( 1 + specialRatio)}%` : `${eachWidth}%`,
				// transition: 'width 0.2s',
				textAlign: center ? 'center' : 'left'
			});
			return (
				<div key={'grid_' + index} style={Object.assign({}, itemStyle)} onClick = {e => {
					if(this.state.activeId !== index) {
						this.setState({activeId: index});
					}
				}}>{child}</div>
			);
		});

		return (
			<div style={Object.assign({}, styles.root, this.props.style)} className='clearfix'>{wrappedChildren}</div>
		);
	}
}

export default SpecialGridList;