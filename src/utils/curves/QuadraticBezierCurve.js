import Curve from './Curve';
import Point from '../math/Point2';
import { QuadraticBezierPointFormula, QuadraticBezierTangentFormula } from './utils';
import LineCurve from './LineCurve';

class QuadraticBezierCurve extends Curve {
	constructor(v0, v1, v2) {
		super();
		this.v0 = v0;
		this.v1 = v1;
		this.v2 = v2;
		this.type = 'QuadraticBezierCurve';
	}

	copy(quadratic) {
		this.v0.copy(quadratic.v0);
		this.v1.copy(quadratic.v1);
		this.v2.copy(quadratic.v2);
		
		return this;
	}

	clone() {
		return new QuadraticBezierCurve().copy(this);
	}

	getPoint(t) {
		return new Point(
			QuadraticBezierPointFormula(t, this.v0.x, this.v1.x, this.v2.x, this.v3.x),
			QuadraticBezierPointFormula(t, this.v0.y, this.v1.y, this.v2.y, this.v3.y)
		);
	}

	getTangent(t) {
		return new Point(
			QuadraticBezierTangentFormula(t, this.v0.x, this.v1.x, this.v2.x, this.v3.x),
			QuadraticBezierTangentFormula(t, this.v0.y, this.v1.y, this.v2.y, this.v3.y)
		);
	}

	offset(distance) {
		let l1 = new LineCurve(this.v0.clone(), this.v1.clone());
		let l2 = new LineCurve(this.v1.clone(), this.v2.clone());
		l1.offset(distance);
		l2.offset(distance);

		this.v0.copy(l1.v0);
		this.v2.copy(l2.v1);

		let inter = l1.intersection(l2);
		if(!inter) {
			inter = l1.v1;
		}
		this.v1.copy(inter);

		return this;
	}

	fromArray(array) {
		this.v0.set(array[0], array[1]);
		this.v1.set(array[2], array[3]);
		this.v2.set(array[4], array[5]);
		return this;
	}

	toArray() {
		return this.v0.toArray().concat(
			this.v1.toArray(),
			this.v2.toArray()
		);
	}

}

export default QuadraticBezierCurve;