import logger from "../utils/logger";
import { Point } from "../utils/point";
import rnd from "../utils/rnd";
import { Food } from "./food";

export class FoodStore {
  private _store: Food[] = [];
  public get store() {
    return Object.freeze([...this._store]);
  }

  public rndGenerateFood([min, max]: number[]) {
    if (!rnd.bool({ likelihood: 25 })) return;
    this.generateFood([min, max]);
  }

  private generateFood([min, max]: number[]) {
    let locationTaken;
    let location: Point;
    do {
      locationTaken = false;
      location = new Point(
        rnd.integer({ min, max }),
        rnd.integer({ min, max }),
      );
      for (const food of this._store)
        if (food.location.equals(location)) {
          locationTaken = true;
          break;
        }
      // TODO handle all locations taken
    } while (locationTaken);
    const food = new Food(location);
    this._store.push(food) - 1;
  }

  public consumeFood(food: Food) {
    this._store = this._store.filter(f => f.id !== food.id);
  }
}
