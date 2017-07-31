import React, { Component, PropTypes } from 'react';

import { FONT_SIZE_DEFAULT, FONT_FAMILY_DEFAULT } from '../styles/constants';

import { GREY500 } from '../styles/colors';

class Label extends Component {
	static propTypes = {
		content: PropTypes.string,
		fontSize: PropTypes.number,
		fontFamily: PropTypes.string,
		color: PropTypes.string,
		height: PropTypes.number,
		style: PropTypes.object
	};

	static defaultProps = {
		content: 'Label',
		fontSize: FONT_SIZE_DEFAULT,
		fontFamily: FONT_FAMILY_DEFAULT,
		color: GREY500,
		height: 20,
		style: {}
	};

	render() {
		const {
			content,
			fontSize,
			fontFamily,
			color,
			height,
			style
		} = this.props;

		const parentStyle = {
			display: 'table',
			height: height
		};

		const defaultStyle = {
			display: 'table-cell',
			verticalAlign: 'middle',
			color: color,
			fontSize: fontSize,
			fontFamily: fontFamily
		};

		return (
			<div style={{display: 'inline-block', height: height}}><div style={parentStyle}>
				<span style={Object.assign({}, defaultStyle, style)}>{content}</span>
			</div></div>
		);

	}

}

export default Label;