import { CanvasHandler } from "./canvas-handler";
import { FoodStore } from "./food-store";
import { Player } from "./player";
import { PlayerController } from "./player-controller";
import { Snake } from "./snake";

export interface GameProps {
  player: Player;
  ctrl: PlayerController;
  canvas: CanvasHandler;
  snake: Snake;
  food: FoodStore;
}
