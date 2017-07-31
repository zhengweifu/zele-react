import React, { Component, PropTypes } from 'react';

import InputNumberSlider from './InputNumberSlider'; 

import VerticalSeparation from './VerticalSeparation';

import SvgIcon from './SvgIcon';

import IconButton from './IconButton';

import SetToRange from '../utils/SetToRange';

import { CYAN500, GREY500 } from '../styles/colors';

import { FONT_SIZE_DEFAULT, FONT_FAMILY_DEFAULT } from '../styles/constants';

import { lock, lockOpen } from '../svgIcons/google/Action';

const lockColor = CYAN500;

const unLockColor = GREY500;

const lockIconPath = <path d={lock}/>;

const unLockIconPath = <path d={lockOpen}/>;

function getStyles(props, state) {
	const { 
		defaults, 
		cellHeight, 
		gutterY, 
		iconSize,
		title,
		titleWidth, 
		titleColor, 
		titleFontSize,
		titleFontFamily } = props;

	const count = defaults.length;
	const height = count * cellHeight + gutterY * (count - 1);
	const borderColor = state.lock ? lockColor : unLockColor;
	const gutter = 5;
	return {
		root: {
			position: 'relative',
			height: height
		},
		title: {
			position: 'absolute',
			left: 0,
			top: 0,
			bottom: 0,
			// backgroundColor: '#ff0',
			verticalAlign: 'middle',
			height: height,
			lineHeight: `${height}px`,
			margin: 'auto',
			width: titleWidth,
			color: titleColor,
			fontSize: titleFontSize,
			fontFamily: titleFontFamily
		},
		slider: {
			position: 'absolute',
			left: title ? titleWidth : 0,
			top: 0,
			right: 25
		},
		icon: {
			position: 'absolute',
			backgroundColor: '#fff',
			height: iconSize + 2,
			top: (height - iconSize - 6) / 2,
			right: 0
		},
		line: {
			boxSizing: 'border-box',
			position: 'absolute',
			top: cellHeight / 2,
			bottom: cellHeight / 2,
			right: iconSize / 2,
			width: 3,

			borderColor: borderColor,
			borderStyle: 'solid',
			borderTopWidth: 1,
			borderRightWidth: 1,
			borderLeftWidth: 0,
			borderBottomWidth: 1,
			// borderTopRightRadius: 5
		}
	};
} 
	
export default class InputNumberSliderGroup extends Component {

	constructor(props) {
		super(props);
		this.state = {
			lock: props.lock,
			values: props.defaults
		};
	}

	onIconClick = () => {
		this.setState({lock: !this.state.lock});
	};

	static propTypes = {
		gutterY:  PropTypes.number,
		cellHeight: PropTypes.number,
		type: PropTypes.oneOf(['INT', 'NUMBER']),
		iconSize: PropTypes.number,
		defaults: PropTypes.arrayOf(PropTypes.number).isRequired,
		title: PropTypes.string,
		titleWidth: PropTypes.number,
		titleColor: PropTypes.string,
		labels: PropTypes.arrayOf(PropTypes.string),
		labelWidth: PropTypes.number,
		labelColor: PropTypes.string,
		onChange: PropTypes.func,
		max: PropTypes.number.isRequired,
		min: PropTypes.number.isRequired
	};

	static defaultProps = {
		gutterY: 5,
		iconSize: 16,
		labelWidth: 10,
		cellHeight: 30,
		titleWidth: 50,
		titleColor: GREY500,
		titleFontSize: FONT_SIZE_DEFAULT,
		titleFontFamily: FONT_FAMILY_DEFAULT,
		type: 'NUMBER'
	};

	renderItems() {
		const { lock, values } = this.state;
		const { cellHeight, max, min, type, labels, labelWidth, labelColor, onChange } = this.props;
		return values.map((value, index) => {
			const label = labels && labels.length > index ? labels[index] : undefined;
			return (
				<InputNumberSlider
					onChange={(e, v) => {
						let newValues;
						if(lock) {
							const scale = (v - value) / (max - min);
							newValues = [...values];
	
							for(let i = 0; i < newValues.length; i++) {
								newValues[i] += scale * (max - min);

								// newValues[i] = SetToRange(newValues[i], min, max);
							}

							this.setState({values: newValues});
						} else {
							newValues = [...values];
							newValues[index] = v;
							this.setState({values: newValues});
						}

						if(onChange) {
							onChange(e, newValues);
						}
						
					}}
					label={label}
					type={type}
					labelWidth={labelWidth}
					labelColor={labelColor}
					cellHeight={cellHeight}
					key={'inputNumberSliderGroup_' + index} 
					max={max} min={min} 
					defaultValue={value} />
			);
		});
	}

	componentWillReceiveProps(newProps) {
		if(newProps.defaults !== undefined) {
			this.setState({
				values: newProps.defaults
			});
		}
		// if(newProps.lock !== undefined) {
		// 	this.setState({
		// 		lock: newProps.lock
		// 	});
		// }
	}

	render() {
		const { iconSize, gutterY, title } = this.props;

		const mstyle = {
			paddingBottom: 2,
			backgroundColor: '#fff'
		};

		const icon = this.state.lock ?
			<IconButton
				padding={0}
				color={lockColor}
				onClick={this.onIconClick}
				style={mstyle}
				icon={
					<SvgIcon 
						width={iconSize}
						height={iconSize}>
						{lockIconPath}
					</SvgIcon>
				} /> :
			<IconButton
				padding={0}
				color={unLockColor}
				onClick={this.onIconClick}
				style={mstyle}
				icon={
					<SvgIcon
						width={iconSize}
						height={iconSize}
						onClick={this.onIconClick}>
						{unLockIconPath}
					</SvgIcon>
				} />;

		const styles = getStyles(this.props, this.state);

		const titleDiv = title ? <div style={styles.title}>{title}</div> : '';
		return (
			<div style={styles.root}>
				{titleDiv}
				<div style={styles.slider}>
					<VerticalSeparation gutter={gutterY}>
						{this.renderItems()}
					</VerticalSeparation>
				</div>
				<div style={styles.line}></div>
				<div style={styles.icon}>{icon}</div>
			</div>
		);
	}

}