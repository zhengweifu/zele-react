class Ruler {
	constructor(props) {
		props = props || {};
		this.left = props.left || 100;
		this.top = props.top || 100;
		this.width = props.width || 500;
		this.height = props.height || 500;
		this.color = props.color || 'rgb(200, 200, 200)';
		this.padding = props.padding || 30;

		this.wContent = props.wContent || this.width;
		this.hContent = props.hContent || this.height;

		this.canvas = document.createElement('canvas');
		this.context = this.canvas.getContext('2d');

		this.canvas.style.position = 'absolute';

		this.render();
	}

	setVisible(visible = true) {
		if(visible) {
			this.canvas.style.display = 'block';
		} else {
			this.canvas.style.display = 'none';
		}
	}

	render() {
		this.canvas.style.left = this.left;
		this.canvas.style.top = this.top;

		const mWidth = this.width + this.padding * 2,
			mHeight = this.height + this.padding * 2;

		// 设置画布大小
		this.canvas.width = mWidth;
		this.canvas.height = mHeight;

		// 清空画布
		this.context.clearRect(0, 0, mWidth, mHeight);

		this.context.strokeStyle = this.color;
		this.context.fillStyle = this.color;

		// 绘制正方形
		this.context.rect(this.padding, this.padding, this.width, this.height);
		this.context.stroke();

		//
		const halfPadding = this.padding / 2;

		const tw = 12, th = 8;

		// 绘制直线
		this.context.beginPath();
		this.context.moveTo(this.padding, 0);
		this.context.lineTo(this.padding, this.padding);

		this.context.moveTo(this.padding + tw, halfPadding);
		this.context.lineTo(this.padding + this.width - tw, halfPadding);

		this.context.moveTo(this.padding + this.width, 0);
		this.context.lineTo(this.padding + this.width, this.padding);

		this.context.moveTo(0, this.padding);
		this.context.lineTo(this.padding, this.padding);

		this.context.moveTo(halfPadding, this.padding + tw);
		this.context.lineTo(halfPadding, this.padding + this.height - tw);

		this.context.moveTo(0, this.padding + this.height);
		this.context.lineTo(this.padding, this.padding + this.height);

		this.context.stroke();

		// 绘制三角形
		this.context.beginPath();
		this.context.moveTo(this.padding, halfPadding);
		this.context.lineTo(this.padding + tw, halfPadding - th / 2);
		this.context.lineTo(this.padding + tw, halfPadding + th / 2);

		this.context.moveTo(this.padding + this.width, halfPadding);
		this.context.lineTo(this.padding + this.width - tw, halfPadding - th / 2);
		this.context.lineTo(this.padding + this.width - tw, halfPadding + th / 2);

		this.context.moveTo(halfPadding, this.padding);
		this.context.lineTo(halfPadding - th / 2, this.padding + tw);
		this.context.lineTo(halfPadding + th / 2, this.padding + tw);

		this.context.moveTo(halfPadding, this.padding + this.height);
		this.context.lineTo(halfPadding - th / 2, this.padding + this.height - tw);
		this.context.lineTo(halfPadding + th / 2, this.padding + this.height - tw);

		this.context.fill();

		// 绘制文字
		this.context.font = '12px arial';
		const mWidthTextContent = `${this.wContent}`,
			mHeightTextContent = `${this.hContent}`,
			mT1W = this.context.measureText(mWidthTextContent).width,
			mT2W = this.context.measureText(mHeightTextContent).width;

		const mT1Left = this.padding + this.width / 2 - mT1W / 2;
		const mT2Top = this.padding + this.height / 2 - mT2W / 2;
		
		this.context.fillText(mWidthTextContent, mT1Left, this.padding / 3);
		this.context.rotate(Math.PI / 2);
		this.context.fillText(mHeightTextContent, mT2Top, 0);
	}
}

export default Ruler;