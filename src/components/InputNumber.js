import React, { Component, PropTypes } from 'react';

import Input from './Input';

export default class InputNumber extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value : props.value,
        };
    }

    static propTypes = {
        type: PropTypes.oneOf(['INT', 'NUMBER']),
        value: PropTypes.number,
        onChange: PropTypes.func,
        style: PropTypes.object,
    };

    static defaultProps = {
        value: 0,
        type: 'NUMBER',
        floatingLabelText: '',
        style: {}
    };

    onHandleChange(event) {
        let val = event.target.value, _vals = [];

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

        } else if(this.props.type === 'NUMBER') {

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
        } else {
            // todo
        }

        let ovalue = parseFloat(_vals.join(''));

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
        return (
            <Input
                value={this.state.value}
                onChange={this.onHandleChange.bind(this)}
                style={this.props.style}
            />
        );
    }
}




