export class Point {
  constructor(
    public readonly x: number,
    public readonly y: number,
  ) { }

  public equals(point: Point) {
    return this.x === point.x
      && this.y === point.y;
  }

  public setX(newValue: number) {
    return new Point(newValue, this.y);
  }

  public setY(newValue: number) {
    return new Point(this.x, newValue);
  }

  public static zero() {
    return new Point(0, 0);
  }

  public static from(point: Point) {
    return new Point(point.x, point.y);
  }

  public static new({ x, y }: {
    x: number,
    y: number,
  }) {
    return new Point(x, y);
  }
}
