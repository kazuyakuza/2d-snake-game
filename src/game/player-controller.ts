import ENV from "../environment";
import { Direction } from "../utils/direction";

export class PlayerController {
  private _direction: Direction = new Direction();
  public get direction() { return this._direction; }
  private onKeyDownBinded = this.onKeyDown.bind(this);

  enable() {
    document.addEventListener('keydown', this.onKeyDownBinded);
  }

  disable() {
    document.removeEventListener('keydown', this.onKeyDownBinded);
  }

  private onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case ENV.KEY.UP: this.onPressUp(); break;
      case ENV.KEY.DOWN: this.onPressDown(); break;
      case ENV.KEY.LEFT: this.onPressLeft(); break;
      case ENV.KEY.RIGHT: this.onPressRight(); break;
    }
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
