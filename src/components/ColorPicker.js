import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { GREY300, GREY800, BLUE600 } from '../styles/colors';

import Label from './Label';

import Left from './Left';

import SvgIcon from './SvgIcon';

import { toHSV, HSVToString } from '../utils/colorManipulator';

import { gKeyboardArrowRight,  gKeyboardArrowDown } from '../svgIcons/google/Hardware';

import Popover from './Popover';

const caWidth = 200, caHeight = 180, tpadding = 6, sliderWidth = 16, sphereSize = 6;

class ColorPicker extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	open: false,
	    	value: props.value,
	    	sliderTop: 0,
	    	panelTop: 0,
	    	panelLeft: 0
	    };
	}

	static propTypes = {
	    height: PropTypes.number,
	    borderRadius: PropTypes.number,
	    activeColor: PropTypes.string,
	    fullWidth: PropTypes.bool,
	    style: PropTypes.object,
	    value: PropTypes.string,
	    onChange: PropTypes.func
  	};

	static defaultProps = {
		height: 32,
		borderRadius: 4,
		value: '#fff',
		activeColor: BLUE600,
		fullWidth: false,
		style: {}
	};

	setParasFromColor(color) {
		// console.log(color);
		let hsv = toHSV(color);
		// console.log(hsv);
		return {
			sliderTop: hsv.h * caHeight,
			panelTop: (1 - hsv.v) * caHeight,
			panelLeft: hsv.s * caWidth
		}
	}

	componentWillMount() {
		this.setState(this.setParasFromColor(this.state.value));
	}

	componentDidMount() {
		this._handleSliderMove = this.handleSliderMove.bind(this);
  		this._handleSliderUp = this.handleSliderUp.bind(this);
  		this._handlePanelMove = this.handlePanelMove.bind(this);
  		this._handlePanelUp = this.handlePanelUp.bind(this);
	}



	handleSliderMove(e) {
		const rect = this.colorSliderBarElement.getBoundingClientRect();
		// console.log(e, rect);

		let sliderTop = e.clientY - rect.top;
		if(sliderTop < 0) {
			sliderTop = 0;
		} else if(sliderTop > rect.height) {
			sliderTop = rect.height;
		}

		// const hsv = toHSV(this.state.value);
		const h = sliderTop / rect.height;
		const s = this.state.panelLeft / caWidth;
		const v = 1 - this.state.panelTop / caHeight;

		const color = HSVToString(h, s, v);

		this.setState({value: color, sliderTop: sliderTop});

		if(this.props.onChange) {
			this.props.onChange(e, color);
		}
	}

	handleSliderUp(e) {
		window.removeEventListener('mousemove', this._handleSliderMove, false);
		window.removeEventListener('mouseup', this._handleSliderUp, false);
	}

	handlePanelMove(e) {
		const rect = this.colorPanelElement.getBoundingClientRect();
		let panelLeft = e.clientX - rect.left, panelTop = e.clientY - rect.top;

		if(panelLeft < 0) {
			panelLeft = 0;
		} else if(panelLeft > rect.width) {
			panelLeft = rect.width;
		}

		if(panelTop < 0) {
			panelTop = 0;
		} else if(panelTop > rect.height) {
			panelTop = rect.height;
		}

		// const hsv = toHSV(this.state.value);

		
		const v = 1 - panelTop / rect.height;
		const s = panelLeft / rect.width;

		// console.log();

		const color = HSVToString(this.state.sliderTop / caHeight, s, v);

		this.setState({value: color, panelLeft: panelLeft, panelTop: panelTop});

		if(this.props.onChange) {
			this.props.onChange(e, color);
		}
	}

	handlePanelUp(e) {
		window.removeEventListener('mousemove', this._handlePanelMove, false);
		window.removeEventListener('mouseup', this._handlePanelUp, false);
	}

  	render() {
  		// console.log(toHSL(this.state.value));
		const {
	    	items, height, borderRadius, fullWidth, activeColor
	    } = this.props;

	    const mpadding = 4, iconSize = 18, borderWidth = 1, cHeight = height - borderWidth * 2;

	    const defaultStyle = {
			position: 'relative',
			boxSizing: 'border-box',
			// width: '100%',
			height: height,
			border: `${borderWidth}px solid ${this.state.open ? activeColor : GREY300}`,
			padding: `0 ${mpadding * 2 + iconSize}px 0 ${mpadding}px`,
			backgroundColor: '#fff',
			borderRadius: borderRadius
	    };

	    const iconStyle = {
			position: 'absolute',
			top: 0,
			right: mpadding,
			lineHeight: `${cHeight}px`
	    }

	    // const paras = this.setParasFromColor(this.state.value);
	    // console.log(this.state);
	    return <div style={{
	      display: fullWidth ? 'block' : 'inline-block',
	      verticalAlign: 'top'
	    }}>
	  		<div style={Object.assign({}, defaultStyle, this.props.style)} onClick={e => {
	        	this.setState({open: !this.state.open});
	      	}} ref={ref => this.element = ReactDOM.findDOMNode(ref)}>
	      		<div style={{
	      			boxSizing: 'border-box',
	      			minWidth: cHeight - mpadding * 2,
	      			height: cHeight - mpadding * 2,
	      			margin: `${mpadding}px 0`,
	      			border: `${borderWidth}px solid ${this.state.open ? activeColor : GREY300}`,
	      			backgroundColor: this.state.value
	      		}}></div>
	  			<span style={iconStyle}><SvgIcon color={this.state.open ? activeColor : GREY800} width={iconSize} height={iconSize}><path d={this.state.open ? gKeyboardArrowDown : gKeyboardArrowRight} /></SvgIcon></span>
	  		</div>
	  		<Popover otherElements={[this.element]} open={this.state.open} style={{
	        	marginTop: mpadding,
	        	padding: mpadding,
	        	width: caWidth + sliderWidth + (mpadding + borderWidth) * 2 + tpadding
	      	}} isUseSlideAnimation={true} maxHeight={250} outClickClose={false} onRequestClose={e => this.setState({open: false})}>
	        	<Left><div ref={ref => this.colorPanelElement = ReactDOM.findDOMNode(ref)} style={{
	        		backgroundColor: HSVToString(this.state.sliderTop / caHeight, 1, 1),
	        		position: 'relative',
	        		top: 0,
	        		left: 0,
	        		width: caWidth,
	        		height: caHeight,
	        		marginRight: tpadding
	        	}} onMouseDown={e => {
					this._handlePanelMove(e);
	        		window.addEventListener('mousemove', this._handlePanelMove, false);
	        		window.addEventListener('mouseup', this._handlePanelUp, false);
	        	}}>
	        		<div style={{
	        			position: 'absolute',
	        			top: 0,
	        			left: 0,
	        			width: '100%',
	        			height: '100%',
	        			background: 'linear-gradient(to right,#fff,rgba(255,255,255,0))'
	        		}}></div>
	        		<div style={{
	        			position: 'absolute',
	        			top: 0,
	        			left: 0,
	        			width: '100%',
	        			height: '100%',
	        			background: 'linear-gradient(to top,#000,rgba(0,0,0,0))'
	        		}}></div>
	        		<div style={{
	        			boxSizing: 'border-box',
	        			position: 'absolute',
	        			top: this.state.panelTop - sphereSize / 2,
	        			left: this.state.panelLeft - sphereSize / 2,
	        			width: sphereSize,
	        			height: sphereSize,
	        			backgroundColor: '#fff',
	        			borderRadius: '50%',
	        			border: `${borderWidth}px solid ${GREY300}`,
	        			boxShadow: 'rgba(0, 0, 0, 0.6) 0px 0px 2px',
	        			pointerEvents: 'none'
	        		}}></div>
	        	</div>
	        	<div ref={ref => this.colorSliderBarElement = ReactDOM.findDOMNode(ref)} style={{
	        		position: 'relative',
	        		top: 0,
	        		left: 0,
	        		width: sliderWidth,
	        		height: caHeight,
	        		background: 'linear-gradient(to bottom,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%)'
	        	}} onMouseDown={e => {
	        		this._handleSliderMove(e);
	        		window.addEventListener('mousemove', this._handleSliderMove, false);
	        		window.addEventListener('mouseup', this._handleSliderUp, false);
	        	}}>
	        		<div style={{
	        			boxSizing: 'border-box',
	        			position: 'absolute',
	        			top: this.state.sliderTop - 2,
	        			left: 0,
	        			width: '100%',
	        			height: 4,
	        			borderRadius: 2,
	        			backgroundColor: '#fff',
	        			border: `${borderWidth}px solid ${GREY300}`,
	        			boxShadow: 'rgba(0, 0, 0, 0.6) 0px 0px 2px',
	        			pointerEvents: 'none'
	        		}}></div>
	        	</div></Left>
	     	</Popover>
		</div>
  }
}

export default ColorPicker;