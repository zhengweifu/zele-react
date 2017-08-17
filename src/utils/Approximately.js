   import { EPSILON } from './config';

   export default (a, b, precision) => {
      return Math.abs(a - b) <= (precision || EPSILON);
    };