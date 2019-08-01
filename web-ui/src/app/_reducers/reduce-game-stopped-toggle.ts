import { produce } from 'immer';

import { GameState } from '../_models/game-state';

export const reduceGameStoppedToggle = (state: GameState): GameState => {
  return produce(state, draft => {
    if (!draft.gameIsOver) {
      draft.gameIsStopped = !draft.gameIsStopped;
    }
  });
};
