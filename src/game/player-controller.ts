import * as EventEmitter from "events";
import ENV from "../environment";
import { Direction } from "../utils/direction";
import logger from "../utils/logger";

export class PlayerController {
  private _direction: Direction = new Direction();
  public get direction() { return this._direction; }
  private onKeyDownBinded = this._onKeyDown.bind(this);

  private readonly eventEmitter = new EventEmitter();
  public get events() {
    return {
      addListener: (eventName: string | symbol, listener: (...args: any[]) => void) => { this.eventEmitter.addListener(eventName, listener); },
      removeListener: (eventName: string | symbol, listener: (...args: any[]) => void) => { this.eventEmitter.removeListener(eventName, listener); },
    };
  }

  enable() {
    document.addEventListener('keydown', this.onKeyDownBinded);
  }

  disable() {
    document.removeEventListener('keydown', this.onKeyDownBinded);
  }

  private _onKeyDown(event: KeyboardEvent) {
    this.eventEmitter.emit('onKeyDown');
    if (ENV.KEY.UP.includes(event.key))
      return this.onPressUp();
    if (ENV.KEY.DOWN.includes(event.key))
      return this.onPressDown();
    if (ENV.KEY.LEFT.includes(event.key))
      return this.onPressLeft();
    if (ENV.KEY.RIGHT.includes(event.key))
      return this.onPressRight();
  }

  private onPressUp() {
    this._direction = new Direction('up');
  }

  private onPressDown() {
    this._direction = new Direction('down');
  }

  private onPressLeft() {
    this._direction = new Direction('left');
  }

  private onPressRight() {
    this._direction = new Direction('right');
  }
}
