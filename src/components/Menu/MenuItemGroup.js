import React, { Component, PropTypes } from 'react';

import MixinComponent from './MixinComponent';

import GridList from '../Grid/GridList';

import Label from '../Label';

import Popover from '../Popover';

// import Left from '../Left';

// import VerticalMiddle from '../VerticalMiddle';

import SvgIcon from '../SvgIcon';

import { darken } from '../../utils/colorManipulator';

import cloneElements from './cloneElements';

class MenuItemGroup extends MixinComponent {
	constructor(props) {
        super(props);

        this.type = 'MenuItemGroup';
    }

	static propTypes = {
		label: PropTypes.string,
		icon: PropTypes.node,
		children: PropTypes.node
	};

	static defaultProps = {
		label: 'MenuItemGroup'
	};

	render() {
		const { label, children, icon } = this.props;
		const menuProps = this.getMenuProps();
		// const rootMenu = menuProps.component;

		const height = menuProps.itemHeight;
		const activeBgColor = menuProps.itemActiveBgColor;
		const textColor = darken(menuProps.itemColor, 0.3);
		const fontFamily = menuProps.itemFontFamily;
		const fontSize = menuProps.itemFontSize;
		const padding = menuProps.itemPadding;

		const bgColor = menuProps.subBgColor;

		const rootMode = menuProps.mode;

		const index = menuProps.index;

		let _children = cloneElements(children);

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
		const marginSize = (height - iconSize) / 2;
		const iconStyle = {
			margin: `${marginSize} 5 ${marginSize} 0`
		};

		const iconElement = icon !== undefined ? <span style={{lineHeight: `${height}px`}}>{React.cloneElement(icon, {color: textColor, width: iconSize, height: iconSize, style: iconStyle})}</span> : '';

		const labelElement = <Label content={label} fontFamily={fontFamily} fontSize={fontSize} color={textColor} height={height}/>;
		const childRootElement = rootMode === 'vertical' || index > 1 ? <div style={{
			margin: `0px ${-padding * index}px`,
			// padding: `0px ${padding}px`,
			backgroundColor: bgColor
		}}>{_children}</div>:
			<Popover open={true} isUseSlideAnimation={true} maxHeight={250} outClickClose={false} style={PCPopoverStyle} onRequestClose={e => this.setState({activeIndex: -1, open: false})}>
				<div style={{margin: `0px ${-padding}px`, backgroundColor: bgColor}}>{_children}</div>
			</Popover>;
		return <div style={{
				// backgroundColor: this.state.hover ? activeBgColor : 'transparent',
				padding: `0px ${padding * index}px`,
				overflow: 'hidden', 
				textOverflow: 'ellipsis', 
				whiteSpace: 'nowrap'
			}}>

			{iconElement}
			{labelElement}
			
			{childRootElement}
		</div>;
	}

}

export default MenuItemGroup;