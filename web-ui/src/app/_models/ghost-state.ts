import { GameCoordinate } from './game-coordinate';
import { Direction } from './direction';

export interface GhostState {
  at: GameCoordinate;
  facing: Direction;
}
