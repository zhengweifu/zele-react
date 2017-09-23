import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { GREY300, GREY800, BLUE600 } from '../styles/colors';

import Label from './Label';

import SvgIcon from './SvgIcon';

import { gKeyboardArrowRight,  gKeyboardArrowDown } from '../svgIcons/google/Hardware';

import Popover from './Popover';

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      activeIndex: props.activeIndex
    };
  }

  static propTypes = {
    items: PropTypes.array,
    activeIndex: PropTypes.number,
    height: PropTypes.number,
    borderRadius: PropTypes.number,
    activeColor: PropTypes.string,
    fullWidth: PropTypes.bool,
    stype: PropTypes.oneOf(['LINE', 'QUDR']),
    style: PropTypes.object,
    onChange: PropTypes.func
  };

  static defaultProps = {
    activeIndex: 0,
    height: 30,
    borderRadius: 4,
    activeColor: BLUE600,
    fullWidth: false,
    stype: 'LINE',
    style: {}
  };

  componentWillReceiveProps(nextProps) {
    if(nextProps.activeIndex !== undefined) {
      this.setState({activeIndex: nextProps.activeIndex});
    }
  }

  renderItems() {
    return this.props.items.map((item, index) => {
      return (
        <div key={index} style={{
          padding: '0 4px',
          backgroundColor: this.state.activeIndex === index ? this.props.activeColor : 'transparent'
        }} onClick={e => {
          this.setState({activeIndex: index, open: false});
          if(this.props.onChange) {
            this.props.onChange(e, item, index);
          }
        }}><Label content={item} color={GREY800} height={25}/></div>
      );
    });
  }

  render() {
    const {
      items, height, borderRadius, fullWidth, activeColor, stype
    } = this.props;

    const mpadding = 4, iconSize = 18, borderWidth = 1, cHeight = stype === 'QUDR' ? height - borderWidth * 2 : height - borderWidth;

    const defaultStyle = {
      position: 'relative',
      boxSizing: 'border-box',
      // width: '100%',
      height: height,
      padding: `0 ${mpadding * 2 + iconSize}px 0 ${mpadding}px`,
      backgroundColor: '#fff',
      borderRadius: stype === 'QUDR' ? borderRadius : 0
    };
    console.log(stype);
    if(stype === 'LINE') {
      defaultStyle.borderBottom = `${borderWidth}px solid ${this.state.open ? activeColor : GREY300}`;
    } else {
      defaultStyle.border = `${borderWidth}px solid ${this.state.open ? activeColor : GREY300}`;
    }

    const iconStyle = {
      position: 'absolute',
      top: 0,
      right: mpadding,
      lineHeight: `${cHeight}px`
    }

    return <div style={{
      display: fullWidth ? 'block' : 'inline-block'
    }}>
      <div style={Object.assign({}, defaultStyle, this.props.style)} onClick={e => {
        this.setState({open: !this.state.open});
      }} ref={ref => this.element = ReactDOM.findDOMNode(ref)}>
        <Label color={this.state.open ? activeColor : GREY800} height={cHeight} content={items[this.state.activeIndex]}/>
        <span style={iconStyle}><SvgIcon color={this.state.open ? activeColor : GREY800} width={iconSize} height={iconSize}><path d={this.state.open ? gKeyboardArrowDown : gKeyboardArrowRight} /></SvgIcon></span>
      </div>
      <Popover otherElements={[this.element]} open={this.state.open} style={{
        marginTop: 4
      }} isUseSlideAnimation={true} maxHeight={250} outClickClose={false} onRequestClose={e => this.setState({open: false})}>
        {this.renderItems()}
      </Popover>
    </div>
  }
}

export default Select;