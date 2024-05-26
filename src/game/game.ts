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
  private p!: GameProps;
  private loopTimeout?: NodeJS.Timeout;

  constructor(
    private readonly ctx: CanvasRenderingContext2D,
    private readonly canvasWidth: number,
    private readonly canvasHeight: number,
  ) { }

  public start() {
    this.generateProps();
    this.p.ctrl.enable();
    this.state = 'playing';
    this.loopTimeout = setInterval(this.loop.bind(this), ENV.GAME_SPEED);
  }

  private generateProps() {
    const grid = new Grid(
      this.canvasWidth / ENV.GRID_SIZE
      // TODO make grid "any" size (can be not square)
    );
    this.p = {
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
    this.p.canvas.draw({
      snake: this.p.snake,
      food: this.p.food,
    });
  }

  private update() {
    this.applyControllerDirection();
    this.p.snake.move();
    this.checkCollisions();
    this.p.food.rndGenerateFood([0, this.p.grid.width]);
  }

  private checkCollisions() {
    if (this.p.collision.checkSnakeWallCollision(this.p.snake))
      this.onSnakeWallCollision();
    if (this.p.collision.checkSnakeItselfCollision(this.p.snake))
      this.onItselfCollision();
    // check food collisions
  }

  private onItselfCollision() {
    this.end();
  }

  private onSnakeWallCollision() {
    this.end();
  }

  private applyControllerDirection() {
    this.p.snake.direction = this.p.ctrl.direction;
  }

  private end() {
    this.state = 'end';
    this.p.ctrl.disable();
    clearInterval(this.loopTimeout);
    this.p.canvas.clear();
  }
}
