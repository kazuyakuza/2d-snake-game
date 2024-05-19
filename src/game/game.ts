import ENV from "../environment";
import { Grid } from "../utils/grid";
import logger from "../utils/logger";
import { Point } from "../utils/point";
import { CanvasHandler } from "./canvas-handler";
import { CollisionsDetector } from "./collisions-detector";
import { FoodStore } from "./food-store";
import { GameProps } from "./game-props";
import { Player } from "./player";
import { PlayerController } from "./player-controller";
import { Snake } from "./snake";

export class Game {
  private state: 'none' | 'playing' | 'end' = 'none';
  private prop!: GameProps;
  private loopTimeout?: NodeJS.Timeout;

  constructor(
    private readonly ctx: CanvasRenderingContext2D,
    private readonly canvasWidth: number,
    private readonly canvasHeight: number,
  ) { }

  public start() {
    this.generateProps();
    this.prop!.ctrl.enable();
    this.state = 'playing';
    this.loopTimeout = setInterval(this.loop.bind(this), ENV.GAME_SPEED);
  }

  private generateProps() {
    const grid = new Grid(
      this.canvasWidth / ENV.GRID_SIZE
      // TODO make grid "any" size (can be not square)
    );
    this.prop = {
      player: new Player(),
      ctrl: new PlayerController(),
      canvas: new CanvasHandler(
        this.ctx, this.canvasWidth, this.canvasHeight,
      ),
      grid,
      collision: new CollisionsDetector(grid),
      snake: new Snake({
        location: this.snakeInitialLocation(),
        bodyParts: ENV.SNAKE.INITIAL_BODY_PARTS,
        initialDirection: ENV.SNAKE.INITIAL_DIRECTION,
      }),
      food: new FoodStore(),
    };
  }

  private snakeInitialLocation(): Point {
    return new Point(
      this.canvasWidth / ENV.GRID_SIZE / 2 - 1,
      this.canvasHeight / ENV.GRID_SIZE / 2 - 1,
    );
  }

  private loop() {
    if (this.state !== 'playing') return;
    this.update();
    if (this.state !== 'playing') return;
    this.prop!.canvas.draw({
      snake: this.prop.snake,
      food: this.prop.food,
    });
  }

  private update() {
    this.applyControllerDirection();
    this.prop!.snake.move();
    this.checkCollisions();
    // check food collisions
    this.prop!.food.rndGenerateFood([0, this.prop.grid.width]);
  }

  private checkCollisions() {
    if (this.prop!.collision.checkSnakeWallCollision(this.prop.snake))
      this.onSnakeWallCollision();
  }

  private onSnakeWallCollision() {
    this.end();
  }

  private applyControllerDirection() {
    this.prop!.snake.direction = this.prop!.ctrl.direction;
  }

  private end() {
    this.state = 'end';
    this.prop!.ctrl.disable();
    clearInterval(this.loopTimeout);
    this.prop!.canvas.clear();
  }
}
