import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { GREY300, GREY800, BLUE600 } from '../styles/colors';

import Label from './Label';

// import Left from './Left';

import Float from './Float';

import SvgIcon from './SvgIcon';

import { toHSV, HSVToString, HSVToRGB255 } from '../utils/colorManipulator';

import { gKeyboardArrowRight,  gKeyboardArrowDown } from '../svgIcons/google/Hardware';

import Popover from './Popover';

import GridList from './Grid/GridList';

import Input from './Input';

import VerticalSeparation from './VerticalSeparation';

import RaisedButton from './Button/RaisedButton';

const caWidth = 215, caHeight = 180, tpadding = 6, sliderWidth = 16, sphereSize = 6;

class ColorPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            value: props.value,
            collectValue: props.value,
            r: 0, g: 0, b: 0,
            h: 0, s: 0, v: 0,
            hex: '000000'
        };
    }

    static propTypes = {
        height: PropTypes.number,
        borderRadius: PropTypes.number,
        activeColor: PropTypes.string,
        fullWidth: PropTypes.bool,
        style: PropTypes.object,
        value: PropTypes.string,
        onChange: PropTypes.func
    };

    static defaultProps = {
        height: 32,
        borderRadius: 4,
        value: '#fff',
        activeColor: BLUE600,
        fullWidth: false,
        style: {}
    };

    getHex(r, g, b) {
        let hex = '';

        for(let e of [r, g, b]) {
            e = Number(e).toString(16);
            if(e.length == 1) {
                e += e;
            }
            hex += e;
        }
        return hex;
    }

    setParasFromColor(color) {
        // console.log(color);
        const hsv = toHSV(color);
        const rgb = HSVToRGB255(hsv.h, hsv.s, hsv.v);
        return Object.assign({}, rgb, hsv, {hex: this.getHex(rgb.r, rgb.g, rgb.b)});
    }

    componentWillMount() {
        this.setState(this.setParasFromColor(this.state.value));
    }

    componentDidMount() {
        this._handleSliderMove = this.handleSliderMove.bind(this);
        this._handleSliderUp = this.handleSliderUp.bind(this);
        this._handlePanelMove = this.handlePanelMove.bind(this);
        this._handlePanelUp = this.handlePanelUp.bind(this);
    }



    handleSliderMove(e) {
        const rect = this.colorSliderBarElement.getBoundingClientRect();
        // console.log(e, rect);

        let sliderTop = e.clientY - rect.top;
        if(sliderTop < 0) {
            sliderTop = 0;
        } else if(sliderTop > rect.height) {
            sliderTop = rect.height;
        }

        const h = sliderTop / rect.height;
        const s = this.state.s;
        const v = this.state.v;

        const rgb = HSVToRGB255(h, s, v);

        const color = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

        this.setState({value: color, h: h, r: rgb.r, g: rgb.g, b: rgb.b, hex: this.getHex(rgb.r, rgb.g, rgb.b)});

        if(this.props.onChange) {
            this.props.onChange(e, color);
        }
    }

    handleSliderUp(e) {
        window.removeEventListener('mousemove', this._handleSliderMove, false);
        window.removeEventListener('mouseup', this._handleSliderUp, false);
    }

    handlePanelMove(e) {
        const rect = this.colorPanelElement.getBoundingClientRect();
        let panelLeft = e.clientX - rect.left, panelTop = e.clientY - rect.top;

        if(panelLeft < 0) {
            panelLeft = 0;
        } else if(panelLeft > rect.width) {
            panelLeft = rect.width;
        }

        if(panelTop < 0) {
            panelTop = 0;
        } else if(panelTop > rect.height) {
            panelTop = rect.height;
        }

        // const hsv = toHSV(this.state.value);

        const h = this.state.h;
        const v = 1 - panelTop / rect.height;
        const s = panelLeft / rect.width;

        const rgb = HSVToRGB255(h, s, v);

        const color = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

        this.setState({value: color, v: v, s: s, r: rgb.r, g: rgb.g, b: rgb.b, hex: this.getHex(rgb.r, rgb.g, rgb.b)});

        if(this.props.onChange) {
            this.props.onChange(e, color);
        }
    }

    handlePanelUp(e) {
        window.removeEventListener('mousemove', this._handlePanelMove, false);
        window.removeEventListener('mouseup', this._handlePanelUp, false);
    }

    render() {
        // console.log(this.state);
        const {
            items, height, borderRadius, fullWidth, activeColor
        } = this.props;

        const mpadding = 4, iconSize = 18, borderWidth = 1, cHeight = height - borderWidth * 2;

        const defaultStyle = {
            position: 'relative',
            boxSizing: 'border-box',
            // width: '100%',
            height: height,
            border: `${borderWidth}px solid ${this.state.open ? activeColor : GREY300}`,
            padding: `0 ${mpadding * 2 + iconSize}px 0 ${mpadding}px`,
            backgroundColor: '#fff',
            borderRadius: borderRadius
        };

        const iconStyle = {
            position: 'absolute',
            top: 0,
            right: mpadding,
            lineHeight: `${cHeight}px`
        }

        // const paras = this.setParasFromColor(this.state.value);
        console.log(this.state.hex);

        return <div style={{
          display: fullWidth ? 'block' : 'inline-block',
          verticalAlign: 'top'
        }}>
            <div style={Object.assign({}, defaultStyle, this.props.style)} onClick={e => {
                this.setState({open: !this.state.open});
            }} ref={ref => this.element = ReactDOM.findDOMNode(ref)}>
                <div style={{
                    boxSizing: 'border-box',
                    minWidth: cHeight - mpadding * 2,
                    height: cHeight - mpadding * 2,
                    margin: `${mpadding}px 0`,
                    border: `${borderWidth}px solid ${this.state.open ? activeColor : GREY300}`,
                    backgroundColor: this.state.value
                }}></div>
                <span style={iconStyle}><SvgIcon color={this.state.open ? activeColor : GREY800} width={iconSize} height={iconSize}><path d={this.state.open ? gKeyboardArrowDown : gKeyboardArrowRight} /></SvgIcon></span>
            </div>
            <Popover otherElements={[this.element]} open={this.state.open} style={{
                marginTop: mpadding,
                padding: mpadding,
                width: caWidth + sliderWidth + (mpadding + borderWidth) * 2 + tpadding
            }} isUseSlideAnimation={true} maxHeight={250} outClickClose={false} onRequestClose={e => {
                this.setState({open: false, collectValue: this.state.value});
            }}>
                <VerticalSeparation gutter={mpadding}><Float float='left'><div ref={ref => this.colorPanelElement = ReactDOM.findDOMNode(ref)} style={{
                    backgroundColor: HSVToString(this.state.h, 1, 1),
                    position: 'relative',
                    top: 0,
                    left: 0,
                    width: caWidth,
                    height: caHeight,
                    marginRight: tpadding
                }} onMouseDown={e => {
                    this._handlePanelMove(e);
                    window.addEventListener('mousemove', this._handlePanelMove, false);
                    window.addEventListener('mouseup', this._handlePanelUp, false);
                }}>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(to right,#fff,rgba(255,255,255,0))'
                    }}></div>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(to top,#000,rgba(0,0,0,0))'
                    }}></div>
                    <div style={{
                        boxSizing: 'border-box',
                        position: 'absolute',
                        top: (1 - this.state.v) * caHeight - sphereSize / 2,
                        left: this.state.s * caWidth - sphereSize / 2,
                        width: sphereSize,
                        height: sphereSize,
                        backgroundColor: '#fff',
                        borderRadius: '50%',
                        border: `${borderWidth}px solid ${GREY300}`,
                        boxShadow: 'rgba(0, 0, 0, 0.6) 0px 0px 2px',
                        pointerEvents: 'none'
                    }}></div>
                </div>
                <div ref={ref => this.colorSliderBarElement = ReactDOM.findDOMNode(ref)} style={{
                    position: 'relative',
                    top: 0,
                    left: 0,
                    width: sliderWidth,
                    height: caHeight,
                    background: 'linear-gradient(to bottom,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%)'
                }} onMouseDown={e => {
                    this._handleSliderMove(e);
                    window.addEventListener('mousemove', this._handleSliderMove, false);
                    window.addEventListener('mouseup', this._handleSliderUp, false);
                }}>
                    <div style={{
                        boxSizing: 'border-box',
                        position: 'absolute',
                        top: this.state.h * caHeight - 2,
                        left: 0,
                        width: '100%',
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: '#fff',
                        border: `${borderWidth}px solid ${GREY300}`,
                        boxShadow: 'rgba(0, 0, 0, 0.6) 0px 0px 2px',
                        pointerEvents: 'none'
                    }}></div>
                </div></Float>
                <GridList cols={3} gutter={mpadding}>
                    <Input stype='QUDR' type='INT' min={0} max={255} onChange={(e, value) => {
                        const color = `rgb(${value}, ${this.state.g}, ${this.state.b})`;
                        const hsv = toHSV(color);
                        this.setState({
                            value: color, 
                            r: value, h: hsv.h, s: hsv.s, v: hsv.v, 
                            hex: this.getHex(value, this.state.g, this.state.b)
                        });
                    }} value={this.state.r} before={<Label height='100%' content='R'/>}/>
                    <Input stype='QUDR' type='INT' min={0} max={255} onChange={(e, value) => {
                        const color = `rgb(${this.state.r}, ${value}, ${this.state.b})`;
                        const hsv = toHSV(color);
                        this.setState({
                            value: color, 
                            g: value, h: hsv.h, s: hsv.s, v: hsv.v, 
                            hex: this.getHex(this.state.r, value, this.state.b)
                        });
                    }} value={this.state.g} before={<Label height='100%' content='G'/>}/>
                    <Input stype='QUDR' type='INT' min={0} max={255} onChange={(e, value) => {
                        const color = `rgb(${this.state.r}, ${this.state.g}, ${value})`;
                        const hsv = toHSV(color);
                        this.setState({
                            value: color,
                            b: value, h: hsv.h, s: hsv.s, v: hsv.v, 
                            hex: this.getHex(this.state.r, this.state.g, value)
                        });
                    }} value={this.state.b} before={<Label height='100%' content='B'/>}/>
                </GridList>
                <GridList cols={3} gutter={mpadding}>
                    <Input stype='QUDR' type='INT' min={0} onChange={(e, value) => {
                        const h = 1 - value / 360;
                        const rgb = HSVToRGB255(h, this.state.s, this.state.v);
                        const color = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
                        this.setState({
                            value: color,
                            h: h, r: rgb.r, g: rgb.g, b: rgb.b,
                            hex: this.getHex(rgb.r, rgb.g, rgb.b)
                        });
                    }} max={360} value={Math.round((1 - this.state.h) * 360)} before={<Label height='100%' content='H'/>} after={<Label height='100%' content='度'/>}/>
                    <Input stype='QUDR' type='INT' min={0} onChange={(e, value) => {
                        const s = value / 100;
                        const rgb = HSVToRGB255(this.state.h, s, this.state.v);
                        const color = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
                        this.setState({
                            value: color,
                            s: s, r: rgb.r, g: rgb.g, b: rgb.b,
                            hex: this.getHex(rgb.r, rgb.g, rgb.b)
                        });
                    }} max={100} value={Math.round(this.state.s * 100)} before={<Label height='100%' content='S'/>} after={<Label height='100%' content='%'/>}/>
                    <Input stype='QUDR' type='INT' min={0} onChange={(e, value) => {
                        const v = value / 100;
                        const rgb = HSVToRGB255(this.state.h, this.state.s, v);
                        const color = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
                        this.setState({
                            value: color,
                            v: v, r: rgb.r, g: rgb.g, b: rgb.b,
                            hex: this.getHex(rgb.r, rgb.g, rgb.b)
                        });
                    }} max={100} value={Math.round(this.state.v * 100)} before={<Label height='100%' content='V'/>} after={<Label height='100%' content='%'/>}/>
                </GridList>
                <Input stype='QUDR' regExp='[^0-9 & a-f & A-F]' maxLength={6} value={this.state.hex} onChange={(e, value) => {
                    const _vaule = value;
                    while(value.length < 6) {
                        value = '0' + value;
                    }
                    const hsv = toHSV('#' + value);
                    const rgb = HSVToRGB255(hsv.h, hsv.s, hsv.v);
                    const color = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
                    this.setState({
                        value: color,
                        h: hsv.h, s: hsv.s, v: hsv.v,
                        r: rgb.r, g: rgb.g, b: rgb.b,
                        hex: _vaule
                    });
                }} before={<Label height={23} content='#'/>}/>
                <Float float='right'><Float float='left'>
                    <RaisedButton type='danger' size='small' label='取消' onClick={e => {
                        this.setState(Object.assign(this.setParasFromColor(this.state.collectValue), {value: this.state.collectValue}));
                    }} style={{marginRight: tpadding}}/>
                    <RaisedButton type='primary' size='small' label='确定' onClick={e => {
                        this.setState({open: false, collectValue: this.state.value});
                    }}/>
                </Float></Float>
            </VerticalSeparation></Popover>
        </div>
  }
}

export default ColorPicker;