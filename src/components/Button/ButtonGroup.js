import React, { Component, PropTypes } from 'react';
import Left from '../Left';

import Is from '../../utils/Is';

class ButtonGroup extends Component {
	constructor(props) {
		super(props);

		this.type = 'ButtonGroup';
	}

	static propTypes = {
		borderRadius: PropTypes.number,
		shadow: PropTypes.bool
	};

	static defaultProps = {
		borderRadius: 4,
		shadow: true
	};

	render() {
		let children = this.props.children;
		if(!Is(children, 'Array')) {
			children = [children];
		}

		const items = children.map((item, index) => {
			const _style = {
				borderTopLeftRadius: 0,
				borderTopRightRadius: 0,
				borderBottomRightRadius: 0,
				borderBottomLeftRadius: 0,
				borderLeftStyle: 'solid'
			};

			if(index === 0) {
				_style.borderTopLeftRadius = this.props.borderRadius;
				_style.borderBottomLeftRadius = this.props.borderRadius;
			} else if(index === children.length - 1) {
				_style.borderTopRightRadius = this.props.borderRadius;
				_style.borderBottomRightRadius = this.props.borderRadius;
			}

			let showLeftBorder = true;

			if(index > 0) {
				showLeftBorder = false;
				// if(item.props.type === 'default') {
					// _style.borderLeft = '1px solid rgb(200, 200, 200)';
				// } else {
					// _style.borderLeft = '1px solid #eee';
				// }
				_style.borderLeftStyle = 'none';
			}

			// console.log(showLeftBorder);

			return React.cloneElement(item, {
				key: index, 
				style: _style,
				// showLeftBorder: showLeftBorder,
				shadow: false
			});
		});

		return <Left style={{
			boxShadow: this.props.shadow ? 'rgba(0, 0, 0, 0.1) 0px 2px 3px' : 'none',
			display: 'inline-block',
			verticalAlign: 'top' 
		}}>{items}</Left>

	}

}

export default ButtonGroup;