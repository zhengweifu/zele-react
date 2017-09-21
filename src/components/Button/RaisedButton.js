import React, { Component, PropTypes } from 'react';

import { fade, lighten, darken } from '../../utils/colorManipulator';

import { GREY300, GREY100, GREY900, BLUE600, RED600 } from '../../styles/colors';

import { FONT_SIZE_DEFAULT, FONT_FAMILY_DEFAULT } from '../../styles/constants';

// import Left from '../Left';

// import VerticalMiddle from '../VerticalMiddle';

import Label from '../Label';

// import Paper from '../Paper';

// import Overlay from '../Overlay';

import IsMobile from '../../utils/IsMobile';

const isMobile = IsMobile.Any();

function getStyles(props, state) {
	let { fontSize, size, labelColor, height } = props;

	let iconSize = 20;

	if(props.type === 'default') {
		labelColor = GREY900;
	} else {
		labelColor = GREY100;
	}
	let padding = 8;
	switch(size) {
		case 'large':
			fontSize = Math.round(fontSize * (1 + 0.1));
			padding =  Math.round(padding * (1 + 0.1));
			height = 36;
			iconSize = 24;
			break;
		case 'small':
			fontSize = Math.round(fontSize * (1 - 0.1));
			padding =  Math.round(padding * (1 - 0.1));
			height = 28;
			iconSize = 18;
			break;
		case 'mini':
			fontSize = Math.round(fontSize * (1 - 0.3));
			padding =  Math.round(padding * (1 - 0.3));
			height = 24;
			iconSize = 16;
			break;
	}
	return {
		root: {
			// display: props.fullWidth ? 'block' : 'inline-block',
			position: 'relative',
			border: 'none',
			width: props.fullWidth ? '100%' : 'auto',
			padding: 0,
			borderRadius: props.borderRadius,
			boxShadow: props.shadow ? 'rgba(0, 0, 0, 0.1) 0px 2px 3px' : 'none',
			cursor: !props.disabled ? 'pointer' : 'not-allowed',
			height: height,
			outline: 'none'
		},
		button: {
			padding: '0px 10px',
			textAlign: 'center',
			height: '100%'
		},
		item: {
			display: 'inline-block',
			height: '100%'
		},
		label: {
			color: labelColor,
			display: 'inline-block',
			padding: `${padding}px 0px`,
			fontFamily: props.fontFamily,
			fontSize: fontSize
		},
		icon: {
			display: 'inline-block',
			verticalAlign: 'middle'
		},

		loadingParent: {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			backgroundColor: 'rgba(0, 0, 0, 0.5)',
		},

		loading: {
			boxSizing: 'border',
			border: '3px solid #f3f3f3',
		    borderTop: '3px solid #3498db',
		    borderRadius: '50%',
		    width: 14,
		    height: 14,
		    position: 'absolute',
		    top: 0,
		    bottom: 0,
		    left: 0,
		    right: 0,
		    margin: 'auto',
		    animation: `animation_${state.random} 2s linear infinite`
		},

		height: height,

		iconSize: iconSize
	};
}

export default class RaisedButton extends Component {
	constructor(props) {
		super(props);

		this.state = {
			hovered: false,
			toggled: props.toggled,
			random: null,
			isDown: false
		};

		this.type = 'RaisedButton';
	}

	generateLoadingAnimation() {
		const random = Math.round(Math.random() * 10000000);

		const style = document.createElement("style");
		const css = `@keyframes animation_${random} {
			0% { transform: rotate(0deg); }
			100% { transform: rotate(360deg); }
		}`;

		style.type = "text/css";
		style.appendChild(document.createTextNode(css));

		document.getElementsByTagName("head")[0].appendChild(style);

		return random;
	}

	static propTypes = {
		type: PropTypes.oneOf(['default', 'primary', 'danger']),
		style: PropTypes.object,
		styleButton: PropTypes.object,
		bgColor: PropTypes.string,
		hoverColor: PropTypes.string,
		fullWidth: PropTypes.bool,
		label: PropTypes.string,
		labelColor: PropTypes.string,
		height: PropTypes.number,
		size: PropTypes.oneOf(['custom', 'large', 'small', 'mini']),
		fontSize: PropTypes.number,
		fontFamily: PropTypes.string,
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
		onClick: PropTypes.func,
		disabled: PropTypes.bool,
		borderRadius: PropTypes.number,
		shadow: PropTypes.bool,
		isLoading: PropTypes.bool
	};

	static defaultProps = {
		type: 'default',
		size: 'custom',
		height: 32,
		style: {},
		styleButton: {},
		bgColor: GREY100,
		fullWidth: false,
		labelColor: GREY300,
		toggle: false,
		toggled: false,
		fontSize: FONT_SIZE_DEFAULT,
		fontFamily: FONT_FAMILY_DEFAULT,
		borderRadius: 2,
		shadow: true,
		disabled: false,
		isLoading: false
	};

	handleMouseEnter(e) {
		if(!this.props.disabled && !isMobile) {
			this.setState({hovered: true});
			if(this.props.onMouseEnter) {
				this.props.onMouseEnter(e);
			}
		}
	}

	handleMouseLeave(e) {
		if(!this.props.disabled && !isMobile) {
			this.setState({hovered: false});
			if(this.props.onMouseLeave) {
				this.props.onMouseLeave(e);
			}
		}
	}
    componentWillReceiveProps(newProps) {
        if(newProps.toggled !== undefined) {
            this.setState({
                toggled: newProps.toggled
            });
        }
    }

	render() {
		const {
			type,
			label,
			hoverColor,
			leftIcon,
			rightIcon,
			style,
			styleButton,
			toggle,
			toggled,
			toggledColor,
			onClick,
			disabled
		} = this.props;

		let { bgColor, labelColor } = this.props;

		if(type === 'default') {
			labelColor = GREY900;
		} else {
			labelColor = GREY100;
		}

		if(this.state.random === null && this.props.isLoading) {
			this.setState({random: this.generateLoadingAnimation()});
		}

		const styles = getStyles(this.props, this.state);

		switch(type) {
			case 'primary':
				bgColor = BLUE600;
				break;
			case 'danger':
				bgColor = RED600;
				break;
		}

        let nbgColor = toggle && this.state.toggled ? toggledColor ? toggledColor : darken(bgColor, 0.2) : bgColor;

		nbgColor = this.state.hovered ? hoverColor ? hoverColor : lighten(nbgColor, 0.2) : nbgColor;

		if(this.state.isDown) {
			nbgColor = darken(nbgColor, 0.2);
		}

		let iconLeftStyle = Object.assign({}, styles.icon);

		let labelStyle = styles.label;

		let iconRightStyle = Object.assign({}, styles.icon);

		let nlabelColor = labelColor;

		if(disabled) {
			nbgColor = 'rgb(229, 229, 229)';
			nlabelColor = 'rgba(0, 0, 0, 0.3)';
			labelStyle.color = nlabelColor;
		}

		// const leftElement = leftIcon ? <VerticalMiddle style={{
		// 	paddingRight: label ? 5 : 0
		// }} height={styles.height}>{React.cloneElement(leftIcon, {color: nlabelColor, width: styles.iconSize, height: styles.iconSize})}</VerticalMiddle> : '';
		const leftElement = leftIcon ? <span style={{
			paddingRight: label ? 5 : 0,
			lineHeight:  `${styles.height}px`
		}} height={styles.height}>{React.cloneElement(leftIcon, {color: nlabelColor, width: styles.iconSize, height: styles.iconSize})}</span> : '';
		const centerElement = label ? <Label color={nlabelColor} content={label} height={styles.height} fontFamily={this.props.fontFamily} fontSize={this.props.fontSize}/> : '';
		const rightElement = rightIcon ? <span style={{
			paddingLeft: label ? 5 : 0,
			lineHeight:  `${styles.height}px`
		}} height={styles.height}>{React.cloneElement(rightIcon, {color: nlabelColor, width: styles.iconSize, height: styles.iconSize})}</span> : '';
		

		const loadingElement = this.props.isLoading ? <div style={styles.loadingParent}><div style={styles.loading}></div></div> : '';

		return (
			<div disabled={disabled} style={Object.assign({backgroundColor: nbgColor}, styles.root, style)}>
				<div style={Object.assign({}, styles.button, styleButton)} 
					onMouseLeave={this.handleMouseLeave.bind(this)}
					onMouseEnter={this.handleMouseEnter.bind(this)}
					onMouseDown={e => {
						if(!disabled) this.setState({isDown: true});
					}} onMouseUp={e => {
						if(!disabled) this.setState({isDown: false});
					}} onClick={e => { 
						if(disabled) {
							if(toggle) {
	                            this.setState({toggled: !this.state.toggled});
	                        }
							if(onClick) {
								onClick(e);
							}
						}
					}}>
					<div style={{height: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
						{leftElement}
						{centerElement}
						{rightElement}
					</div>
				</div>
				{loadingElement}
			</div>
		);
	}
}