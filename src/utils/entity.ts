import { Point } from "./point";

export abstract class Entity {
  public get location() { return this._location; }

  constructor(
    protected _location: Point,
  ) { }
}
