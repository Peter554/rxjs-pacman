import { produce } from 'immer';

import { GameState } from '../_models/game-state';
import { getGameCoordinateNeighbour } from '../_helpers/get-game-coordinate-neighbour';
import { GameCoordinateArrayHelper } from '../_helpers/game-coordinate-array-helper';
import { evolveGhost } from '../_helpers/evolve-ghost-position';

export const reduceNextFrame = (state: GameState): GameState => {
  return produce(state, draft => {
    if (!draft.gameIsStopped && !draft.gameIsOver) {
      draft.frames += 1;

      const tryPlayerAt = getGameCoordinateNeighbour(draft.player.at, draft.player.facing, 19, 21);
      if (!GameCoordinateArrayHelper.contains(draft.wallsAt, tryPlayerAt)) {
        draft.player.at = tryPlayerAt;
      }

      if (GameCoordinateArrayHelper.contains(draft.ghosts.map(o => o.at), draft.player.at)) {
        draft.gameIsOver = true;
      }

      if (!draft.gameIsOver) {
        draft.ghosts.forEach(ghost => {
          evolveGhost(ghost, draft.wallsAt);
        });

        if (GameCoordinateArrayHelper.contains(draft.ghosts.map(o => o.at), draft.player.at)) {
          draft.gameIsOver = true;
          draft.gameIsStopped = true;
        }

        if (GameCoordinateArrayHelper.contains(draft.gemsAt, draft.player.at)) {
          draft.gemsAt = GameCoordinateArrayHelper.remove(draft.gemsAt, draft.player.at);
          draft.score++;
        }
      }
    }
  });
};
