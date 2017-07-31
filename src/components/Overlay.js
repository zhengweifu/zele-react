import React, { Component, PropTypes } from 'react';

function getStyles(props) {
	return {
		root: {
			position: 'fixed',
			top: 0,
			left: props.show ? 0 : '-100%',
			width: '100%',
			height: '100%',
			opcity: 0,
			backgroundColor: 'rgba(0, 0, 0, 0.5)'
		}
	};
}

export default class Overlay extends Component {
	static propTypes = {
		show: PropTypes.bool,
		style: PropTypes.object
	};

	static defaultProps = {
		show: false,
		style: {}
	};

	render() {
		let styles = getStyles(this.props);

		return (
			<div style={Object.assign(styles.root, this.props.style)}></div>
		);
	}
}