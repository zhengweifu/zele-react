import React, { Component, PropTypes } from 'react';

import MixinComponent from './MixinComponent';

import Label from '../Label';

import Left from '../Left';

class MenuItem extends MixinComponent {
	constructor(props) {
        super(props);
        this.state = {
        	hover: false,
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

		const root = this.root();
		const rootMenu = root.component;

		const height = rootMenu.props.itemHeight;
		const activeBgColor = rootMenu.props.itemActiveBgColor;
		let textColor = rootMenu.props.itemColor;
		const activeTextColor = rootMenu.props.itemActiveColor;
		const fontFamily = rootMenu.props.itemFontFamily;
		const fontSize = rootMenu.props.itemFontSize;
		const padding = rootMenu.props.itemPadding;

		const index = root.index;


		textColor = this.state.hover ? activeTextColor : textColor;

		const iconSize = fontSize + 4;
		const iconStyle = {
			margin: (height - iconSize) / 2,
			marginRight: 5,
			marginLeft: 0
		};

		// iconStyle

		return <div style={{
				// backgroundColor: this.state.hover ? activeBgColor : 'transparent',
				padding: `0px ${padding * index}px`
			}} onClick={e => {
				this.setState({hover: true});
				if(onClick) {
					onClick();
				}
			}} onMouseOver={e => {
				this.setState({hover: true});
			}} onMouseOut={e => {
				this.setState({hover: false});
			}}>
			<Left>
			{icon !== undefined ? React.cloneElement(icon, {color: textColor, width: iconSize, height: iconSize, style: iconStyle}) : ''}
			<Label content={label} fontFamily={fontFamily} fontSize={fontSize} color={textColor} height={height}/>
			</Left>
		</div>;
	}

}

export default MenuItem;