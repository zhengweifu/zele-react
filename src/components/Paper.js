import React, { Component, PropTypes } from 'react';

function getStyles(props) {
	return {
		root: {
			backgroundColor: props.bgColor,
			boxSizing: 'border-box',
			boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 3px',
			borderRadius: props.roundSize
		}
	};
}

export default class Paper extends Component {
	static propTypes = {
		children: PropTypes.node,
		bgColor: PropTypes.string,
		roundSize: PropTypes.number,
		style: PropTypes.object,
	};

	static defaultProps = {
		bgColor: '#fff',
		roundSize: 2
	};

	render() {
		const styles = getStyles(this.props);

		return (
			<div style={Object.assign({}, styles.root, this.props.style)}>
				{this.props.children}
			</div>
		);
	}
}