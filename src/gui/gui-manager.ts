export class GuiManager {
  private pts!: HTMLLabelElement;
  private lives!: HTMLLabelElement;

  constructor() {
    this.getGuiRefs();
  }

  private getGuiRefs() {
    this.pts = <HTMLLabelElement><unknown>document.getElementById('points-label');
    this.lives = <HTMLLabelElement><unknown>document.getElementById('lives-label');
    this.clear();
  }

  private clear() {
    this.pts.innerText = '-';
    this.lives.innerText = '-';
  }

  public setPoints(pts: number) {
    this.pts.innerText = pts.toString();
  }

  public setLives(lives: number) {
    this.lives.innerText = lives.toString();
  }
}
