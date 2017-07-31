import React, { Component, PropTypes } from 'react';

import { GREY300 } from '../styles/colors';

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: props.activeIndex
    };
  }

  static propTypes = {
    items: PropTypes.array,
    activeIndex: PropTypes.number,
    style: PropTypes.object
  };

  static defaultProps = {
    activeIndex: 0,
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
        <option key={index} value={index}>{item}</option>
      );
    });
  }

  render() {
    const {
      items
    } = this.props;
    const defaultStyle = {
      width: '100%',
      height: 30,
      display: 'block',
      verticalAlign: 'middle',
      padding: '6px 12px',
      border: `1px solid ${GREY300}`,
      backgroundColor: '#fff',
      outline: 'none',
      // WebkitAppearance: 'none',
      // MozAppearance: 'none',
      // appearance: 'none',
      borderRadius: 4
    };
    return (
      <select style={Object.assign({}, defaultStyle, this.props.style)} value={this.state.activeIndex} onChange={e => {

        let index = parseInt(e.target.value);
        let val = items[index];
        this.setState({activeIndex: index});
        if(this.props.onChange) {
          this.props.onChange(e, val, index);
        }
      }}>
        {this.renderItems()}
      </select>
    );
  }
}

export default Select;