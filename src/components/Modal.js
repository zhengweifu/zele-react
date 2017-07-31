import React, { Component, PropTypes } from 'react';

import Overlay from './Overlay';

import Paper from './Paper';

import { OVERLAY_ZINDEX, MODAL_ZINDEX, MODAL_MAX_WIDTH } from '../styles/constants';

import { CYAN500, GREY300, PINK300 } from '../styles/colors';

import { FONT_SIZE_DEFAULT, FONT_FAMILY_DEFAULT } from '../styles/constants';

import IconButton from './IconButton';

import SvgIcon from './SvgIcon';

import { gClear } from '../svgIcons/google/Content';

require('../csses/clearfix.css');

import RaisedButton from './RaisedButton';

function getStyles(props, state) {
	const padding = 20;
	return {
		modal: {
			position: 'fixed',
			top: 0,
			left: 0,
			right:0,
			display: state.open ? 'block' : 'none',
			width: '75%',
			maxWidth: MODAL_MAX_WIDTH,
			margin: '80px auto',
			zIndex: MODAL_ZINDEX
		},

		overlay: {
			zIndex: OVERLAY_ZINDEX
		},

		modalHeader: {
			padding: padding,
			borderBottom: `1px solid ${props.splitColor}`,
			position: 'relative',
			color: props.titleColor,
			fontFamily: props.fontFamily,
			fontSize: props.titleFontSize
		},

		close: {
			position: 'absolute',
			top: 0,
			right: 0,
			padding: 16
		},

		modalBody: {
			padding: padding
		},

		modalFooter: {
			padding: `8px ${padding}px`,
			borderTop: `1px solid ${props.splitColor}`,
		}
	};
}

export default class Modal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: props.open
		};
	}

	static propTypes = {
		children: PropTypes.node,
		open: PropTypes.bool,
		overlayStyle: PropTypes.object,
		style: PropTypes.object,
		title: PropTypes.string,
		titleColor: PropTypes.string,
		splitColor: PropTypes.string,
		fontFamily: PropTypes.string,
		titleFontSize: PropTypes.number,
		useActions: PropTypes.bool,
		actions: PropTypes.node,
		onOkClick: PropTypes.func,
		onCancelClick: PropTypes.func
	};

	static defaultProps = {
		open: false,
		overlayStyle: {},
		style: {},
		useActions: true,
		splitColor: GREY300,
		titleColor: GREY300,
		fontFamily: FONT_FAMILY_DEFAULT,
		titleFontSize: FONT_SIZE_DEFAULT
	};

	componentWillReceiveProps(newProps) {
		if(newProps !== undefined && newProps.open !== this.state.open) {
			this.setState({open: newProps.open});
		}
	}

	render() {
		let { overlayStyle, style, title, actions, children, useActions, onOkClick, onCancelClick } = this.props;

		if(React.Children.count(actions) <= 0 && useActions) {
			actions = [
				<RaisedButton label='取消' style={{marginRight: 10, padding: '0px 20px'}} bgColor={PINK300} onClick={e => {
					this.setState({open : false});
					if(onCancelClick) {
						onCancelClick(e, false);
					}
				}}/>,
				<RaisedButton label='确定' style={{padding: '0px 20px'}} bgColor={CYAN500} onClick={e => {
					if(onOkClick) {
						onOkClick(e);
					}
				}}/>
			];
		} 

		const styles = getStyles(this.props, this.state);

		const footer = actions && useActions ? 
				<div style={styles.modalFooter}>
					<div className='clearfix'><div style={{float: 'right'}}>
						{ React.Children.toArray(actions) }
					</div></div>
				</div> : '';

		const header = title && title.length > 0 ?
				<div style={styles.modalHeader}>
					{title}
					<div style={styles.close} onClick={e => {
						this.setState({open: false});
						if(onCancelClick) {
							onCancelClick(e, false);
						}
					}}>
						<IconButton color={GREY300} hoverColor={PINK300} padding={0} icon={<SvgIcon>
							<path d={gClear}/>
						</SvgIcon>}/>
					</div>
				</div> : '';
		return (
			<div>
				<div style={styles.modal}>
					<Paper style={style}>
						{header}
						<div style={styles.modalBody}>{children}</div>
						{footer}
					</Paper>
				</div>
				<Overlay show={this.state.open} style={Object.assign({}, styles.overlay, overlayStyle)}/>
				
			</div>
		);
	}
}