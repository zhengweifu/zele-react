import React, { Component, PropTypes} from 'react';

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
          padding: this.state.active || this.props.defaultBorderColor ? 4 : 5,
          textAlign: 'center',
          border: border
        }}>
        {this.props.children}
        {this.props.title ? <div style={{fontSize: 12}}>{this.props.title}</div> : ''}
      </div>
    );
  }
}

SimpleItem.defaultProps = {
  active: false,
  activeColor: '#0f0'
};

SimpleItem.propTypes = {
  active: PropTypes.bool,
  defaultBorderColor: PropTypes.string,
  activeColor: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func
};
