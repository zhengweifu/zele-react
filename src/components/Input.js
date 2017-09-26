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
        min: PropTypes.number,
        max: PropTypes.number,
        maxLength: PropTypes.number,
        height: PropTypes.number,
        regExp: PropTypes.string,
        onChange: PropTypes.func,
        style: PropTypes.object,
        stype: PropTypes.oneOf(['LINE', 'QUDR']),
        before: PropTypes.node,
        after: PropTypes.node
    };

    static defaultProps = {
        value: '',
        min: -10000,
        max: 10000,
        type: 'STRING',
        floatingLabelText: '',
        height: 25,
        style: {},
        stype: 'LINE',
        maxLength: 100
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

            if(ovalue > this.props.max) ovalue = this.props.max;
            else if(ovalue < this.props.min) ovalue = this.props.min;

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

            if(ovalue > this.props.max) ovalue = this.props.max;
            else if(ovalue < this.props.min) ovalue = this.props.min;
        } else {
            // todo
            if(this.props.regExp) {
                ovalue = ovalue.replace(new RegExp(this.props.regExp, 'g'), '');
            } 

            if(ovalue.length > this.props.maxLength) {
                ovalue = ovalue.substr(0, this.props.maxLength);
            }
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
            verticalAlign: 'middle',
            // vertical-align: middle
            display: 'table-cell',
            outline: 'none',
            padding: '0px 5px',
            transition: 'all 0.3s cubic-bezier(.645,.045,.355,1)'
        };

        const baStyle = Object.assign({width: 1}, style);

        if(this.props.stype === 'QUDR') {
            baStyle.borderTopStyle =  'solid';
            baStyle.borderBottomStyle = 'solid';
        }

        const bStyle = Object.assign({}, baStyle);

        const aStyle = Object.assign({}, baStyle);

        if(this.props.stype === 'QUDR') {
            bStyle.borderLeftStyle = 'solid';
            bStyle.borderTopLeftRadius = 4;
            bStyle.borderBottomLeftRadius = 4;

            aStyle.borderRightStyle = 'solid';
            aStyle.borderTopRightRadius = 4;
            aStyle.borderBottomRightRadius = 4;
        }

        style.width = '100%';

        if(this.props.stype === 'LINE') {
            style.borderStyle = 'none';
            style.borderBottomStyle = 'solid';
        } else if(this.props.stype === 'QUDR') {
            style.borderStyle = 'solid';
            if(!this.props.before && !this.props.after) {
                style.borderRadius = 4;
            } else if(!this.props.before && this.props.after) {
                style.borderTopLeftRadius = 4;
                style.borderBottomLeftRadius = 4;
            } else if(this.props.before && !this.props.after) {
                style.borderTopRightRadius = 4;
                style.borderBottomRightRadius = 4;
            }
            
        }

        const rootStyle = {
            width: '100%',
            display: 'table'
        };


        const beforeElement = this.props.before ? <span style={bStyle}>{this.props.before}</span> : '';

        const afterElement = this.props.after ? <span style={aStyle}>{this.props.after}</span> : '';

        return (
            <span style={rootStyle}>
                {beforeElement}
                <input
                    style={Object.assign(style, this.props.style)}
                    placeholder={this.props.placeholder}
                    value={this.state.value}
                    onFocus={e => this.setState({active: true})}
                    onBlur={e => this.setState({active: false})}
                    onChange={this.onHandleChange.bind(this)}
                    />
                {afterElement}
            </span>
        );
    }
}




