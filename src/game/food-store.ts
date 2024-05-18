import { Food } from "./food";

export class FoodStore {
  private _store: Food[] = [];
  public get store() {
    return Object.freeze(this._store);
  }
}
