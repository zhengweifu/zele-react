import React, { Component, PropTypes } from 'react';

class ListCloseSwitch extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	isList: props.isList
        };
    }

	static propTypes = {
        isList: PropTypes.bool,
        color: PropTypes.string,
		height: PropTypes.number,
		onClick: PropTypes.func
	};

	static defaultProps = {
        isList: true,
		height: 100,
		color: '#ff8d5c'
	};

    componentWillReceiveProps(newProps) {
        if(newProps.isList !== this.state.isList ) {
            this.setState({isList: newProps.isList});
        }
    }

	render() {
		const { isList, height, color, onClick} = this.props;

        const menuLineWidth = 24, menuLineHeight = 2, space = 5;

        const menuItem = {
            position: 'relative',
            height: height,
            width: menuLineWidth,
            padding: '0px 5px'
            // transform: 'rotate(45deg)'
        };

        const menuItemLine = {
            position: 'absolute',
            width: menuLineWidth,
            height: menuLineHeight,
            backgroundColor: color,
            transition: 'transform 300ms ease-out'
        };

        const sin45 = !this.state.isList ? 0.8509 : 0;
        const cos45 = !this.state.isList ? 0.8509 : 1;
		
		return <div style={menuItem} onClick = {e => {
            if(onClick) {
                onClick(e, !this.state.isList);
            }
            this.setState({isList: !this.state.isList});
        }}>
            <div style={Object.assign({}, menuItemLine, {
                transform: `matrix(${cos45}, ${-sin45}, ${sin45}, ${cos45}, 0, ${this.state.isList ? height / 2 - menuLineHeight - space : (height - menuLineHeight) / 2})`
            })}></div>
            <div style={Object.assign({}, menuItemLine, {
                transform: `matrix(${cos45}, ${sin45}, ${-sin45}, ${cos45}, 0, ${this.state.isList ? height / 2 + space : (height - menuLineHeight) / 2})`
            })}></div>
        </div>;
	}

}

export default ListCloseSwitch;