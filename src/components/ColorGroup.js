import React from 'react';

import ColorItem from './ColorItem';

import GridList from './GridList';

export default class ColorGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentActiveIndex: props.activeIndex
    };
  }

  componentWillReceiveProps(newProps) {
    if(newProps.activeIndex !== undefined) {
      this.state.currentActiveIndex = newProps.activeIndex;
    }
  }

  renderList() {
    return this.props.items.map((item, index) => {
      return (
        <ColorItem
          key={index}
          defaultBgColor={item}
          onClick={(e, color) => {
            let index = this.props.items.findIndex((c) => {
              return c === color;
            });

            this.setState({currentActiveIndex: index});

            if(this.props.onClick) {
              this.props.onClick(e, color, index);
            }
          }}
          active={this.state.currentActiveIndex === index ? true : false}
          width={28}
          height={28}

          style={{marginTop: 5}}
          />
      );
    });
  }

  render() {
    return (
      <GridList cols={10}>
        {this.renderList()}
      </GridList>
    );
  }
}

ColorGroup.defaultProps = {
  items: React.PropTypes.array.isRequired,
  activeIndex: React.PropTypes.number
};
