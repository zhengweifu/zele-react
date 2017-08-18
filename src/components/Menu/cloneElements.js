import Is from '../../utils/Is';

import React from 'react';

export default (elements) => {
	if(!Is(elements, 'Array')) {
		elements = [elements];
	}

	let _elements = elements.map((item, index) => {
		return React.cloneElement(item, {selfIndex: index, key: index});
	});

	return _elements;
};
