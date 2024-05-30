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

  public addPoints(pts: number) {
    this._points += pts;
  }

  public addLives(lives: number) {
    this._lives += lives;
  }
}
