import Curve from './Curve';
import Point from '../math/Point2';
import Approximately from '../Approximately';

class LineCurve extends Curve {
	constructor(v0, v1) {
		super();
		this.v0 = v0;
		this.v1 = v1;
		this.type = 'LineCurve';
	}

	copy(line) {
		this.v0.copy(line.v0);
		this.v1.copy(line.v1);
		return this;
	}

	clone() {
		return new LineCurve().copy(this);
	}

	getPoint(t) {
		let point = this.v1.clone().subtract(this.v0);
		point.multiplyScalar( t ).add( this.v0 );

		return point;
	}

	getTangent(t) {
		const tanget = this.v1.clone().subtract(this.v0);
		return tanget;
	}

	offset(distance) {
		if(!this.v0.isApproximately(this.v1)) {
			const n = this.getNormal(0).normalize(distance);
			// console.log(n);
			this.v0.copy(this.v0.add(n));

			this.v1.copy(this.v1.add(n));
		}

		return this;
	}

	intersection(line) {
		let k1, b1, k2, b2;
		if(Approximately(this.v0.x, this.v1.x)) {
			k1 = 0;
			b1 = this.v0.x;
		} else {
			k1 = (this.v0.y - this.v1.y) / (this.v0.x - this.v1.x);
			b1 = (this.v0.x * this.v1.y - this.v1.x * this.v0.y) / (this.v0.x - this.v1.x);
		}

		if(Approximately(line.v0.x, line.v1.x)) {
			k2 = 0;
			b2 = line.v0.x;
		} else {
			k2 = (line.v0.y - line.v1.y) / (line.v0.x - line.v1.x);
			b2 = (line.v0.x * line.v1.y - line.v1.x * line.v0.y) / (line.v0.x - line.v1.x);
		}

		if(Approximately(k1, k2)) {
			return null;
		} else {
			return new Point(
				(b2 - b1) / (k1 - k2),
				(k1 * b2 - k2 * b1) / (k1 - k2)
			);
		}
	}

	fromArray(array) {
		this.v0.set(array[0], array[1]);
		this.v1.set(array[2], array[3]);
		return this;
	}

	toArray() {
		return this.v0.toArray().concat(this.v1.toArray());
	}
}

export default LineCurve;