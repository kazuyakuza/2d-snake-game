import ENV from "../environment";

export class Player {
  private _lives: number = ENV.PLAYER.INITIAL_LIVES;
  public get lives() {
    return this._lives;
  }

  private _points: number = 0;
  public get points() {
    return this._points;
  }

  public clear() {
    this._lives = ENV.PLAYER.INITIAL_LIVES;
    this._points = 0;
  }

  public modifyPoints(pts: number, add = true) {
    if (add) this._points += pts;
    else this._points -= pts;
  }

  public modifyLives(lives: number, add = true) {
    if (add) this._lives += lives;
    else this._lives -= lives;
  }
}
