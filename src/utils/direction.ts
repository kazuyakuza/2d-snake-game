import { Point } from "./point";

type DirectionName = 'none' | 'up' | 'down' | 'left' | 'right';

export class Direction {
  private readonly point: Point;
  public get x() { return this.point.x; }
  public get y() { return this.point.y; }

  constructor(
    public readonly name: DirectionName = 'none',
  ) {
    this.point = Point.zero();
    switch (name) {
      case 'up': {
        this.point = this.point.setY(-1);
        break;
      }
      case 'down': {
        this.point = this.point.setY(1);
        break;
      }
      case 'left': {
        this.point = this.point.setX(-1);
        break;
      }
      case 'right': {
        this.point = this.point.setX(1);
        break;
      }
    }
  }

  public is(direction: DirectionName) {
    return direction === this.name;
  }
}
