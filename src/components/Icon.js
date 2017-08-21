import React, { Component, PropTypes } from 'react';

import { GREY100 } from '../styles/colors';

import SvgIcon from './SvgIcon';

import {
    gLock,
    gLockOpen,
    gLockOutline,
    gVisibility,
    gVisibilityOff,
    gHighlightOff,
    gHelp,
    gHelpOutline,
    gDelete,
    gDeleteForever,
    gBuild
} from '../svgIcons/google/Action';

import {
    gClear,
    gAddCircle,
    gRemoveCircle,
    gUndo,
    gRedo
} from '../svgIcons/google/Content';

import { gTitle } from '../svgIcons/google/Editor';

import {
    gKeyboardArrowDown,
    gKeyboardArrowRight,
    gKeyboardArrowLeft,
    gKeyboardArrowUp
} from '../svgIcons/google/Hardware';

import {
    gImage,
    gDehaze,
    gTransform,
    gBrush
} from '../svgIcons/google/Image';

import {
    gCheck,
    gArrowBack,
    gArrowDownward,
    gArrowForward,
    gArrowUpward,
    gCancel
} from '../svgIcons/google/Navigation';

let name2Icon = {
    // Action
    gLock,
    gLockOpen,
    gLockOutline,
    gVisibility,
    gVisibilityOff,
    gHighlightOff,
    gHelp,
    gHelpOutline,
    gDelete,
    gDeleteForever,
    gBuild,
    // Content
    gClear,
    gAddCircle,
    gRemoveCircle,
    gUndo,
    gRedo,
    // Editor
    gTitle,
    // Hardware
    gKeyboardArrowDown,
    gKeyboardArrowRight,
    gKeyboardArrowLeft,
    gKeyboardArrowUp,
    // Image
    gImage,
    gDehaze,
    gTransform,
    gBrush,
    // Navigation
    gCheck,
    gArrowBack,
    gArrowDownward,
    gArrowForward,
    gArrowUpward,
    gCancel
};

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

export default class Icon extends Component {
    static propTypes = {
        children: PropTypes.node,
        color: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
        viewBox: PropTypes.string,
        type: PropTypes.string.isRequired,
        style: PropTypes.object
    };

    static defaultProps = {
        color: GREY100,
        viewBox: '0 0 24 24'
    };

    render() {
        const styles = getStyles(this.props);
        return (
            <SvgIcon
                viewBox={this.props.viewBox}
                style={Object.assign({}, styles.root, this.props.style)}>
                <path d={name2Icon[this.props.type]} />
            </SvgIcon>
        );
    }
}