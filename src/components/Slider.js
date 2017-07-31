import React, { Component, PropTypes } from 'react';

import { CYAN500, GREY300 } from '../styles/colors';

import SetToRange from '../utils/SetToRange';

function getStyles(props) {
	return {
		root: {
			// backgroundColor: '#0f0',
			// cursor: 'pointer',
			position: 'relative',
			height: props.dotRadius * 2
		},
		bar: {
			// cursor: 'pointer',
			backgroundColor: props.barBgColor,
			// width: '100%',
			height: props.barHeight,
			position: 'relative',
			left: 0,
			top: props.dotRadius - props.barHeight / 2
		},
		track: {
			// backgroundColor: '#f00',
			height: props.barHeight,
			marginRight: props.dotRadius * 2,
			position: 'relative',
			left: 0,
			top: 0
		},
		trackBar: {
			backgroundColor: props.dotBgColor,
			height: props.barHeight,
			position: 'absolute',
			top: 0,
			left: 0
		},
		dot: {
			backgroundColor: props.dotBgColor,
			width: props.dotRadius * 2,
			height: props.dotRadius * 2,
			borderRadius: props.dotRadius,
			position: 'absolute',
			top: -props.dotRadius + props.barHeight / 2,
			left: 0
		}
	};
}


export default class Slider extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: 0,
			percent: 0,
			isMoved: false,
		};
	}

	componentWillReceiveProps(newProps) {
        if(newProps.value !== undefined) {
        	let value = SetToRange(newProps.value, this.props.min, this.props.max);
        	const percent = this.valueToPercent(value);

            this.setState({
                value: value,
                percent: percent
            });
        }
    }

	componentWillMount() {
		let value = this.props.value;
		if (value === undefined) {
			value = this.props.defaultValue !== undefined ? this.props.defaultValue : this.props.min;
		}
		let percent = (value - this.props.min) / (this.props.max - this.props.min);
		if (isNaN(percent)) {
			percent = 0;
		}

		this.stepPercent = this.props.step / (this.props.max - this.props.min);

		this.setState({
			percent: percent,
			value: value
		});
	}

	componentDidMount() {
		console.log('render end');
	}

	static propTypes = {
		barBgColor: PropTypes.string,
		barHeight: PropTypes.number,
		dotBgColor: PropTypes.string,
		dotRadius: PropTypes.number,
		defaultValue: PropTypes.number,
		onChange: PropTypes.func,
		onDragStart: PropTypes.func,
		onDragEnd: PropTypes.func,
		max: PropTypes.number,
		min: PropTypes.number,
		step: PropTypes.number
	};

	static defaultProps = {
		barBgColor: GREY300,
		barHeight: 3,
		dotBgColor: CYAN500,
		dotRadius: 6,
		defaultValue: 0.5,
		max: 1,
		min: 0,
		step: 0.01
	};

	handleMouseDown(e) {

		this.setState({isMoved: true});
		this.setPercentAndValue(e);
		if(document) {
			document.addEventListener('mousemove', this.dragMouseHandler, false);
			document.addEventListener('mouseup', this.dragMouseEndHandler, false);
			document.addEventListener('touchmove', this.dragMouseHandler, false);
			document.addEventListener('touchend', this.dragMouseEndHandler, false);
			e.preventDefault();
		}

		if(this.props.onDragStart) {
			this.props.onDragStart(e, this.state.value);
		}
	}

	dragMouseHandler = (e) => {
		if(this.state.isMoved) {
			this.setPercentAndValue(e);
		}
	};

	dragMouseEndHandler = (e) => {
		if(document) {
			document.removeEventListener('mousemove', this.dragMouseHandler, false);
			document.removeEventListener('mouseup', this.dragMouseEndHandler, false);
			document.removeEventListener('touchmove', this.dragMouseHandler, false);
			document.removeEventListener('touchend', this.dragMouseEndHandler, false);
		}

		this.setState({isMoved: false});

		if(this.props.onDragEnd) {
			this.props.onDragEnd(e, this.state.value);
		}
	}

	setPercentAndValue(event) {
		let positionX = event.clientX;
		if(event.type == 'touchstart' || event.type == 'touchmove') {
			positionX  = event.touches[0].clientX;;
		}

		const width = this.sliderBar.clientWidth;

		const left = this.getBarLeft();
		const changeLeft = positionX - left;

		let changeLeftPercent = changeLeft / width;

		const changePercent = changeLeftPercent - this.state.percent;
		const count = parseInt(changePercent / this.stepPercent);

		let value = SetToRange(this.state.value + count * this.props.step, this.props.min, this.props.max);

		changeLeftPercent = this.valueToPercent(value);

		if(this.props.onChange && value !== this.state.value) {
			this.props.onChange(event, value);
		}

		this.setState({
			percent: changeLeftPercent,
			value: value,
		});

	}

	percentToValue(percent) {
		return percent * (this.props.max - this.props.min) + this.props.min;
	}

	valueToPercent(value) {
		return (value - this.props.min) / (this.props.max - this.props.min);
	}

	getBarLeft() {
		return this.sliderBar.getBoundingClientRect().left;
	}

	render() {
		const styles = getStyles(this.props);
		let dotStyle = styles.dot;

		const stringPercent = `${this.state.percent * 100}%`;

		dotStyle.left = stringPercent;

		let trackBarStyle = styles.trackBar;
		trackBarStyle.width = stringPercent;

		return (
			<div style={Object.assign({}, styles.root, this.props.style)}
				onMouseDown={this.handleMouseDown.bind(this)}
				onTouchStart={this.handleMouseDown.bind(this)}>
				<div style={Object.assign({}, styles.bar, this.props.barStyle)}>
					<div style={styles.track}
						ref={(ref) => this.sliderBar = ref}>
						<div style={trackBarStyle}></div>
						<div 
							style={Object.assign({}, dotStyle, this.props.dotStyle)}
							ref={(ref) => this.sliderDot = ref}></div>
					</div>
				</div>
			</div>
		);
	}
}