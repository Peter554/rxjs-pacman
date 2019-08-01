import { GameCoordinate } from './game-coordinate';
import { Direction } from './direction';

export interface PlayerState {
  at: GameCoordinate;
  facing: Direction;
  
}
