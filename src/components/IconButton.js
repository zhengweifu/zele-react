import React, { Component, PropTypes } from 'react';

import { lighten } from '../utils/colorManipulator';

import IsMobile from '../utils/IsMobile';

const isMobile = IsMobile.Any();

function getStyles(props) {
	const { padding, fullWidth } = props;
	return {
		root: {
			display: fullWidth ? 'block' : 'inline-block',
			textAlign: 'center',
			padding: padding
		}
	};
}

class IconButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hovered: false,
            toggled: props.toggled
        };
    }

	static propTypes = {
		icon: PropTypes.node.isRequired,
		padding: PropTypes.number,
		style: PropTypes.object,
		color: PropTypes.string,
		hoverColor: PropTypes.string,
		toggle: PropTypes.bool,
		toggled: PropTypes.bool,
		toggledColor: PropTypes.string,
		isLimitClickUp: PropTypes.bool,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
        onClick: PropTypes.func,
        fullWidth: PropTypes.bool
	};

	static defaultProps = {
		padding: 5,
		style: {},
		toggle: false,
		toggled: false,
		fullWidth: false,
		isLimitClickUp: false
	};

    handleMouseEnter(e) {
		if(!isMobile) {
			this.setState({hovered: true});
			if(this.props.onMouseEnter) {
				this.props.onMouseEnter(e);
			}
		}
	}

	handleMouseLeave(e) {
		if(!isMobile) {
			this.setState({hovered: false});
			if(this.props.onMouseLeave) {
				this.props.onMouseLeave(e);
			}
		}
	}

    componentWillReceiveProps(newProps) {
        if(newProps.toggled !== undefined) {
            this.setState({
                toggled: newProps.toggled
            });
        }
    }

	render() {
		const {
			icon,
			style,
			color,
			hoverColor,
			toggle,
			toggledColor,
			isLimitClickUp,
			onClick
		} = this.props;

		const styles = getStyles(this.props); 

		let iconColor = toggle && this.state.toggled ? toggledColor ? toggledColor : lighten(color, 0.2) : color;
		iconColor = this.state.hovered ? ( hoverColor ? hoverColor : lighten(color, 0.5) ) : iconColor;
		// console.log(this.state.toggled);
		const iconElement = React.cloneElement(icon, {
			color: iconColor
		});

		return (
			<div 
				style={Object.assign({}, styles.root, style)}
				onMouseEnter={this.handleMouseEnter.bind(this)}
                onMouseLeave={this.handleMouseLeave.bind(this)}
                onClick={e => {
                	// console.log(this.state.toggled);
                    if(toggle) {
                    	if(!isLimitClickUp || !this.state.toggled) {
                    		this.setState({toggled: !this.state.toggled});
                    	}
                        
                    }
					if(onClick) {
						onClick(e);
					}
                }}>
				{iconElement}
			</div>
		);
	}
}

export default IconButton;