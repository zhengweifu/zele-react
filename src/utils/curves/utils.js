
//公式： B = Math.pow(1 - t, 2) * p0 + 2 * t * (1 - t) * p1 + Math.pow(t, 2) * p2  t in [0,1]。
export function QuadraticBezierPointFormula(t, p0, p1, p2) {
	const k = 1 - t;
	return Math.pow(k, 2) * p0 + 2 * t * k * p1 + Math.pow(t, 2) * p2;
}

//公式： B = p0 * Math.pow(1 - t, 3) + 3 * p1 * t * Math.pow(1 - t, 2) + 3 * p2 * Math.pow(t, 2) * (1 - t) + p3 * Math.pow(t, 3)  t in [0,1]。
export function CubicBezierPointFormula(t, p0, p1, p2, p3) {
	const k = 1 - t;
	return p0 * Math.pow(k, 3) + 3 * p1 * t * Math.pow(k, 2) + 3 * p2 * Math.pow(t, 2) * k + p3 * Math.pow(t, 3);
}

/**
 * 获取二次Bezier曲线的切线
 * @param {number} t  时间
 * @param {number} p0 第一个点
 * @param {number} p1 控制点
 * @param {number} p2 第二个点
 */
export function QuadraticBezierTangentFormula ( t, p0, p1, p2 ) {

	return 2 * ( 1 - t ) * ( p1 - p0 ) + 2 * t * ( p2 - p1 );

}

/**
 * 获取三次Bezier曲线的切线
 * @param {number} t  时间
 * @param {number} p0 第一个点
 * @param {number} p1 第一个控制点
 * @param {number} p2 第二个控制点
 * @param {number} p3 第二个点
 */
export function CubicBezierzTangentFormula( t, p0, p1, p2, p3 ) {

	return - 3 * p0 * ( 1 - t ) * ( 1 - t )  +
		3 * p1 * ( 1 - t ) * ( 1 - t ) - 6 * t * p1 * ( 1 - t ) +
		6 * t *  p2 * ( 1 - t ) - 3 * t * t * p2 +
		3 * t * t * p3;

}