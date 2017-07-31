import React, { Component, PropTypes } from 'react';

import { fade, lighten, darken } from '../utils/colorManipulator';

import { GREY100, GREY400 } from '../styles/colors';

import { FONT_SIZE_DEFAULT, FONT_FAMILY_DEFAULT } from '../styles/constants';

import Paper from './Paper';

import Overlay from './Overlay';

import IsMobile from '../utils/IsMobile';

const isMobile = IsMobile.Any();

function getStyles(props, state) {
	return {
		root: {
			display: props.fullWidth ? 'block' : 'inline-block',
			position: 'relative'
		},
		button: {
			padding: '0px 10px',
			textAlign: 'center'
		},
		item: {
			display: 'inline-block'
		},
		label: {
			color: props.labelColor,
			display: 'inline-block',
			padding: '5px 0px',
			fontFamily: props.fontFamily,
			fontSize: props.fontSize
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
		}
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
		style: PropTypes.object,
		styleButton: PropTypes.object,
		bgColor: PropTypes.string,
		hoverColor: PropTypes.string,
		fullWidth: PropTypes.bool,
		label: PropTypes.string,
		labelColor: PropTypes.string,
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
		disable: PropTypes.bool,
		isLoading: PropTypes.bool
	};

	static defaultProps = {
		style: {},
		styleButton: {},
		bgColor: GREY400,
		fullWidth: false,
		label: 'RaisedButton',
		labelColor: GREY100,
		toggle: false,
		toggled: false,
		fontSize: FONT_SIZE_DEFAULT,
		fontFamily: FONT_FAMILY_DEFAULT,
		disable: false,
		isLoading: false
	};

	handleMouseEnter(e) {
		if(!isMobile) {
			this.setState({hovered: true});
			if(this.props.onMouseEnter) {
				this.props.onMouseEnter(e);
			}
		}
	}

	handleMouseLeave(e) {
		if(!isMobile) {
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
			label,
			labelColor,
			bgColor,
			hoverColor,
			leftIcon,
			rightIcon,
			style,
			styleButton,
			toggle,
			toggled,
			toggledColor,
			onClick
		} = this.props;

		if(this.state.random === null && this.props.isLoading) {
			this.setState({random: this.generateLoadingAnimation()});
		}

		const styles = getStyles(this.props, this.state);

        let nbgColor = toggle && this.state.toggled ? toggledColor ? toggledColor : lighten(bgColor, 0.2) : bgColor;

		nbgColor = this.state.hovered ? hoverColor ? hoverColor : lighten(nbgColor, 0.2) : nbgColor;

		if(this.state.isDown) {
			nbgColor = darken(nbgColor, 0.2);
		}

		let iconLeftStyle = Object.assign({}, styles.icon);

		let labelStyle = styles.label;

		let iconRightStyle = Object.assign({}, styles.icon);

		if(leftIcon && label) {
			iconLeftStyle['paddingRight'] = 5;
		}

		if(rightIcon && label) {
			iconRightStyle['paddingLeft'] = 5;
		}

		const leftElement = leftIcon ? <div style={iconLeftStyle}>{React.cloneElement(leftIcon, {color: labelColor})}</div> : null;
		const centerElement = <span style={labelStyle}>{label}</span>;
		const rightElement = rightIcon ? <div style={iconRightStyle}>{React.cloneElement(rightIcon, {color: labelColor})}</div> : null;
		const loadingElement = this.props.isLoading ? <div style={styles.loadingParent}><div style={styles.loading}></div></div> : '';

		return (
			<Paper style={Object.assign({}, styles.root, style)} bgColor={nbgColor}>
				<div style={Object.assign({}, styles.button, styleButton)} 
					onMouseLeave={this.handleMouseLeave.bind(this)}
					onMouseEnter={this.handleMouseEnter.bind(this)}
					onMouseDown={e => this.setState({isDown: true})}
					onMouseUp={e => this.setState({isDown: false})}
					onClick={e => {
						if(toggle) {
                            this.setState({toggled: !this.state.toggled});
                        }
						if(onClick) {
							onClick(e);
						}
					}}>
					<div style={styles.item}>
						{leftElement}
						{centerElement}
						{rightElement}
					</div>
				</div>
				{loadingElement}
			</Paper>
		);
	}
}