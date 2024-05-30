import { Direction } from "./utils/direction";

class Environment {
  public readonly LOGGING_LEVEL = 'all';
  public readonly KEY = Object.freeze({
    UP: ['ArrowUp', 'w'],
    DOWN: ['ArrowDown', 's'],
    LEFT: ['ArrowLeft', 'a'],
    RIGHT: ['ArrowRight', 'd'],
  });
  public readonly SNAKE = Object.freeze({
    INITIAL_BODY_PARTS: 4,
    INITIAL_DIRECTION: new Direction(),
  });
  public readonly FOOD = Object.freeze({
    PROBABILITY_NEW_FOOD: 10, // in %
    POINTS_PER_FOOD: 3,
  });
  public readonly PLAYER = Object.freeze({
    INITIAL_LIVES: 3,
  });
  public readonly GRID_SIZE = 10;
  public readonly GAME_SPEED = 200; // game loop time in ms
}
const ENV = Object.freeze(new Environment());
export default ENV;
