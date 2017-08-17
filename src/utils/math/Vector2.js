import Approximately from '../Approximately';

class Vector2 {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }

    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    equals(v2) {
        return this === v2 || v2
                && (this.x === v2.x && this.y === v2.y
                    || Array.isArray(v2)
                        && this.x === v2[0] && this.y === v2[1])
                || false;
    }

    copy(v2) {
        this.x = v2.x;
        this.y = v2.y;
        return this;
    }

    clone() {
        return new Vector2(this.x, this.y);
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    distanceToSquared(v2) {
        let dx = this.x - v2.x, dy = this.y - v2.y;
        return dx * dx + dy * dy;
    }
    distanceTo(v2) {
        return Math.sqrt(this.distanceToSquared(v2));
    }

    normalize(length) {
        if (length === undefined) {
            length = 1;
        }

        this.divideScalar( this.length() ).multiplyScalar( length );
            
        return this;
    }

    add(v2) {
        this.x += v2.x;
        this.y += v2.y;
        return this;
    }

    subtract(v2) {
        this.x -= v2.x;
        this.y -= v2.y;
        return this;
    }

    multiply(v2) {
        this.x *= v2.x;
        this.y *= v2.y;
        return this;
    }

    multiplyScalar(s) {
        this.x *= s;
        this.y *= s;

        return this;
    }

    divide(v2) {
        this.x /= v2.x;
        this.y /= v2.y;

        return this;
    }

    divideScalar(s) {
        return this.multiplyScalar( 1 / s );
    }

    modulo(v2) {
        this.x %= v2.x;
        this.y %= v2.y;
        return this;
    }

    negate() {
        return this.multiplyScalar(-1);
    }

    isZero() {
        return this.x == 0 && this.y == 0;
    }

    isNaN() {
        return isNaN(this.x) || isNaN(this.y);
    }

    isApproximately(v2) {
        return Approximately(this.x, v2.x) && Approximately(this.y, v2.y);
    }

    dot(v2) {
        return this.x * v2.x + this.y * v2.y;
    }

    cross(v2) {
        return this.x * v2.y - this.y * v2.x;
    }

    fromArray(array) {
        this.x = array[0];
        this.y = array[1];

        return this;
    }

    toArray() {
        return [this.x, this.y];
    }

    toObject() {
        return {
            x: this.x,
            y: this.y
        };
    }
}

export default Vector2;
