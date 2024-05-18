import 'bootstrap';
import './styles.scss';
import { Game } from './game/game';
class Main {
  private canvas: HTMLCanvasElement;
  private game: Game;

  constructor() {
    this.canvas = document.getElementsByTagName('canvas')[0];
    this.game = new Game(
      this.canvas.getContext('2d')!,
      this.canvas.width,
      this.canvas.height,
    );
  }

  public initGame() {
    this.game.start();
  }
}
new Main().initGame();
