import hljs from 'highlight.js';
import React from 'react';
import ReactDOM from 'react-dom';
require('highlight.js/styles/atom-one-light.css');

class Highlight extends React.Component {
    componentDidMount() {
        this.highlightCode();
    }

    componentDidUpdate() {
        this.highlightCode();
    }

    highlightCode() {
        const domNode = ReactDOM.findDOMNode(this);
        const nodes = domNode.querySelectorAll('pre code');

        let i;
        for (i = 0; i < nodes.length; i++) {
            hljs.highlightBlock(nodes[i]);
        }
    }

    render() {
        const {children, className, element, innerHTML} = this.props;
        let Element = element ? React.DOM[element] : null;

        if (innerHTML) {
            if (!Element) {
                Element = React.DOM.div
            }

            return Element({dangerouslySetInnerHTML: {__html: children}, className: className || null}, null);
        } else {
            if (Element) {
                return Element({className}, children);
            } else {
                return <pre className={className}><code>{children}</code></pre>;
            }
        }
    }
}

Highlight.defaultProps = {
    innerHTML: false,
    className: null,
    element: null,
};

export default Highlight;