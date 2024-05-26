import { Entity } from "../utils/entity";
import { Point } from "../utils/point";
import { Direction } from "../utils/direction";
import logger from "../utils/logger";

export class Snake extends Entity {
  private _body: {
    location: Point,
    /**
     * when a part is overlapping, it doesn't collide with other body parts
     */
    overlapping: boolean,
  }[] = [];
  public get body() {
    return Object.freeze([...this._body]);
  }
  public get head() {
    return this._body[0];
  }
  public get tail() {
    return this._body[this._body.length - 1];
  }
  private _direction: Direction;
  public set direction(newDirection: Direction) {
    this._direction = newDirection;
  }
  public get direction() {
    return this._direction;
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
    this._body.push({
      location: location,
      overlapping: true,
    });
    this.addNewTails(bodyParts - 1);
    this.updateBodyParts();
  }

  public consumeFood() {
    this.addNewTails(1);
  }

  private addNewTails(bodyParts: number) {
    for (let i = 0; i < bodyParts; i++)
      this._body.push(this.tail);
  }

  public move() {
    this.updateBodyParts();
    this._location = this.head.location;
  }

  private updateBodyParts() {
    let location: Point;
    for (let i = this._body.length - 1; i >= 0; i--) {
      location = Point.new({
        x: this.calculatePosX(i),
        y: this.calculatePosY(i),
      });
      this._body[i] = {
        location,
        overlapping: location.equals(this._body[i].location),
      };
    }
  }

  private calculatePosX(bodyPart: number) {
    // TODO add checks
    if (bodyPart === 0) return this._location.x + this._direction!.x;
    return this._body[bodyPart - 1].location.x;
  }

  private calculatePosY(bodyPart: number) {
    // TODO add checks
    if (bodyPart === 0) return this._location.y + this._direction!.y;
    return this._body[bodyPart - 1].location.y;
  }
}
