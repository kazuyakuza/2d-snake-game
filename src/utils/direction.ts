import { Point } from "./point.interface";

type DirectionName = 'none' | 'up' | 'down' | 'left' | 'right';

export class Direction {
  private readonly point: Point;
  public get x() { return this.point.x; }
  public get y() { return this.point.y; }

  constructor(
    public readonly name: DirectionName = 'none',
  ) {
    this.point = { x: 0, y: 0 };
    switch (name) {
      case 'up': {
        this.point.y = -1;
        break;
      }
      case 'down': {
        this.point.y = 1;
        break;
      }
      case 'left': {
        this.point.x = -1;
        break;
      }
      case 'right': {
        this.point.x = 1;
        break;
      }
    }
  }

  public is(direction: DirectionName) {
    return direction === this.name;
  }
}
