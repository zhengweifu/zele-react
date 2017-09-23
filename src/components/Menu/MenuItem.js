import React, { Component, PropTypes } from 'react';

import MixinComponent from './MixinComponent';

import Label from '../Label';

import VerticalMiddle from '../VerticalMiddle';

// import Left from '../Left';

class MenuItem extends MixinComponent {
	constructor(props) {
        super(props);
        this.state = {
        	active: false,
        	hover: false
        };

        this.type = 'MenuItem';
    }
	static propTypes = {
		label: PropTypes.string,
		children: PropTypes.node,
		icon: PropTypes.node,
		onClick: PropTypes.func,
	};

	static defaultProps = {
		label: 'MenuItem'
	};

	render() {
		const { label, children, onClick, icon } = this.props;

		const menuProps = this.getMenuProps();
		const rootMenu = menuProps.component;

		const height = menuProps.itemHeight;
		const activeBgColor = menuProps.itemActiveBgColor;
		let textColor = menuProps.itemColor;
		const fontFamily = menuProps.itemFontFamily;
		const fontSize = menuProps.itemFontSize;
		const padding = menuProps.itemPadding;

		const index = menuProps.index;



		const iconSize = fontSize + 4;
		const iconStyle = {
			margin: (height - iconSize) / 2,
			marginRight: 5,
			marginLeft: 0
		};

		let parentIndex = this.parent().props.selfIndex;
		if(parentIndex === undefined) parentIndex = 0;

		// 左边的图标
		const iconElement = icon !== undefined ? <span style={{lineHeight: `${height}px`}}>{React.cloneElement(icon, {color: textColor, width: iconSize, height: iconSize, style: iconStyle})}</span> : '';

		// 查看是否处于激活状态
		const isActive = (rootMenu.state.activeLevelIndex == index - 1 
					&& rootMenu.state.activeParentIndex == parentIndex
					&& rootMenu.state.activeMemberIndex == this.props.selfIndex);

		let rootStyle = {
			boxSizing: 'border-box',
			backgroundColor:  isActive ? activeBgColor : 'transparent',
			// borderBottom: `2px solid ${rootMenu.props.mode === 'horizontal' && this.state.hover ? activeBgColor : 'transparent'}`,
			// borderRight: `4px solid ${rootMenu.props.mode !== 'horizontal' && this.state.hover ? activeBgColor : 'transparent'}`,
			padding: `0px ${padding * index}px`,
			overflow: 'hidden', 
			textOverflow: 'ellipsis', 
			whiteSpace: 'nowrap'
		};

		if(rootMenu.props.mode === 'horizontal') {
			rootStyle.borderBottom = `2px solid ${this.state.hover ? activeBgColor : 'transparent'}`;
		} else {
			rootStyle.borderRight = `4px solid ${this.state.hover ? activeBgColor : 'transparent'}`;
		}

		return <div style={rootStyle} onClick={e => {
				this.setState({hover: false});
				rootMenu.setState({activeLevelIndex: index - 1, activeMemberIndex: this.props.selfIndex, activeParentIndex: parentIndex});
				if(onClick) {
					onClick(index - 1, parentIndex, this.props.selfIndex);
				}
			}} onMouseOver={e => {
				this.setState({hover: true});
			}} onMouseOut={e => {
				this.setState({hover: false});
			}}>
	
			{iconElement}
			<Label content={label} fontFamily={fontFamily} fontSize={fontSize} color={textColor} height={height}/>
			
		</div>;
	}

}

export default MenuItem;