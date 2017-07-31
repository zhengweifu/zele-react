import React, { Component, PropTypes } from 'react';

import InputNumber from './InputNumber';
import Slider from './Slider';

import { GREY500 } from '../styles/colors';

import SetToRange from '../utils/SetToRange';

import { FONT_SIZE_SMALL, FONT_FAMILY_DEFAULT } from '../styles/constants';

function getStyles(props) {
	const { height, dotRadius, label, labelWidth, inputWidth, labelColor, labelFontSize, labelFontFamily } = props;
	const gutter = 5;
	// const height = dotRadius * 2;
	return {
		root: {
			position: 'relative',
			// backgroundColor: '#f00',
			height: height
		},
		label: {
			position: 'absolute',
			left: 0,
			top: 0,
			bottom: 0,
			// backgroundColor: '#ff0',
			verticalAlign: 'middle',
			height: height,
			lineHeight: `${height}px`,
			margin: 'auto',
			width: labelWidth,
			color: labelColor,
			fontSize: labelFontSize,
			fontFamily: labelFontFamily
		},
		input: {
			overflow: 'hidden',
			position: 'absolute',
			left: label ? (labelWidth + gutter) : 0,
			top: 0,
			width: inputWidth,
			height: height
		},
		slider: {
			position: 'absolute',
			top: height / 2 - dotRadius,
			left: label ? (labelWidth + inputWidth + gutter * 2) : (inputWidth + gutter),
			right: 0
		}
	};
}

export default class InputNumberSlider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.defaultValue
		};
	}

	static defaultProps = {
		height: 30,
		dotRadius: 6,
		fixed: 2,
		type: 'NUMBER',
		labelColor: GREY500,
		labelFontSize: FONT_SIZE_SMALL,
		labelFontFamily: FONT_FAMILY_DEFAULT,
		labelWidth: 30,
		inputWidth: 55,
		defaultValue: 0,
		max: 10,
		min: 0
	};

	static propTypes = {
		height: PropTypes.number,
		dotRadius: PropTypes.number,
		fixed: PropTypes.number,
		label: PropTypes.string,
		labelColor: PropTypes.string,
		labelFontSize: PropTypes.number,
		labelFontFamily: PropTypes.string,
		labelWidth: PropTypes.number,
		inputWidth: PropTypes.number,
		onChange: PropTypes.func,
		defaultValue: PropTypes.number,
		value: PropTypes.number,
		type: PropTypes.oneOf(['INT', 'NUMBER']),
		max: PropTypes.number,
		min: PropTypes.number
	};

	init(props) {
		let value = props.value;
		if (value === undefined) {
			value = props.defaultValue !== undefined ? props.defaultValue : props.min;
		}

		const halfHeight = props.height / 2;
		if(props.dotRadius > halfHeight) {
			throw new Error('props.dotRadius 不能大于 props.height / 2.');
		}

		this.setState({value: value});
	}

	componentWillMount() {
		this.init(this.props);
	}

	componentWillReceiveProps(newProps) {
		this.init(newProps);
		// if(newProps.defaultValue !== undefined) {
		// 	this.setState({
		// 		value: newProps.defaultValue
		// 	});
		// }
	}

	onSliderHandleChange(event, value) {
		this.setState({value: value});

		if(this.props.onChange) {
			this.props.onChange(event, value);
		}
	}

	onInputHandleChange(event, value) {
		// value = parseFloat(event.target.value);
		this.setState({value: value});

		if(this.props.onChange) {
			this.props.onChange(event, value);
		}
	}

	render() {
		const { height, dotRadius, label, min, max, type } = this.props;

		let sliderValue = SetToRange(this.state.value, min, max);

		const styles = getStyles(this.props);
		const labelDiv = label ? <div style={styles.label}>{label}</div> : '';
		return (
			<div style={styles.root}>
				{labelDiv}
				<div style={styles.input}>
					<InputNumber
						style={{height: height}}
						value={Number(this.state.value.toFixed(this.props.fixed))}
						onChange={this.onInputHandleChange.bind(this)}
						type={type}/>
				</div>

				<Slider
					dotRadius={dotRadius}
					value={sliderValue}
					onChange={this.onSliderHandleChange.bind(this)}
					max={max}
					min={min}
					step={type === 'INT' ? 1 : 0.01}
					style={styles.slider}/>
			</div>
		);
	}
}
