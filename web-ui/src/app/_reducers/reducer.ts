import { Action } from '../_actions/action';
import { GameState } from '../_models/game-state';

export interface Reducer<T extends Action> {
  reduce(state: GameState, action: T): GameState;
}
