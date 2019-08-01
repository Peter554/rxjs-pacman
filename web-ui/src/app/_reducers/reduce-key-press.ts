import { produce } from 'immer';

import { GameState } from '../_models/game-state';
import { Direction } from '../_models/direction';

export const reduceKeyPress = (state: GameState, direction: Direction): GameState => {
  return produce(state, draft => {
    if (!draft.gameIsStopped && !draft.gameIsOver) {
      draft.player.facing = direction;
    }
  });
};
