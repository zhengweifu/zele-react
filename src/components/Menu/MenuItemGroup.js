import React, { Component, PropTypes } from 'react';

import MixinComponent from './MixinComponent';

import GridList from '../Grid/GridList';

import Label from '../Label';

import Popover from '../Popover';

import Left from '../Left';

import SvgIcon from '../SvgIcon';

import { GREY700, GREY500 } from '../../styles/colors.js';

class MenuItemGroup extends MixinComponent {
	constructor(props) {
        super(props);

        this.type = 'MenuItemGroup';
    }

	static propTypes = {
		label: PropTypes.string,
		icon: PropTypes.node,
		children: PropTypes.node,
		bgColor: PropTypes.string,
		color: PropTypes.string,
		onClick: PropTypes.func
	};

	static defaultProps = {
		label: 'MenuItemGroup',
		bgColor: GREY700,
		color: GREY500
	};

	render() {
		const { label, children, bgColor, color, icon, onClick } = this.props;
		const root = this.root();
		const rootMenu = root.component;

		const height = rootMenu.props.itemHeight;
		const activeBgColor = rootMenu.props.itemActiveBgColor;
		// const textColor = rootMenu.props.itemColor;
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

		const iconSize = fontSize + 4;
		const iconStyle = {
			margin: (height - iconSize) / 2,
			marginRight: 5,
			marginLeft: 0
		};
		iconStyle.marginLeft = iconStyle.margin + 5;

		const labelElement = <Label content={label} fontFamily={fontFamily} fontSize={fontSize} color={color} height={height}/>;
		const childRootElement = rootMode === 'vertical' || index > 1 ? <div style={{
			// display: this.state.open ? 'block' : 'none',
			margin: `0px ${-padding * index}px`,
			// padding: `0px ${padding}px`,
			backgroundColor: bgColor
		}}>{children}</div>:
			<Popover open={true} isUseSlideAnimation={true} maxHeight={250} outClickClose={false} style={PCPopoverStyle} onRequestClose={e => this.setState({activeIndex: -1, open: false})}>
				<div style={{margin: `0px ${-padding}px`, backgroundColor: bgColor}}>{children}</div>
			</Popover>;
		return <div style={{
				// backgroundColor: this.state.hover ? activeBgColor : 'transparent',
				padding: `0px ${padding * index}px`
			}}>
			<Left>
				{icon !== undefined ? React.cloneElement(icon, {color: color, width: iconSize, height: iconSize, style: iconStyle}) : ''}
				{labelElement}
			</Left>
			{childRootElement}
		</div>;
	}

}

export default MenuItemGroup;