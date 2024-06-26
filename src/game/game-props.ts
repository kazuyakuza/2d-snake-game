import { GuiManager } from "../gui/gui-manager";
import { Grid } from "../utils/grid";
import { CanvasHandler } from "./canvas-handler";
import { CollisionsDetector } from "./collisions-detector";
import { FoodStore } from "./food-store";
import { Player } from "./player";
import { PlayerController } from "./player-controller";
import { Snake } from "./snake";

export interface GameProps {
  player: Player;
  ctrl: PlayerController;
  canvas: CanvasHandler;
  grid: Grid;
  collision: CollisionsDetector,
  snake: Snake;
  food: FoodStore;
  gui: GuiManager;
}
