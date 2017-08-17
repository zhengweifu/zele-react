import Point from './math/Point2';

import { EPSILON, TOLERANCE } from './config';

export default {
    fit: function(points, error) {
        let length = points.length,
            bezierPoints = null;
        if (length > 0) {
            // To support reducing paths with multiple points in the same place
            // to one segment:
            bezierPoints = [points[0].clone()];
            if (length > 1) {
                this.fitCubic(
                    points, 
                    bezierPoints, 
                    error, 
                    0, 
                    length - 1,
                    // Left Tangent
                    points[1].clone().subtract(points[0]),
                    // Right Tangent
                    points[length - 2].clone().subtract(points[length - 1])
                );
            }
        }

        return bezierPoints;
    },

    // Fit a Bezier curve to a (sub)set of digitized points
    fitCubic: function(points, bezierPoints, error, first, last, tan1, tan2) {
        //  Use heuristic if region only has two points in it
        if (last - first === 1) {
            let pt1 = points[first],
                pt2 = points[last],
                dist = pt1.distanceTo(pt2) / 3;
            this.addCurve(bezierPoints, [
                pt1, 
                pt1.clone().add(tan1.clone().normalize(dist)), 
                pt2.clone().add(tan2.clone().normalize(dist)), 
                pt2
            ]);
            return;
        }
        // Parameterize points, and attempt to fit curve
        let uPrime = this.chordLengthParameterize(points, first, last),
            maxError = Math.max(error, error * error),
            split,
            parametersInOrder = true;
        // Try 4 iterations
        for (let i = 0; i <= 4; i++) {
            let curve = this.generateBezier(points, first, last, uPrime, tan1, tan2);
            //  Find max deviation of points to fitted curve
            let max = this.findMaxError(points, first, last, curve, uPrime);

            if (max.error < error && parametersInOrder) {
                this.addCurve(bezierPoints, curve);
                return;
            }
            split = max.index;
            // If error not too large, try reparameterization and iteration
            if (max.error >= maxError) {
                break;
            }
            parametersInOrder = this.reparameterize(points, first, last, uPrime, curve);
            maxError = max.error;
        }
        // Fitting failed -- split at max error point and fit recursively
        let tanCenter = points[split - 1].clone().subtract(points[split + 1]);
        this.fitCubic(points, bezierPoints, error, first, split, tan1, tanCenter);
        this.fitCubic(points, bezierPoints, error, split, last, tanCenter.negate(), tan2);
    },

    addCurve: function(bezierPoints, curve) {
        // let prev = bezierPoints[bezierPoints.length - 1];
        // prev.setHandleOut(curve[1].subtract(curve[0]));
        // bezierPoints.push(new Segment(curve[3], curve[2].subtract(curve[3])));
        // 
        // 
        let c1 = curve[1].isNaN() ? curve[0].clone() : curve[1].clone();
        let c2 = curve[2].isNaN() ? curve[3].clone() : curve[2].clone();

        bezierPoints.push(
            c1, 
            c2,
            curve[3].clone()
        );
    },

    // Use least-squares method to find Bezier control points for region.
    generateBezier: function(points, first, last, uPrime, tan1, tan2) {
        let epsilon = EPSILON,
            abs = Math.abs,
            pt1 = points[first].clone(),
            pt2 = points[last].clone(),
            // Create the C and X matrices
            C = [[0, 0], [0, 0]],
            X = [0, 0];

        for (let i = 0, l = last - first + 1; i < l; i++) {
            let u = uPrime[i],
                t = 1 - u,
                b = 3 * u * t,
                b0 = t * t * t,
                b1 = b * t,
                b2 = b * u,
                b3 = u * u * u,
                a1 = tan1.clone().normalize(b1),
                a2 = tan2.clone().normalize(b2),
                tmp = points[first + i].clone()
                    .subtract(pt1.clone().multiplyScalar(b0 + b1))
                    .subtract(pt2.clone().multiplyScalar(b2 + b3));
            C[0][0] += a1.dot(a1);
            C[0][1] += a1.dot(a2);
            // C[1][0] += a1.dot(a2);
            C[1][0] = C[0][1];
            C[1][1] += a2.dot(a2);
            X[0] += a1.dot(tmp);
            X[1] += a2.dot(tmp);
        }

        // Compute the determinants of C and X
        let detC0C1 = C[0][0] * C[1][1] - C[1][0] * C[0][1],
            alpha1, alpha2;
        if (abs(detC0C1) > epsilon) {
            // Kramer's rule
            let detC0X  = C[0][0] * X[1]    - C[1][0] * X[0],
                detXC1  = X[0]    * C[1][1] - X[1]    * C[0][1];
            // Derive alpha values
            alpha1 = detXC1 / detC0C1;
            alpha2 = detC0X / detC0C1;
        } else {
            // Matrix is under-determined, try assuming alpha1 == alpha2
            let c0 = C[0][0] + C[0][1],
                c1 = C[1][0] + C[1][1];
            if (abs(c0) > epsilon) {
                alpha1 = alpha2 = X[0] / c0;
            } else if (abs(c1) > epsilon) {
                alpha1 = alpha2 = X[1] / c1;
            } else {
                // Handle below
                alpha1 = alpha2 = 0;
            }
        }

        // If alpha negative, use the Wu/Barsky heuristic (see text)
        // (if alpha is 0, you get coincident control points that lead to
        // divide by zero in any subsequent NewtonRaphsonRootFind() call.
        let segLength = pt2.distanceTo(pt1),
            eps = epsilon * segLength,
            handle1,
            handle2;
        if (alpha1 < eps || alpha2 < eps) {
            // fall back on standard (probably inaccurate) formula,
            // and subdivide further if needed.
            alpha1 = alpha2 = segLength / 3;
        } else {
            // Check if the found control points are in the right order when
            // projected onto the line through pt1 and pt2.
            let line = pt2.clone().subtract(pt1);
            // Control points 1 and 2 are positioned an alpha distance out
            // on the tangent vectors, left and right, respectively
            handle1 = tan1.clone().normalize(alpha1);
            handle2 = tan2.clone().normalize(alpha2);
            if (handle1.dot(line) - handle2.dot(line) > segLength * segLength) {
                // Fall back to the Wu/Barsky heuristic above.
                alpha1 = alpha2 = segLength / 3;
                handle1 = handle2 = null; // Force recalculation
            }
        }

        // First and last control points of the Bezier curve are
        // positioned exactly at the first and last data points
        return [
            pt1,
            pt1.clone().add(handle1 || tan1.clone().normalize(alpha1)),
            pt2.clone().add(handle2 || tan2.clone().normalize(alpha2)),
            pt2
        ];
    },

    // Given set of points and their parameterization, try to find
    // a better parameterization.
    reparameterize: function(points, first, last, u, curve) {
        for (let i = first; i <= last; i++) {
            u[i - first] = this.findRoot(curve, points[i], u[i - first]);
        }
        // Detect if the new parameterization has reordered the points.
        // In that case, we would fit the points of the path in the wrong order.
        for (let i = 1, l = u.length; i < l; i++) {
            if (u[i] <= u[i - 1]) {
                return false;
            }
        }
        return true;
    },

    // Use Newton-Raphson iteration to find better root.
    findRoot: function(curve, point, u) {
        let curve1 = [],
            curve2 = [];
        // Generate control vertices for Q'
        for (let i = 0; i <= 2; i++) {
            curve1[i] = curve[i + 1].clone().subtract(curve[i]).multiplyScalar(3);
        }
        // Generate control vertices for Q''
        for (let i = 0; i <= 1; i++) {
            curve2[i] = curve1[i + 1].clone().subtract(curve1[i]).multiplyScalar(2);
        }
        // Compute Q(u), Q'(u) and Q''(u)
        let pt = this.evaluate(3, curve, u),
            pt1 = this.evaluate(2, curve1, u),
            pt2 = this.evaluate(1, curve2, u),
            diff = pt.clone().subtract(point),
            df = pt1.dot(pt1) + diff.dot(pt2);
        // Compute f(u) / f'(u)
        if (Math.abs(df) < TOLERANCE) {
            return u;
        }
        // u = u - f(u) / f'(u)
        return u - diff.dot(pt1) / df;
    },

    // Evaluate a bezier curve at a particular parameter value
    evaluate: function(degree, curve, t) {
        // Copy array
        let tmp = curve.slice();
        // Triangle computation
        for (let i = 1; i <= degree; i++) {
            for (let j = 0; j <= degree - i; j++) {
                tmp[j] = tmp[j].clone().multiplyScalar(1 - t).add(tmp[j + 1].clone().multiplyScalar(t));
            }
        }
        return tmp[0];
    },

    // Assign parameter values to digitized points
    // using relative distances between points.
    chordLengthParameterize: function(points, first, last) {
        let u = [0];
        for (let i = first + 1; i <= last; i++) {
            u[i - first] = u[i - first - 1] + points[i].distanceTo(points[i - 1]);
        }
        for (let i = 1, m = last - first; i <= m; i++) {
            u[i] /= u[m];
        }
        return u;
    },

    // Find the maximum squared distance of digitized points to fitted curve.
    findMaxError: function(points, first, last, curve, u) {
        let index = Math.floor((last - first + 1) / 2),
            maxDist = 0;
        for (let i = first + 1; i < last; i++) {
            let v = this.evaluate(3, curve, u[i - first]).clone().subtract(points[i]);
            let dist = v.x * v.x + v.y * v.y; // squared
            if (dist >= maxDist) {
                maxDist = dist;
                index = i;
            }
        }
        return {
            error: maxDist,
            index: index
        };
    }
};