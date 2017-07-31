import React, { Component, PropTypes } from 'react';

// import { HardwareKeyboardArrowDown, HardwareKeyboardArrowRight} from 'material-ui/svg-icons';
import SvgIcon from './SvgIcon';

import { keyboardArrowDown, keyboardArrowRight } from '../svgIcons/google/Hardware';

import { GREY300, GREY200 } from '../styles/colors';

import Paper from './Paper';

export default class PopupPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open,
      scaleY: props.open ? 1 : 0,
      bodyHeight: props.bodyHeight
    };
  }

  componentWillReceiveProps(newProps) {
    if(newProps.open !== undefined) {
      this.setState({open: newProps.open, scaleY: newProps.open ? 1 : 0});
    }
  }

  render() {
    
    let style = {
      position: 'relative',
      // height: this.state.open ? 'auto' : this.props.headerHeight + 2 * this.props.padding,
      // boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.05)',
      zIndex: this.props.zDepth
    };

    let headerStyle = {
      boxSizing: 'border-box',
      border: `1px solid ${this.props.borderColor}`,
      height: this.props.headerHeight + 2 * this.props.padding,
      backgroundColor: this.props.headerBgColor,
      borderTopLeftRadius: this.props.radius,
      borderTopRightRadius: this.props.radius,
      borderBottomLeftRadius: this.state.open ? 0 : this.props.radius,
      borderBottomRightRadius: this.state.open ? 0 : this.props.radius,
      fontWeight: 'bold',
      fontSize: 16,
      padding: this.props.padding
    };
    let bodyStyle = {
      boxSizing: 'border-box',
      borderLeft: `1px solid ${this.props.borderColor}`,
      borderRight: `1px solid ${this.props.borderColor}`,
      borderBottom: this.state.open ? `1px solid ${this.props.borderColor}` : 'none',
      broderTop: 'none',
      
      
      backgroundColor: this.props.bodyBgColor,
      borderBottomLeftRadius: this.props.radius,
      borderBottomRightRadius: this.props.radius,
      overflow: this.props.overflow,
      height: this.props.bodyHeight + 2 * this.props.padding,
      // display: this.state.scaleY > 0 ? 'block' : 'none',
      // transform: `scaleY(${this.state.scaleY})`,
      display: this.state.open ? 'block' : 'none',
      padding: this.state.open ? this.props.padding : 0,
      // opacity: this.state.open ? 1 : 0,
      
      // width: this.state.open ? '100%' : 0,
      // transform: this.state.open ? 'scaleY(1)' : 'scaleY(0)',
      transformOrigin: '0 0',
      // transition: 'all 0.3s ease-in-out'
    };

    const arrowStyle = {
      position: 'absolute',
      right: 0,
      top: this.props.padding,
      zIndex: this.props.zDepth + 1
    };
    return (
      <Paper style={Object.assign(style, this.props.style)}>
        <div style={Object.assign(headerStyle, this.props.headerStyle)} onClick={e => {
          // this.setState({open: !this.state.open});
          
          let open = this.state.open;
          this.setState({open: !open});
          // let scaleY = this.state.scaleY;

          // console.log('cx***: ', this.state);
          // // let step = Math.floor(this.props.bodyHeight / 10);
          // let step = 0.01;
          // let timer = setInterval(() => {
          //   console.log(open, scaleY);
          //   if(open) {
          //     if(scaleY < step) {
          //       clearInterval(timer);
          //     } else {
          //       scaleY -= step;
          //       this.setState({scaleY: scaleY});
          //     }
          //   } else {
          //     if(scaleY > (1 - step)) {
          //       clearInterval(timer);
          //     } else {
          //       scaleY += step;
          //       // console.log('dfefe');
          //       this.setState({scaleY: scaleY});
          //     }
              
          //   }
          // }, 0);

          if(this.props.onClick) {
            this.props.onClick(e);
          }

          // e.preventDefault();
          // e.stopPropagation();
        }}>{this.props.label}
          {this.state.open ? <SvgIcon style={arrowStyle} color='#000'><path d={keyboardArrowDown}/></SvgIcon> : <SvgIcon style={arrowStyle} color='#000'><path d={keyboardArrowRight}/></SvgIcon>}
        </div>
        <div style={Object.assign(bodyStyle, this.props.bodyStyle)}>
          {this.props.children}
        </div>
      </Paper>
    );
  }
}

PopupPanel.defaultProps = {
  open: false,
  overflow: 'auto',
  borderColor: GREY300,
  headerHeight: 26,
  headerBgColor: GREY200,
  bodyHeight: 100,
  bodyBgColor: '#fff',
  radius: 2,
  padding: 5,
  style: {},
  headerStyle: {},
  bodyStyle: {},
  zDepth: 1,
};

PopupPanel.propTypes = {
  open: PropTypes.bool,
  overflow: PropTypes.string,
  label: PropTypes.string.isRequired,
  borderColor: PropTypes.string,
  headerHeight: PropTypes.number,
  headerBgColor: PropTypes.string,
  bodyHeight: PropTypes.number,
  bodyBgColor: PropTypes.string,
  radius: PropTypes.number,
  padding: PropTypes.number,
  style: PropTypes.object,
  headerStyle: PropTypes.object,
  bodyStyle: PropTypes.object,
  zDepth: PropTypes.number,
};
