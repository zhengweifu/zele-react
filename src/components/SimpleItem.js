import React, { Component, PropTypes} from 'react';

import { BLUE600, GREY300 } from '../styles/colors';

import { FONT_SIZE_DEFAULT, FONT_FAMILY_DEFAULT } from '../styles/constants';

export default class SimpleItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: props.active
    };
  }

  onHandleClick(event) {
    this.setState({active: true});
    if(this.props.onClick) {
      let other = this.props.other ? this.props.other : null;
      this.props.onClick(event, this.props.title);
    }
  }

  componentWillReceiveProps(newProps) {
    if(newProps.active !== undefined) {
      this.state.active = newProps.active;
    }
  }

  render() {
    let border = 'none';
    if(this.state.active && this.props.activeColor) {
      border = `1px solid ${this.props.activeColor}`;
    } else if(this.props.defaultBorderColor) {
      border = `1px solid ${this.props.defaultBorderColor}`;
    }

    return (
      <div
        onClick={this.onHandleClick.bind(this)}
        style={{
          // padding: this.state.active || this.props.defaultBorderColor ? 4 : 5,
          borderRadius: this.props.borderRadius,
          textAlign: 'center',
          border: border
        }}>
        <div style={{
          padding: 4,
          // display: 'inline-block'
        }}>
          {this.props.imgSrc ? <img src={this.props.imgSrc} style={{width: '100%', height: 'auto', verticalAlign: 'top'}}/> : ''}
          {this.props.children}
        </div>
        {this.props.title ? <div style={{
          padding: 8,
          fontSize: FONT_SIZE_DEFAULT,
          fontFamily: FONT_FAMILY_DEFAULT,
          borderTop: border,
          overflow: 'hidden', 
          textOverflow: 'ellipsis', 
          whiteSpace: 'nowrap'
        }}>{this.props.title}</div> : ''}
      </div>
    );
  }
}

SimpleItem.defaultProps = {
  active: false,
  activeColor: BLUE600,
  defaultBorderColor: GREY300,
  borderRadius: 4
};

SimpleItem.propTypes = {
  active: PropTypes.bool,
  defaultBorderColor: PropTypes.string,
  activeColor: PropTypes.string,
  title: PropTypes.string,
  borderRadius: PropTypes.number,
  imgSrc: PropTypes.string,
  onClick: PropTypes.func
};
