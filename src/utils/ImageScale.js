/**
 * 图像缩放 image is Image or canvas
* @param  {Image | Canvas} image  is Image or canvas
* @param  {number} 			scale  缩放比例
* @return {Canvas}        新的画布
 */
export default (image, scale = 0.5) => {
	let _canvas = document.createElement('canvas'),
		_context = _canvas.getContext('2d');
    const width = image.width,
    	height = image.height,
    	newWidth = width * scale,
    	newHeight = height * scale;

    _canvas.width = newWidth;
    _canvas.height = newHeight;

    if(width > newWidth) {
        let oc = document.createElement('canvas'),
            octx = oc.getContext('2d');
        let steps = Math.ceil(Math.log(scale) / Math.log(2));

        oc.width = width;
        oc.height = height;

        octx.drawImage(image, 0, 0, oc.width , oc.height);

        let _pow, _w, _h, d_w = oc.width, d_h = oc.height;
        for(let s = 1; s < steps; s++) {
            _pow = Math.pow(2, s);
            _w = width / _pow;
            _h = height / _pow;
            octx.drawImage(oc, 0, 0, d_w , d_h, 0, 0, _w, _h);
            d_w = _w;
            d_h = _h;
        }
        _context.drawImage(oc, 0, 0, d_w, d_h, 0, 0, newWidth, newHeight);
    } else {
        _context.drawImage(image, 0, 0, newWidth, newHeight);
    }

    return _canvas;
};