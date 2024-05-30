import ENV from "../environment";
import logger from "../utils/logger";
import { Point } from "../utils/point";
import rnd from "../utils/rnd";
import { Food } from "./food";
import { Snake } from "./snake";

export class FoodStore {
  private _store: Food[] = [];
  public get store() {
    return Object.freeze([...this._store]);
  }

  constructor(
    private readonly snake: Snake,
  ) { }

  public rndGenerateFood([min, max]: number[]) {
    if (!rnd.bool({ likelihood: ENV.FOOD.PROBABILITY_NEW_FOOD })) return;
    this.generateFood([min, max]);
  }

  private generateFood([min, max]: number[]) {
    let locationTaken;
    let location: Point | undefined = undefined;
    const MAX_ITERATIONS = 99999;
    for (let it = 0; it < MAX_ITERATIONS; it++) {
      location = new Point(
        rnd.integer({ min, max }),
        rnd.integer({ min, max }),
      );
      locationTaken = this.checkOverlapsOtherFood(location)
        || this.checOverlapsSnake(location);
      if (!locationTaken) break;
    }
    if (!location || locationTaken)
      throw new Error('All locations taken when generation a new food');
    const food = new Food(location);
    this._store.push(food) - 1;
  }

  private checOverlapsSnake(location: Point) {
    for (const part of this.snake.body)
      if (part.location.equals(location))
        return true;
    return false;
  }

  private checkOverlapsOtherFood(location: Point) {
    for (const food of this._store)
      if (food.location.equals(location))
        return true;
    return false;
  }

  public consumeFood(food: Food) {
    this._store = this._store.filter(f => f.id !== food.id);
  }
}
