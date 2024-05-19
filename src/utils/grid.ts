import { Point } from "./point";

export class Grid {
  public readonly topLeft: Point;
  public readonly bottomRight: Point;
  public get width() {
    return Math.abs(this.bottomRight.x - this.topLeft.x);
  }
  public get height() {
    return Math.abs(this.bottomRight.y - this.topLeft.y);
  }

  constructor(numberOfCells: number) {
    this.topLeft = Point.zero();
    this.bottomRight = Point.new({ x: numberOfCells, y: numberOfCells });
  };
}
