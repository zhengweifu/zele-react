import React, { Component, PropTypes } from 'react';

function getStyles(props) {
	return {
		root: {
			position: 'absolute',
			left: props.left,
			top: props.top
		}
	};
}

class Ruler extends Component {
	static propTypes = {
		style: PropTypes.object,
		top: PropTypes.number,
		left: PropTypes.number,
		width: PropTypes.number,
		height: PropTypes.number,
	};

	static defaultProps = {
		style: {},
		top: 10,
		left: 10,
		width: 100.
		: 
	};

	render() {
		const { children, style } = this.props;
		const styles = getStyles(this.props);
		return (
			<div style={Object.assign({}, styles.root, style)}>{children}</div>
		);
	}
}

export default Ruler;