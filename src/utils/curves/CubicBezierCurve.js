import Curve from './Curve';
import Point from '../math/Point2';
import { CubicBezierPointFormula, CubicBezierTangentFormula } from './utils';
import LineCurve from './LineCurve';

import Bezier from 'bezier-js';

class CubicBezierCurve extends Curve {
	constructor(v0, v1, v2, v3) {
		super();
		this.v0 = v0;
		this.v1 = v1;
		this.v2 = v2;
		this.v3 = v3;
		this.type = 'CubicBezierCurve';
	}

	copy(cubic) {
		this.v0.copy(cubic.v0);
		this.v1.copy(cubic.v1);
		this.v2.copy(cubic.v2);
		this.v3.copy(cubic.v3);
		return this;
	}

	clone() {
		return new CubicBezierCurve().copy(this);
	}

	getPoint(t) {
		return new Point(
			CubicBezierPointFormula(t, this.v0.x, this.v1.x, this.v2.x, this.v3.x),
			CubicBezierPointFormula(t, this.v0.y, this.v1.y, this.v2.y, this.v3.y)
		);
	}

	getTangent(t) {
		return new Point(
			CubicBezierTangentFormula(t, this.v0.x, this.v1.x, this.v2.x, this.v3.x),
			CubicBezierTangentFormula(t, this.v0.y, this.v1.y, this.v2.y, this.v3.y)
		);
	}

	offset(distance) {
		// let tv0 = this.v0.clone(),
		// 	tv1 = this.v1.clone(),
		// 	tv2 = this.v2.clone(),
		// 	tv3 = this.v3.clone();
		// if(tv0.isApproximately(tv1)) {
		// 	tv1.x += 0.0001;
		// }
		// if(tv1.isApproximately(tv2)) {
		// 	tv2.x += 0.0001;
		// }

		// if(tv2.isApproximately(tv3)) {
		// 	tv2.x += 0.0001;
		// }

		// let l1 = new LineCurve(tv0, tv1);
		// let l2 = new LineCurve(tv1.clone(), tv2);
		// let l3 = new LineCurve(tv2.clone(), tv3);
		// // console.log('oo: ', l1, l2, l3);
		// l1.offset(distance);
		// l2.offset(distance);
		// l3.offset(distance);
		// // console.log('rr: ', l1, l2, l3);
		// this.v0.copy(l1.v0);
		// this.v3.copy(l3.v1);
		// console.log(l1);
		// let inter1 = l1.intersection(l2);
		// console.log('inter1: ', inter1);
		// if(!inter1) {
		// 	inter1 = l1.v1;
		// }
		// this.v1.copy(inter1);

		// let inter2 = l2.intersection(l3);
		// console.log('inter2: ', inter2);
		// if(!inter2) {
		// 	inter2 = l2.v1;
		// }
		// this.v2.copy(inter2);
		// 
		let bezier = new Bezier([
			this.v0.toObject(),
			this.v1.toObject(),
			this.v2.toObject(),
			this.v3.toObject()
		]);

		console.log('xx: ', bezier.offset(distance));

		return this;
	}

	fromArray(array) {
		this.v0.set(array[0], array[1]);
		this.v1.set(array[2], array[3]);
		this.v2.set(array[4], array[5]);
		this.v3.set(array[6], array[7]);
		return this;
	}

	toArray() {
		return this.v0.toArray().concat(
			this.v1.toArray(),
			this.v2.toArray(),
			this.v3.toArray()
		);
	}
}

export default CubicBezierCurve;