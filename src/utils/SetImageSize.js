export default (image, width, height) => {
	let mCanvas = document.createElement('canvas');
	mCanvas.width = width;
	mCanvas.height = height;

	let iWidth = image.width, iHeight = image.height;

	const iRatio = iWidth / iHeight,
		ratio = width / height,

		ratioW = iWidth / width, 
		ratioH = iHeight / height;

	let mContext = mCanvas.getContext('2d');

	mContext.fillStyle = '#ffffff';
	mContext.fillRect(0, 0, width, height);

	if(iRatio > ratio) {
		mContext.drawImage(image, 0, 0, iWidth, iHeight, 0, 0, width, iHeight / ratioW);
	} else {
		mContext.drawImage(image, 0, 0, iWidth, iHeight, 0, 0, iWidth / ratioH, height);
	}

	return mCanvas.toDataURL();
};