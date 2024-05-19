import { Grid } from "../utils/grid";
import { Point } from "../utils/point";
import { Snake } from "./snake";

export class CollisionsDetector {
  constructor(
    private readonly grid: Grid,
  ) { }

  public checkSnakeWallCollision(snake: Snake) {
    for (const part of snake.body)
      if (this.checkLocationWallCollision(part))
        return true;
    return false;
  }

  public checkLocationWallCollision(location: Point) {
    return location.x < this.grid.topLeft.x
      || location.x >= this.grid.bottomRight.x
      || location.y < this.grid.topLeft.y
      || location.y >= this.grid.bottomRight.y;
  }
}
