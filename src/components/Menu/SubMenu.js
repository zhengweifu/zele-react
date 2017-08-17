import React, { Component, PropTypes } from 'react';

import MixinComponent from './MixinComponent';

import GridList from '../Grid/GridList';

import Label from '../Label';

import Popover from '../Popover';

import Left from '../Left';

import SvgIcon from '../SvgIcon';

import { GREY700 } from '../../styles/colors.js';

import { gKeyboardArrowRight,  gKeyboardArrowDown } from '../../svgIcons/google/Hardware';

class SubMenu extends MixinComponent {
	constructor(props) {
        super(props);
        this.state = {
        	hover: false,
        	open: props.open
        };

        this.type = 'SubMenu';
    }

	static propTypes = {
		label: PropTypes.string,
		open: PropTypes.bool,
		icon: PropTypes.node,
		children: PropTypes.node,
		bgColor: PropTypes.string,
		onClick: PropTypes.func
	};

	static defaultProps = {
		label: 'SubMenu',
		open: false,
		bgColor: GREY700
	};

	render() {
		const { label, children, bgColor, onClick, icon } = this.props;
		const root = this.root();
		const rootMenu = root.component;

		const height = rootMenu.props.itemHeight;
		const activeBgColor = rootMenu.props.itemActiveBgColor;
		const textColor = rootMenu.props.itemColor;
		const activeTextColor = rootMenu.props.itemActiveColor;
		const fontFamily = rootMenu.props.itemFontFamily;
		const fontSize = rootMenu.props.itemFontSize;
		const padding = rootMenu.props.itemPadding;

		const rootMode = rootMenu.props.mode;

		const index = root.index;

		const PCPopoverStyle = {
			backgroundColor: bgColor,
			border: 'none',
			left: 0,
			top: 0,
			width: 'parent',
			minWidth: 150,
			borderRadius: 0,
			padding: 0,
			boxShadow: 'none',
			display: 'inline-block'
		};

		const iconSize = fontSize + 4, arrowSize = 20;
		const arrowStyle = {
			margin: (height - iconSize) / 2 + 1,
			marginRight: 0
		};

		arrowStyle.marginLeft = arrowStyle.margin + 5;

		const iconStyle = {
			margin: (height - iconSize) / 2,
			marginRight: 5,
			marginLeft: 0
		};

		const labelElement = <Label content={label} fontFamily={fontFamily} fontSize={fontSize} color={this.state.hover ? activeTextColor : textColor} height={height}/>;
		const iconElement = <SvgIcon color={textColor} width={arrowSize} height={arrowSize} style={arrowStyle}>
				<path d={this.state.open ? gKeyboardArrowDown : gKeyboardArrowRight}/>
			</SvgIcon>;
		const childRootElement = rootMode === 'vertical' || index > 1 ? <div style={{
			display: this.state.open ? 'block' : 'none',
			margin: `0px ${-padding * index}px`,
			// padding: `0px ${padding}px`,
			backgroundColor: bgColor
		}}>{children}</div>:
			<Popover open={this.state.open} isUseSlideAnimation={true} maxHeight={250} outClickClose={false} style={PCPopoverStyle} onRequestClose={e => this.setState({activeIndex: -1, open: false})}>
				<div style={{margin: `0px ${-padding}px`, backgroundColor: bgColor}}>{children}</div>
			</Popover>;
		return <div style={{
				// backgroundColor: this.state.hover ? activeBgColor : 'transparent',
				padding: `0px ${padding * index}px`
			}} onMouseOver={e => {
				if(rootMode !== 'vertical') {
					// this.setState({open: true, hover: true})
				};
			}} onMouseOut={e => {
				// if(rootMode !== 'vertical') this.setState({open: false, hover: false});
			}}>
			<div onClick={e => {
				this.setState({open: !this.state.open});
				if(onClick) {
					onClick();
				}
			}}><Left>
				{icon !== undefined ? React.cloneElement(icon, {color: textColor, width: iconSize, height: iconSize, style: iconStyle}) : ''}
				{labelElement}
				{iconElement}
			</Left></div>
			{childRootElement}
		</div>;
	}

}

export default SubMenu;