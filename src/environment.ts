import { Direction } from "./utils/direction";

class Environment {
  public readonly LOGGING_LEVEL = 'all';
  public readonly KEY = Object.freeze({
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
  });
  public readonly SNAKE = Object.freeze({
    INITIAL_BODY_PARTS: 4,
    INITIAL_DIRECTION: new Direction(),
  });
  public readonly GRID_SIZE = 10;
  public readonly GAME_SPEED = 200; // game loop time in ms
}
const ENV = Object.freeze(new Environment());
export default ENV;
