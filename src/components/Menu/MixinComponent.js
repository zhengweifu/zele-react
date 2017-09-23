import React, { Component, PropTypes } from 'react';

import { GREY800, GREY600, GREY400,  GREY50, GREY300, GREY900, BLUE600, BLUE100 } from '../../styles/colors.js';

class MixinComponent extends Component {
	static contextTypes = {
		component: PropTypes.any
	};

	static childContextTypes = {
		component: PropTypes.any
	}

	getChildContext() {
		return {
			component: this
		};
	}

	parent() {
		return this.context.component;
	}

	indexPath() {
		let path = [this.props.index];
		let parent = this.parent();

		while (parent.type !== 'Menu') {
			if (parent.props.index) {
				path.unshift(parent.props.index);
			}

			parent = parent.parent();
		}

		return path;
	}

	root() {
		let index = 1;
		let parent = this.parent();
		
		while (parent.type !== 'Menu') {
			parent = parent.parent();
			index ++;
		}

		return {component: parent, index: index};
	}

	getMenuProps() {
		const root = this.root();
		let result = {
			component: root.component, 
			index: root.index
		};
		result.itemHeight = result.component.props.itemHeight;
		result.itemActiveBgColor = result.component.props.itemActiveBgColor;
		result.itemColor = result.component.props.itemColor;
		result.itemFontFamily = result.component.props.itemFontFamily;
		result.itemFontSize = result.component.props.itemFontSize;
		result.itemPadding = result.component.props.itemPadding;
		result.subBgColor = result.component.props.subBgColor;
		result.mode = result.component.props.mode;

		const theme = result.component.props.theme;

		if(theme === 'dark') {
			result.subBgColor = GREY900;
			result.itemActiveBgColor = BLUE600;
			result.itemColor = GREY300;
		} else if(theme === 'light'){
			result.subBgColor = GREY50;
			result.itemActiveBgColor = BLUE600;
			result.itemColor = GREY800;
			result.borderColor = GREY300;
		}

		return result;
	}
}

export default MixinComponent;