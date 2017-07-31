import React, { Component, PropTypes } from 'react';

import { CYAN500, GREY300, GREY500 } from '../styles/colors';

export default class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        };
        // console.log(this.state); //
    }
    static propTypes = {
        placeholder: PropTypes.string,
        height: PropTypes.number,
        value: PropTypes.any,
        onChange: PropTypes.func,
        style: PropTypes.object,
    };

    static defaultProps = {
        placeholder: '',
        height: 20,
        style: {}
    };

    onHandleChange(event) {
        let val = event.target.value;
        // console.log(val);
        this.setState({value: val});

        if(this.props.onChange) {
            this.props.onChange(event, val);
        }
    }

    componentWillReceiveProps(newProps) {
        if(newProps.value !== undefined) {
            this.setState({
                value: newProps.value
            });
        }
    }

    render() {
        let defaultBorderColor = GREY300, activeBorderColor = CYAN500;

        let style = {
            boxSizing: 'border-box',
            color: this.state.active ? CYAN500 : GREY500,
            border: 'none',
            borderBottom: 'solid',
            borderWidth: this.state.active ? 2 : 1,
            borderColor: this.state.active ? activeBorderColor : defaultBorderColor,
            minHeight: 20,
            height: this.props.height,
            width: '100%',
            outline: 'none'
        };
        // console.log(this);
        return (
            <input
                style={Object.assign(style, this.props.style)}
                placeholder={this.props.placeholder}
                value={this.props.value}
                onFocus={e => this.setState({active: true})}
                onBlur={e => this.setState({active: false})}
                onChange={this.onHandleChange.bind(this)}
                />
        );

    }
}




