import React from 'react';
import ReactDOM from 'react-dom';

import Label from '../Label';

import Input from '../Input';

import VerticalSeparation from '../VerticalSeparation';

import Modal from './Modal';

let VALUE = undefined;

const next = (props) => {
	const div = document.createElement('div');

    document.body.appendChild(div);

    let messageElement = React.createElement(Label, {
    	content: props.message
    });

    let useCancelButton = true;
    if(props.type === 'alert') {
    	// messageElement = React.createElement(Label, {});
    } else if(props.type === 'confirm') {
    	// messageElement = props.message;
    	// useCancelButton = true;
    } else if(props.type === 'prompt') {
    	messageElement = <VerticalSeparation><Label content={props.message}/><Input onChange={(e, value) => {
    		VALUE = value;
    	}} stype='QUDR' height={30} value={props.value}/></VerticalSeparation>;
    }

    const removeComponent = () => {
    	ReactDOM.unmountComponentAtNode(div);
	    document.body.removeChild(div);
    };

    const component = React.createElement(Modal, Object.assign({}, {
    	open: true,
    	title: props.title,
    	useCancelButton: useCancelButton,
	    onOkClick: () => {
	    	removeComponent();
	    	if(props.onOk) {
	    		if(props.type === 'prompt') {
	    			props.onOk(VALUE);
	    		} else {
	    			props.onOk();
	    		}
	    	}
	    },
	    onCancelClick: () => {
	    	removeComponent();
	    	if(props.onCancel) {
	    		props.onCancel();
	    	}
	    }
    }), messageElement);

    ReactDOM.render(component, div);
};

const alert = (message, title, onOk, onCancel) => {
	next({title: title, message: message, type: 'alert', onOk, onCancel});
};

const confirm = (message, title, onOk, onCancel) => {
	next({title: title, message: message, type: 'confirm', onOk, onCancel});
};

const prompt = (message, value, title, onOk, onCancel) => {
	VALUE = value;
	next({title: title, value: value, message: message, type: 'prompt', onOk, onCancel});
};

export default {
	alert,
	confirm,
	prompt
};