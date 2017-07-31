import React, { Component, PropTypes } from 'react';

import { GREY100 } from '../styles/colors';

function getStyles(props) {
    return {
        root: {
            margin: 0,
            padding: 0,
            verticalAlign: 'middle',
            display: 'inline-block',
            fill: props.color,
            height: props.height || 24,
            width: props.width || 24,
            userSelect: 'none'
        }
    };
}

export default class SvgIcon extends Component {
    static propTypes = {
        children: PropTypes.node,
        color: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
        viewBox: PropTypes.string,
        style: PropTypes.object
    };

    static defaultProps = {
        color: GREY100,
        viewBox: '0 0 24 24'
    };

    render() {
        const styles = getStyles(this.props);
        return (
            <svg
                viewBox={this.props.viewBox}
                style={Object.assign({}, styles.root, this.props.style)}>
                {this.props.children}
            </svg>
        );
    }
}