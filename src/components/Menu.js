import React, { Component, PropTypes } from 'react';

import GridList from './GridList';

import Label from './Label';

import Popover from './Popover';

import Is from '../utils/Is';

class Menu extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	activeIndex: -1,
        	open: false
        };
    }

	static propTypes = {
		children: PropTypes.node,
		logo: PropTypes.string,
		items: PropTypes.array.isRequired,
		eachWidth: PropTypes.number,
		height: PropTypes.number,
		activeBgColor: PropTypes.string,
		textColor: PropTypes.string,
		onItemClick: PropTypes.func,
		fontFamily: PropTypes.string,
		fontSize: PropTypes.number
	};

	static defaultProps = {
		eachWidth: 80,
		height: 50,
		activeBgColor: '#12edff',
		textColor: '#cccccc',
		fontFamily: '"Microsoft YaHei",arial,Georgia,Serif',
		fontSize: 16
	};

	render() {
		let { children } = this.props;
		const { textColor, activeBgColor, fontSize, fontFamily, items, height, eachWidth, onItemClick } = this.props;

		if(!Is(children, 'Array')) {
			children = [children];
		}

		const itemElements = items.map((item, index) => {
			return <div key={`navbar_item_${index}`} style={{
				height: height,
				backgroundColor: this.state.activeIndex == index ? activeBgColor : 'transparent',
			}} onClick={e => {
				this.setState({activeIndex: index, open: true});
				if(onItemClick) {
					onItemClick(e, item, index);
				}
			}}><Label style={{padding: '0px 10px'}} content={item} fontFamily={fontFamily} fontSize={fontSize} color={textColor} height={height}/></div>;
		});

		const cElements = children.map((child, index) => {
			// console.log(child);
			const childName = child.type.name;
			// console.log(child.props['data-pid']);
			if(child.props['data-pid'] === this.state.activeIndex) {
				return child;
			}
		});

		const PCMenuBar = <div style={{
				width: eachWidth * itemElements.length
			}}><GridList cols={itemElements.length} center={true} gutter={0}>
				{itemElements}
			</GridList></div>;

		const PCPopoverStyle = {
			backgroundColor: 'transparent',
			border: 'none',
			left: this.state.activeIndex * eachWidth,
			borderTop: `2px solid ${activeBgColor}`,
			width: 'parent',
			minWidth: 150,
			borderRadius: 0,
			padding: 0,
			boxShadow: 'none',
			display: 'inline-block'
		};

		const PCMenuItem = <Popover open={this.state.open} isUseSlideAnimation={true} maxHeight={250} outClickClose={false} style={PCPopoverStyle} onRequestClose={e => this.setState({activeIndex: -1, open: false})}>
				{cElements}
			</Popover>;

		const PCElement = <div>
			{PCMenuBar}
			{PCMenuItem}
		</div>;
		
		return PCElement;
	}

}

export default Menu;