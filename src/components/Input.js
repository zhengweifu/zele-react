import React, { Component, PropTypes } from 'react';

import { BLUE600, GREY300, GREY500 } from '../styles/colors';

export default class Input extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value : props.value,
            active: false
        };
    }

    static propTypes = {
        type: PropTypes.oneOf(['INT', 'FLOAT', 'STRING']),
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        height: PropTypes.number,
        onChange: PropTypes.func,
        style: PropTypes.object,
        stype: PropTypes.oneOf(['LINE', 'QUDR']),
    };

    static defaultProps = {
        value: 0,
        type: 'STRING',
        floatingLabelText: '',
        height: 25,
        style: {},
        stype: 'LINE'
    };

    onHandleChange(event) {
        let val = event.target.value, _vals = [];

        let ovalue = val;

        if(val == '') {
            val = '0';
        }

        if(this.props.type === 'INT') {

            val = val.replace(/[^0-9\-]/g,'');
            let isNegative = false;
            // remove - (ex before)
            let _val = val.replace(/\-/g, '');
            if(val[0] === '-') {
                isNegative = true;
            }

            let isAdd = false;
            let isZero = true;
            for(let i = 0; i < _val.length; i ++) {
                if(!isAdd && _val[i] != 0) {
                    isAdd = true;
                    isZero = false;
                }

                if(isAdd) {
                    _vals.push(_val[i]);
                }
            }
            // console.log()
            if(isZero && _val.length > 0) {
                _vals.push(0);
            } else {
                if(isNegative) { // 插入负号
                    _vals.splice(0, 0, '-');
                }
            }

            ovalue = parseInt(_vals.join(''));

        } else if(this.props.type === 'FLOAT') {

            val = val.replace(/[^0-9\.\-]/g,'');

            // remove - (ex before)
            let _val = val.replace(/\-/g, '');
            if(val[0] === '-') {
                _val = '-' + _val;
            }

            // remove . (only one)
            let isDot = false;
            for(let i = 0; i < _val.length; i++) {
                if(_val[i] === '.') {
                    if(!isDot) {
                        _vals.push(_val[i]);
                        isDot = true;
                    }
                } else {
                    _vals.push(_val[i]);
                }
            }

            ovalue = parseFloat(_vals.join(''));
        } else {
            // todo
        }


        this.setState({value: ovalue});

        if(ovalue == this.state.value) {
            return;
        }

        if(this.props.onChange) {
            this.props.onChange(event, ovalue);
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
        // return (
        //     <Input stype={this.props.stype}
        //         value={this.state.value}
        //         onChange={this.onHandleChange.bind(this)}
        //         style={this.props.style}
        //     />
        // );

        let defaultBorderColor = GREY300, activeBorderColor = BLUE600;

        let style = {
            boxSizing: 'border-box',
            color: this.state.active ? BLUE600 : GREY500,
            borderWidth: 1,
            borderColor: this.state.active ? activeBorderColor : defaultBorderColor,
            minHeight: 20,
            height: this.props.height,
            width: '100%',
            outline: 'none',
            padding: '0px 5px',
            transition: 'all 0.3s cubic-bezier(.645,.045,.355,1)'
        };

        if(this.props.stype === 'LINE') {
            style.borderStyle = 'none';
            style.borderBottomStyle = 'solid';
        } else if(this.props.stype === 'QUDR') {
            style.borderStyle = 'solid';
            style.borderRadius = 4;
        }

        return (
            <input
                style={Object.assign(style, this.props.style)}
                placeholder={this.props.placeholder}
                value={this.state.value}
                onFocus={e => this.setState({active: true})}
                onBlur={e => this.setState({active: false})}
                onChange={this.onHandleChange.bind(this)}
                />
        );
    }
}




