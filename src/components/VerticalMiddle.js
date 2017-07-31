import React, { Component, PropTypes } from 'react';

export default class VerticalMiddle extends Component {
	static propTypes = {
		children: PropTypes.node,
		height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		style: PropTypes.object
	};

	static defaultProps = {
		width: '100%',
		height: 30,
		style: {}
	};
	render() {
		const { children, height, width, style } = this.props;

		return (
			<div style={Object.assign({}, style, {display: 'table', height: height, width: width})}>
				<div style={{display: 'table-cell', verticalAlign: 'middle'}}>
					{children}
				</div>
			</div>
		);
	}
}