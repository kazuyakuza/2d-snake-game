import { Entity } from "../utils/entity";
import { Point } from "../utils/point";
import { Direction } from "../utils/direction";

export class Snake extends Entity {
  private _body: Point[] = [];
  public get body() {
    return Object.freeze([...this._body]);
  }
  private get head() {
    return this._body[0];
  }
  private get tail() {
    return this._body[this._body.length - 1];
  }
  private _direction: Direction;
  public set direction(newDirection: Direction) {
    this._direction = newDirection;
  }

  constructor({
    bodyParts, location, initialDirection,
  }: {
    bodyParts: number,
    location: Point,
    initialDirection: Direction,
  }) {
    // TODO add validations
    super(location);
    this._direction = initialDirection;
    this._body.push(location);
    this.addNewTails(bodyParts - 1);
    this.updateBodyParts();
  }

  private addNewTails(bodyParts: number) {
    for (let i = 0; i < bodyParts; i++)
      this._body.push(this.tail);
  }

  public move() {
    this.updateBodyParts();
    this._location = this.head;
  }

  private updateBodyParts() {
    for (let i = this._body!.length - 1; i >= 0; i--) {
      this._body![i] = Point.new({
        x: this.calculatePosX(i),
        y: this.calculatePosY(i),
      });
    }
  }

  private calculatePosX(bodyPart: number) {
    // TODO add checks
    if (bodyPart === 0) return this._location.x + this._direction!.x;
    return this._body![bodyPart - 1].x;
  }

  private calculatePosY(bodyPart: number) {
    // TODO add checks
    if (bodyPart === 0) return this._location.y + this._direction!.y;
    return this._body![bodyPart - 1].y;
  }
}
