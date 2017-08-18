import React, { Component, PropTypes } from 'react';

import GridList from '../Grid/GridList';

import Label from '../Label';

import { GREY800, GREY100, GREY50, GREY300, GREY900, BLUE600 } from '../../styles/colors.js';

import { FONT_SIZE_DEFAULT, FONT_FAMILY_DEFAULT } from '../../styles/constants';

import Left from '../Left';

import cloneElements from './cloneElements';

class Menu extends Component {
	constructor(props) {
        super(props);

        this.state = {
        	activeLevelIndex: props.activeLevelIndex,
        	activeParentIndex: props.activeParentIndex,
        	activeMemberIndex: props.activeMemberIndex
        };

        this.type = 'Menu';
    }

	static propTypes = {
		mode: PropTypes.oneOf(['horizontal', 'vertical']),
		theme: PropTypes.oneOf(['dark', 'light', 'custom']),
		children: PropTypes.node,
		bgColor: PropTypes.string,
		activeLevelIndex: PropTypes.number,
		activeParentIndex: PropTypes.number,
		activeMemberIndex: PropTypes.number,
		itemHeight: PropTypes.number,
		subBgColor: PropTypes.string,
		itemActiveBgColor: PropTypes.string,
		itemColor: PropTypes.string,
		itemFontFamily: PropTypes.string,
		itemFontSize: PropTypes.number,
		itemPadding: PropTypes.number
	};

	static defaultProps = {
		mode: 'horizontal',
		theme: 'dark',
		activeLevelIndex: -1,
		activeParentIndex: -1,
		activeMemberIndex: -1,
		bgColor: GREY800,
		subBgColor: GREY900,
		itemHeight: 36,
		itemActiveBgColor: BLUE600,
		itemColor: GREY300,
		itemFontFamily: FONT_FAMILY_DEFAULT,
		itemFontSize: FONT_SIZE_DEFAULT,
		itemPadding: 20

	};

	static childContextTypes = {
		component: PropTypes.any
	}

	getChildContext() {
		return {
			component: this
		};
	}

	render() {
		let { children, bgColor } = this.props;
		const { mode, theme } = this.props;

		if(theme === 'dark') {
			bgColor = GREY800;
		} else if(theme === 'light') {
			bgColor = GREY100;
		}

		const rootStyle = {
			backgroundColor: bgColor
		};

		let _children = cloneElements(children)

		let PCMenuBar = <Left style={rootStyle}>{_children}</Left>;
		if(mode === 'vertical') {
			PCMenuBar = <div style={Object.assign({}, rootStyle, {
				display: 'inline-block'
			})}>{_children}</div>;
		}

		return PCMenuBar;
	}

}

export default Menu;