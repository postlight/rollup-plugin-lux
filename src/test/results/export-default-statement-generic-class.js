class Point {
  constructor(x, y) {
    Object.assign(this, { x, y });
  }
}

Object.defineProperty(Point, 'name', { value: 'Point' });

export default Point;
