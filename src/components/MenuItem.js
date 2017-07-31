import React, { Component, PropTypes } from 'react';

import Label from './Label';

class MenuItem extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	active: false,
        };
    }
	static propTypes = {
		label: PropTypes.string,
		children: PropTypes.node,
		defaultBgColor: PropTypes.string,
		activeBgColor: PropTypes.string,
		onClick: PropTypes.func,
		textColor: PropTypes.string,
		fontFamily: PropTypes.string,
		fontSize: PropTypes.number
	};

	static defaultProps = {
		label: 'MenuItem',
		defaultBgColor: '#666666',
		activeBgColor: '#12edff',
		textColor: '#cccccc',
		fontFamily: '"Microsoft YaHei",arial,Georgia,Serif',
		fontSize: 16
	};

	render() {
		const { label, children, defaultBgColor, activeBgColor, textColor, fontFamily, fontSize, onClick } = this.props;

		let cElements = children !== undefined ? children : 
			<Label content={label} fontFamily={fontFamily} fontSize={fontSize} color={textColor} height={30}/>;

		return <div style={{
				backgroundColor: this.state.active ? activeBgColor : defaultBgColor,
				padding: '0px 10px'
			}} onClick={e => {
				if(onClick) {
					onClick();
				}
			}} onMouseOver={e => {
				this.setState({active: true});
			}} onMouseOut={e => {
				this.setState({active: false});
			}}>
			{cElements}
		</div>;
	}

}

export default MenuItem;