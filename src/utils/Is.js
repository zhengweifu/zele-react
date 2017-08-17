export default (obj, type) => { 
	return (
		(type === 'Null' && obj === null) || 
		(type === 'Undefined' && obj === void 0 ) || 
		(type === 'Number' && isFinite(obj)) || 
		Object.prototype.toString.call(obj).slice(8, -1) === type
	); 
};