import Point from '../math/Point2';
import Approximately from '../Approximately';

class Curve {
	getPoint( t ) {
		console.warn( 'Curve: Warning, getPoint() not implemented!' );
		return null;
	}

	getPointAt( u ) {
		const t = this.getUtoTmapping(u);
		return this.getPoint(t);
	}

	getLengths( divisions ) {
		if ( ! divisions ) {
			divisions = ( this.__arcLengthDivisions ) ? ( this.__arcLengthDivisions ) : 200;
		}

		if ( this.cacheArcLengths
			&& ( this.cacheArcLengths.length === divisions + 1 )
			&& ! this.needsUpdate ) {

			//console.log( "cached", this.cacheArcLengths );
			return this.cacheArcLengths;

		}

		this.needsUpdate = false;

		let cache = [];
		let current, last = this.getPoint( 0 );
		let p, sum = 0;

		cache.push( 0 );

		for ( p = 1; p <= divisions; p ++ ) {

			current = this.getPoint ( p / divisions );
			sum += current.distanceTo( last );
			cache.push( sum );
			last = current;

		}

		this.cacheArcLengths = cache;

		return cache; // { sums: cache, sum:sum }; Sum is in the last element.

	}

	// Given u ( 0 .. 1 ), get a t to find p. This gives you points which are equidistant
	getUtoTmapping( u, distance ) {

		let arcLengths = this.getLengths();

		let i = 0, il = arcLengths.length;

		let targetArcLength; // The targeted u distance value to get

		if ( distance ) {

			targetArcLength = distance;

		} else {

			targetArcLength = u * arcLengths[ il - 1 ];

		}

		//let time = Date.now();

		// binary search for the index with largest value smaller than target u distance

		let low = 0, high = il - 1, comparison;

		while ( low <= high ) {

			i = Math.floor( low + ( high - low ) / 2 ); // less likely to overflow, though probably not issue here, JS doesn't really have integers, all numbers are floats

			comparison = arcLengths[ i ] - targetArcLength;

			if ( comparison < 0 ) {

				low = i + 1;

			} else if ( comparison > 0 ) {

				high = i - 1;

			} else {

				high = i;
				break;

				// DONE

			}

		}

		i = high;

		//console.log('b' , i, low, high, Date.now()- time);

		if ( arcLengths[ i ] === targetArcLength ) {

			let t = i / ( il - 1 );
			return t;

		}

		// we could get finer grain at lengths, or use simple interpolation between two points

		let lengthBefore = arcLengths[ i ];
		let lengthAfter = arcLengths[ i + 1 ];

		let segmentLength = lengthAfter - lengthBefore;

		// determine where we are between the 'before' and 'after' points

		let segmentFraction = ( targetArcLength - lengthBefore ) / segmentLength;

		// add that fractional amount to t

		let t = ( i + segmentFraction ) / ( il - 1 );

		return t;

	}

	getTangentAt(u) {
		const t = this.getUtoTmapping(u);
		return this.getTangent(t);
	}

	getNormal(t) {
		const d = this.getTangent(t);
		const q = d.length();

		if(Approximately(q, 0)) {
			return null;
		}

      	return new Point(-d.y / q, d.x / q);

	}
}

export default Curve;