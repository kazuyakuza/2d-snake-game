import { Point } from "./point";
import rnd from "./rnd";

export abstract class Entity {
  public readonly id = rnd.guid();
  public get location() { return this._location; }

  constructor(
    protected _location: Point,
  ) { }
}
