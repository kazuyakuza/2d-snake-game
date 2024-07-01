import ENV from "../environment";
import { GuiManager } from "../gui/gui-manager";
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
  private player1stMove = false;

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
    const snake = new Snake({
      location: this.snakeInitialLocation(),
      bodyParts: ENV.SNAKE.INITIAL_BODY_PARTS,
      initialDirection: ENV.SNAKE.INITIAL_DIRECTION,
    });
    this.p = {
      player: new Player(),
      ctrl: new PlayerController(),
      canvas: new CanvasHandler(
        this.ctx, this.canvasWidth, this.canvasHeight,
      ),
      grid,
      collision: new CollisionsDetector(grid),
      snake,
      food: new FoodStore(snake),
      gui: new GuiManager(),
    };
    this.listenPlayer1stMove();
  }

  private listenPlayer1stMove() {
    const f = () => {
      this.player1stMove = true;
      this.p.ctrl.events.removeListener('onKeyDown', f);
    };
    this.p.ctrl.events.addListener('onKeyDown', f);
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
    this.updateGUI();
  }

  private updateGUI() {
    this.p.gui.setLives(this.p.player.lives);
    this.p.gui.setPoints(this.p.player.points);
  }

  private update() {
    if (!this.player1stMove) return;
    this.applyControllerDirection();
    this.p.snake.move();
    this.checkCollisions();
    this.p.food.rndGenerateFood([0, this.p.grid.width]);
  }

  private checkCollisions() {
    if (this.p.collision.checkSnakeWallCollision(this.p.snake))
      this.onSnakeWallCollision();
    else if (this.p.collision.checkSnakeItselfCollision(this.p.snake))
      this.onItselfCollision();
    else this.checkFoodCollisions();
  }

  private checkFoodCollisions() {
    for (const food of this.p.food.store)
      if (this.p.collision.checkCollision([
        food.location, this.p.snake.location,
      ])) {
        this.p.food.consumeFood(food);
        this.p.snake.consumeFood();
        this.p.player.modifyPoints(ENV.FOOD.POINTS_PER_FOOD);
        return;
      }
  }

  private onItselfCollision() {
    this.playerLooseLife();
  }

  private onSnakeWallCollision() {
    this.playerLooseLife();
  }

  private playerLooseLife() {
    this.p.player.modifyLives(-1);
    if (this.p.player.lives < 0) {
      this.end();
      return;
    }
    this.p.snake.die();
    this.p.snake.rebirth({
      location: this.snakeInitialLocation(),
      bodyParts: ENV.SNAKE.INITIAL_BODY_PARTS,
      initialDirection: ENV.SNAKE.INITIAL_DIRECTION,
    });
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
