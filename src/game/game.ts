import ENV from "../environment";
import logger from "../utils/logger";
import { Point } from "../utils/point.interface";
import { CanvasHandler } from "./canvas-handler";
import { FoodStore } from "./food-store";
import { GameProps } from "./game-props";
import { Player } from "./player";
import { PlayerController } from "./player-controller";
import { Snake } from "./snake";

export class Game {
  private prop?: GameProps;
  private loopTimeout?: NodeJS.Timeout;

  constructor(
    private readonly ctx: CanvasRenderingContext2D,
    private readonly canvasWidth: number,
    private readonly canvasHeight: number,
  ) { }

  public start() {
    this.generateProps();
    this.prop?.ctrl.enable();
    this.loopTimeout = setInterval(this.loop.bind(this), ENV.GAME_LOOP_MS);
  }

  private generateProps() {
    this.prop = {
      player: new Player(),
      ctrl: new PlayerController(),
      canvas: new CanvasHandler(
        this.ctx, this.canvasWidth, this.canvasHeight,
      ),
      snake: new Snake({
        location: this.snakeInitialLocation(),
        bodyParts: ENV.SNAKE.INITIAL_BODY_PARTS,
        initialDirection: ENV.SNAKE.INITIAL_DIRECTION,
      }),
      food: new FoodStore(),
    };
  }

  private snakeInitialLocation(): Point {
    // TODO rnd initial position
    return {
      x: this.canvasWidth / ENV.GRID_SIZE / 2 - 1,
      y: this.canvasHeight / ENV.GRID_SIZE / 2 - 1,
    };
  }

  private loop() {
    this.update();
    this.prop?.canvas.draw({
      snake: this.prop.snake,
      food: this.prop.food,
    });
  }

  private update() {
    this.applyControllerDirection();
    this.prop?.snake.move();
    // check collisions
    // check food collisions
  }

  private applyControllerDirection() {
    this.prop!.snake.direction = this.prop!.ctrl.direction;
  }

  private end() {
    this.prop?.ctrl.disable();
    clearInterval(this.loopTimeout);
  }
}
