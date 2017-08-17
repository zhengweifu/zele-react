import React, { Component, PropTypes } from 'react';

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
}

export default MixinComponent;