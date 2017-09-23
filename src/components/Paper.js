import React, { Component, PropTypes } from 'react';

function getStyles(props) {
	return {
		root: {
			backgroundColor: props.bgColor,
			boxSizing: 'border-box',
			boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 3px',
			borderRadius: props.borderRadius
		}
	};
}

export default class Paper extends Component {
	static propTypes = {
		disable: PropTypes.bool,
		children: PropTypes.node,
		bgColor: PropTypes.string,
		borderRadius: PropTypes.number,
		style: PropTypes.object,
	};

	static defaultProps = {
		disable: false,
		bgColor: '#fff',
		borderRadius: 4
	};

	render() {
		const styles = getStyles(this.props);
		return (
			<div style={Object.assign({}, styles.root, this.props.style)} disabled>
				{this.props.children}
			</div>
		);
	}
}