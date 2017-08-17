export default (value, min, max) => {
	if(min >= max) {
		throw new Error('The minimum value cannot be greater than or equal to the maximum value.');
	}

	if(value > max) {
		value = max;
	} else if(value < min) {
		value = min;
	}

	return value;
};