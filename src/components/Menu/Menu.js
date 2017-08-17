import React, { Component, PropTypes } from 'react';

import GridList from '../Grid/GridList';

import Label from '../Label';

import { GREY800, GREY50, GREY300, GREY700, BLUE600 } from '../../styles/colors.js';

import { FONT_SIZE_DEFAULT, FONT_FAMILY_DEFAULT } from '../../styles/constants';

import Left from '../Left';

class Menu extends Component {
	constructor(props) {
        super(props);

        this.type = 'Menu';
    }

	static propTypes = {
		mode: PropTypes.oneOf(['horizontal', 'vertical']),
		theme: PropTypes.oneOf(['dark', 'light']),
		children: PropTypes.node,
		bgColor: PropTypes.string,
		itemHeight: PropTypes.number,
		itemActiveBgColor: PropTypes.string,
		itemColor: PropTypes.string,
		itemActiveColor: PropTypes.string,
		itemFontFamily: PropTypes.string,
		itemFontSize: PropTypes.number,
		itemPadding: PropTypes.number
	};

	static defaultProps = {
		mode: 'horizontal',
		theme: 'dark',
		bgColor: GREY800,
		itemHeight: 36,
		itemActiveBgColor: BLUE600,
		itemColor: GREY300,
		itemActiveColor: GREY50,
		itemFontFamily: FONT_FAMILY_DEFAULT,
		itemFontSize: FONT_SIZE_DEFAULT,
		itemPadding: 24

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
		let { children } = this.props;
		const { mode, bgColor } = this.props;

		const rootStyle = {
			backgroundColor: bgColor
		};

		let PCMenuBar = <Left style={rootStyle}>{children}</Left>;
		if(mode === 'vertical') {
			PCMenuBar = <div style={Object.assign({}, rootStyle, {
				display: 'inline-block'
			})}>{children}</div>;
		}

		return PCMenuBar;
	}

}

export default Menu;