import React, { Component, PropTypes } from 'react';

import RaisedButton from './RaisedButton';

import { GREY400 } from '../styles/colors';

export default class FlatButton extends Component {
	static propTypes = {
		style: PropTypes.object,
		styleButton: PropTypes.object,
		bgColor: PropTypes.string,
		hoverColor: PropTypes.string,
		fullWidth: PropTypes.bool,
		label: PropTypes.string,
		labelColor: PropTypes.string,
		leftIcon: PropTypes.node,
		rightIcon: PropTypes.node,
		toggle: PropTypes.bool,
		toggled: PropTypes.bool,
		toggledColor: PropTypes.string,
		onMouseDown: PropTypes.func,
		onMouseUp: PropTypes.func,
		onMouseEnter: PropTypes.func,
		onMouseLeave: PropTypes.func,
		onTouchEnd: PropTypes.func,
		onTouchStart: PropTypes.func,
		onClick: PropTypes.func
	};

	static defaultProps = {
		style: {},
		styleButton: {},
		fullWidth: false,
		label: 'FlatButton',
		labelColor: GREY400,
		toggle: false,
		toggled: false
	};

	render() {
		const {
			style,
			styleButton,
			bgColor,
			fullWidth,
			label,
			labelColor,
			toggle,
			toggled,
			leftIcon,
			rightIcon,
			onMouseDown,
			onMouseUp,
			onMouseEnter,
			onMouseLeave,
			onTouchEnd,
			onTouchStart,
			onClick
		} = this.props;

		const rootStyle = {
			boxShadow: 'none',
			backgroundColor: 'transparent'
		};
		return (
			<RaisedButton style={Object.assign({}, rootStyle, style)}
				fullWidth={fullWidth}
				label={label}
				labelColor={labelColor}
				leftIcon={leftIcon}
				rightIcon={rightIcon}
				onMouseDown={onMouseDown}
				onMouseUp={onMouseUp}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				onTouchEnd={onTouchEnd}
				onTouchStart={onTouchStart}
				onClick={onClick}
			/>
		);
	}
}