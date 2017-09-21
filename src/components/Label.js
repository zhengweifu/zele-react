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
			height: height,
			overflow: 'hidden', 
			textOverflow: 'ellipsis', 
			whiteSpace: 'nowrap'
		};

		const defaultStyle = {
			// display: 'table-cell',
			verticalAlign: 'middle',
			lineHeight: `${height}px`,
			color: color,
			fontSize: fontSize,
			fontFamily: fontFamily,
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap' // 强制不换行
		};

		return (
			//<div style={{display: 'inline-block', height: height, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}><div style={parentStyle}>
			//	<span style={Object.assign({}, defaultStyle, style)}>{content}</span>
			//</div></div>
			<span style={Object.assign({}, defaultStyle, style)}>{content}</span>
		);

	}

}

export default Label;