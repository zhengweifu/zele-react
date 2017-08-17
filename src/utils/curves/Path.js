import Point from '../math/Point2';
import LineCurve from './LineCurve';
import QuadraticBezierCurve from './QuadraticBezierCurve';
import CubicBezierCurve from './CubicBezierCurve';
import Bezier from 'bezier-js';

import paper from 'paper/dist/paper-core.js';
paper.project = new paper.Project();

class Path {
	constructor(points) {
		this.curveGroups = [];

		this.tempPoint = new Point();

		if(points) {
			this.fromPoints(points);
		}
	}

	copy(p) {
		this.clear();
		this.curves = p.curveGroups.map(g => {
			return g.map(c => c.clone());
		});

		return this;
	}

	clone() {
		return new Path().copy(this);
	}

	fromPoints ( points ) {

		this.moveTo( points[ 0 ].x, points[ 0 ].y );

		for ( let i = 1, l = points.length; i < l; i ++ ) {

			this.lineTo( points[ i ].x, points[ i ].y );

		}

	}

	moveTo ( x, y ) {

		this.tempPoint.set(x, y);

		this.curveGroups.push([]);

		return null;

	}

	lineTo ( x, y ) {

		let curve = new LineCurve( new Point().copy(this.tempPoint), new Point( x, y ) );

		this.tempPoint.set(x, y);

		this.curveGroups[this.curveGroups.length - 1].push( curve );

		return curve;

	}

	quadraticCurveTo( aCPx, aCPy, aX, aY ) {

		let curve = new QuadraticBezierCurve(
			new Point().copy(this.tempPoint),
			new Point( aCPx, aCPy ),
			new Point( aX, aY )
		);

		this.tempPoint.set(aX, aY);

		this.curveGroups[this.curveGroups.length - 1].push( curve );

		return curve;

	}

	bezierCurveTo( aCP1x, aCP1y, aCP2x, aCP2y, aX, aY ) {

		let curve = new CubicBezierCurve(
			new Point().copy(this.tempPoint),
			new Point( aCP1x, aCP1y ),
			new Point( aCP2x, aCP2y ),
			new Point( aX, aY )
		);

		this.tempPoint.set(aX, aY);

		this.curveGroups[this.curveGroups.length - 1].push( curve );

		return curve;
	}

	// getCurveLengths() {

	// 	// We use cache values if curves and cache array are same length

	// 	if ( this.cacheLengths && this.cacheLengths.length === this.curves.length ) {

	// 		return this.cacheLengths;

	// 	}

	// 	// Get length of sub-curve
	// 	// Push sums into cached array

	// 	let lengths = [], sums = 0;

	// 	for ( let i = 0, l = this.curves.length; i < l; i ++ ) {

	// 		sums += this.curves[ i ].getLength();
	// 		lengths.push( sums );

	// 	}

	// 	this.cacheLengths = lengths;

	// 	return lengths;

	// }

	// getLength() {
	// 	let lens = this.getCurveLengths();
	// 	return lens[ lens.length - 1 ];
	// }

	// getPoint( t ) {

	// 	let d = t * this.getLength();
	// 	let curveLengths = this.getCurveLengths();
	// 	let i = 0;

	// 	// To think about boundaries points.

	// 	while ( i < curveLengths.length ) {

	// 		if ( curveLengths[ i ] >= d ) {

	// 			let diff = curveLengths[ i ] - d;
	// 			let curve = this.curves[ i ];

	// 			let u = 1 - diff / curve.getLength();

	// 			return curve.getPointAt( u );

	// 		}

	// 		i ++;

	// 	}

	// 	return null;

	// 	// loop where sum != 0, sum > d , sum+1 <d

	// }


	getOffset(distance) {
		let resultPath = new Path();

		for(let g = 0, lg = this.curveGroups.length; g < lg; g++) {
			let group = this.curveGroups[g];
			for(let i = 0, li = group.length; i < li; i++) {
				let curve = group[i];
				let bezier;
				switch(curve.type) {
					case 'LineCurve':
						bezier = new Bezier(
							curve.v0.toObject(),
							curve.v1.toObject()
						);
						break;
					case 'QuadraticBezierCurve':
						bezier = new Bezier(
							curve.v0.toObject(),
							curve.v1.toObject(),
							curve.v2.toObject()
						);
						break;
					case 'CubicBezierCurve':
						bezier = new Bezier(
							curve.v0.toObject(),
							curve.v1.toObject(),
							curve.v2.toObject(),
							curve.v3.toObject()
						);
						break;
				}
				if(bezier) {
					let beziers = bezier.offset(distance);
					
					// 删除存在点是NaN的曲线 －－－－－－－－－－－－start－－－－－－－－－－－－
					let mBeziers = [];
					for(let b of beziers) {
						let nan = false;

						for(let p of b.points) {
							if( isNaN(p.x) || isNaN(p.y)) {
								nan = true;
								break;
							}
						}

						if(!nan) {
							mBeziers.push(b);
						}
					}
					// 删除存在点是NaN的曲线 －－－－－－－－－－－－end－－－－－－－－－－－－

					for(let j = 0, lj = mBeziers.length; j < lj; j++) {
						let eachBezier = mBeziers[j];

						const points = eachBezier.points;
						
						if(!resultPath.curveGroups[g]) {

							resultPath.moveTo(points[0].x, points[0].y);
						}
						const pl = points.length;
						switch(pl) {
							case 2:
								resultPath.lineTo(points[1].x, points[1].y);
								break;
							case 3:
								resultPath.quadraticCurveTo(
									points[1].x, points[1].y,
									points[2].x, points[2].y
								);
								break;
							case 4:
								resultPath.bezierCurveTo(
									points[1].x, points[1].y,
									points[2].x, points[2].y,
									points[3].x, points[3].y
								);
								break;
						}

						
					}
				}
				
			}
		}
		return resultPath;
	}

	getOutline( distance ) {
		let resultPath = new Path();

		const half = distance * 0.5;
		let tempPath1 = this.getOffset(half);
		let tempPath2 = this.getOffset(-half);

		for(let g = 0, lg = tempPath1.curveGroups.length; g < lg; g++) {
			let group1 = tempPath1.curveGroups[g];
			let group2 = tempPath2.curveGroups[g];
			for(let i = 0, li = group1.length; i < li; i++) {
				const curve = group1[i];
				if(i === 0) {
					resultPath.moveTo(curve.v0.x, curve.v0.y);
				}
				const type = curve.type;
				switch(type) {
					case 'LineCurve':
						resultPath.lineTo(curve.v1.x, curve.v1.y);
						break;
					case 'QuadraticBezierCurve':
						resultPath.quadraticCurveTo(
							curve.v1.x, curve.v1.y,
							curve.v2.x, curve.v2.y
						);
						break;
					case 'CubicBezierCurve':
						resultPath.bezierCurveTo(
							curve.v1.x, curve.v1.y,
							curve.v2.x, curve.v2.y,
							curve.v3.x, curve.v3.y
						);
						break;

				}
				
			}

			for(let lj = group2.length - 1, j = lj; j >= 0; j--) {
				const curve = group2[j];
				const type = curve.type;
				switch(type) {
					case 'LineCurve':
						if(j === lj) {
							resultPath.lineTo(curve.v1.x, curve.v1.y);
						}
						resultPath.lineTo(curve.v0.x, curve.v0.y);
						break;
					case 'QuadraticBezierCurve':
						if(j === lj) {
							resultPath.lineTo(curve.v2.x, curve.v2.y);
						}
						resultPath.quadraticCurveTo(
							curve.v1.x, curve.v1.y,
							curve.v0.x, curve.v0.y
						);
						break;
					case 'CubicBezierCurve':
						if(j === lj) {
							resultPath.lineTo(curve.v3.x, curve.v3.y);
						}
						resultPath.bezierCurveTo(
							curve.v2.x, curve.v2.y,
							curve.v1.x, curve.v1.y,
							curve.v0.x, curve.v0.y
						);
						break;

				}
			}

			resultPath.lineTo(group1[0].v0.x, group1[0].v0.y);
		}

		let paperPath = resultPath.toPaperJsPath();
		paperPath.setClosed(true);
		for(let group of this.curveGroups) {
			let paperCircleStart = paper.Path.Circle(new paper.Point(group[0].v0.toArray()), half);
			// console.log(paperPath, paperCircleStart);
			paperPath.unite(paperPath);
			// console.log(paperPath);
			// return this.fromPaperJsPath(paperCircleStart);
		}
		
		return this.fromPaperJsPath(paperPath);
	}

	fromPaperJsPath(path) {
		this.clear();
		let segments = [...path.getSegments()];
		if(path.closed) {
			segments.push(segments[0]);
		}
		this.moveTo(segments[0].getPoint().x, segments[0].getPoint().y);
		for(let i = 1, l = segments.length; i < l; i++) {
			let upSegment = segments[i - 1];
			let segment = segments[i];
			this.bezierCurveTo(
				upSegment.getHandleOut().x + upSegment.getPoint().x, 
				upSegment.getHandleOut().y + upSegment.getPoint().y, 
				segment.getHandleIn().x + segment.getPoint().x, 
				segment.getHandleIn().y + segment.getPoint().y,
				segment.getPoint().x, 
				segment.getPoint().y,
			);
		}

		console.log(path.closed);
		return this;
	}

	toPaperJsPath(path) {
		path = path || new paper.Path();
		for(let group of this.curveGroups) {
			for(let i = 0, l = group.length; i < l; i++) {
				let curve = group[i];
				if(i === 0) {
					path.moveTo(new paper.Point(curve.v0.toArray()));
				}

				switch(curve.type) {
					case 'LineCurve':
						path.lineTo(new paper.Point(curve.v1.toArray()));
						break;
					case 'QuadraticBezierCurve':
						path.quadraticCurveTo(
							new paper.Point(curve.v1.toArray()),
							new paper.Point(curve.v2.toArray())
						);
						break;
					case 'CubicBezierCurve':
						path.cubicCurveTo(
							new paper.Point(curve.v1.toArray()),
							new paper.Point(curve.v2.toArray()),
							new paper.Point(curve.v3.toArray())
						);
						break;
				}
			}
		}
		return path;
	}

	clear() {
		this.curveGroups.length = 0;
	}

	fromFabricJsPath(pathData) {
		this.clear();
		for(let item of pathData) {
			switch(item[0]) {
				case 'M':
					this.moveTo(item[1], item[2]);
					break;
				case 'L':
					this.lineTo(item[1], item[2]);
					break;

				case 'Q':
					this.quadraticCurveTo(item[1], item[2], item[3], item[4]);
					break;
				case 'C':
					this.bezierCurveTo(item[1], item[2], item[3], item[4], item[5], item[6]);
					break;
			}
		}
		return this;
	}

	toFabricJsPath(path) {
		let p = path.path;
		p.length = 0;
		for(let group of this.curveGroups) {
			for(let i = 0, l = group.length; i < l; i++) {
				let curve = group[i];
				if(i === 0) {
					p.push(['M', ...curve.v0.toArray()]);
				}

				switch(curve.type) {
					case 'LineCurve':
						p.push(['L', ...curve.v1.toArray()]);
						break;
					case 'QuadraticBezierCurve':
						p.push(['Q', ...curve.v1.toArray().concat(curve.v2.toArray())]);
						break;
					case 'CubicBezierCurve':
						p.push(['C', ...curve.v1.toArray().concat(curve.v2.toArray(), curve.v3.toArray())]);
						break;
				}
			}
		}
		// console.log('=> ', p);
		return path;
	}

}

export default Path;