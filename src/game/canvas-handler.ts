import ENV from "../environment";
import { FoodStore } from "./food-store";
import { Snake } from "./snake";

export class CanvasHandler {
  constructor(
    private readonly ctx: CanvasRenderingContext2D,
    private readonly width: number,
    private readonly height: number,
  ) { }

  public draw({
    snake, food,
  }: {
    snake: Snake, food: FoodStore,
  }) {
    this.clear();
    this.drawSnake(snake);
    this.drawFood(food);
  }

  private clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  private drawSnake(snake: Snake) {
    this.ctx.fillStyle = 'lime';
    for (const bodyPart of snake.body)
      this.ctx.fillRect(
        bodyPart.x * ENV.GRID_SIZE,
        bodyPart.y * ENV.GRID_SIZE,
        ENV.GRID_SIZE,
        ENV.GRID_SIZE,
      );
  }

  private drawFood(food: FoodStore) {
    this.ctx.fillStyle = 'red';
    for (const f of food.store)
      this.ctx.fillRect(
        f.location.x * ENV.GRID_SIZE,
        f.location.y * ENV.GRID_SIZE,
        ENV.GRID_SIZE,
        ENV.GRID_SIZE,
      );
  }
}
