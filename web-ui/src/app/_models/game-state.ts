import { GameCoordinate } from './game-coordinate';
import { PlayerState } from './player-state';
import { GhostState } from './ghost-state';

export interface GameState {
  gameIsStopped: boolean;
  gameIsOver: boolean;
  frames: number;
  score: number;
  player: PlayerState;
  wallsAt: GameCoordinate[];
  gemsAt: GameCoordinate[];
  ghosts: GhostState[];
}
