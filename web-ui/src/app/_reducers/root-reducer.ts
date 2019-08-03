import { Injectable } from '@angular/core';
import { produce } from 'immer';

import { Reducer } from './reducer';
import { Action } from '../_actions/action';
import { GameState } from '../_models/game-state';
import { KeyUpAction } from '../_actions/key-up-action';
import { KeyDownAction } from '../_actions/key-down-action';
import { KeyLeftAction } from '../_actions/key-left-action';
import { KeyRightAction } from '../_actions/key-right-action';
import { RestartGameAction } from '../_actions/restart-game-action';
import { GameStoppedToggleAction } from '../_actions/game-stopped-toggle.action';
import { NextFrameAction } from '../_actions/next-frame-action';
import { Direction } from '../_models/direction';
import { InitialStateFactory } from '../_helpers/initial-state-factory';
import { GameCoordinateHelper } from '../_helpers/game-coordinate-helper';
import { getGameCoordinateNeighbour } from '../_helpers/get-game-coordinate-neighbour';
import { GameCoordinate } from '../_models/game-coordinate';
import { GhostState } from '../_models/ghost-state';
import { turnLeft, turnRight, turnAround } from '../_helpers/direction-helpers';

@Injectable({
  providedIn: 'root'
})
export class RootReducer implements Reducer<Action> {
  constructor(
    private readonly _initialStateFactory: InitialStateFactory,
    private readonly _gameCoordinateHelper: GameCoordinateHelper
  ) {}

  public reduce(state: GameState, action: Action): GameState {
    if (action instanceof KeyUpAction) {
      return this._reduceKeyPress(state, Direction.Up);
    } else if (action instanceof KeyDownAction) {
      return this._reduceKeyPress(state, Direction.Down);
    } else if (action instanceof KeyLeftAction) {
      return this._reduceKeyPress(state, Direction.Left);
    } else if (action instanceof KeyRightAction) {
      return this._reduceKeyPress(state, Direction.Right);
    } else if (action instanceof NextFrameAction) {
      return this._reduceNextFrame(state);
    } else if (action instanceof GameStoppedToggleAction) {
      return this._reduceGameStoppedToggle(state);
    } else if (action instanceof RestartGameAction) {
      return this._initialStateFactory.getInitialState();
    } else {
      return state;
    }
  }

  private _reduceKeyPress(state: GameState, direction: Direction): GameState {
    return produce(state, draft => {
      if (!draft.gameIsStopped && !draft.gameIsOver) {
        draft.player.facing = direction;
      }
    });
  }

  private _reduceNextFrame(state: GameState): GameState {
    return produce(state, draft => {
      if (!draft.gameIsStopped && !draft.gameIsOver) {
        draft.frames += 1;

        const tryPlayerAt = getGameCoordinateNeighbour(draft.player.at, draft.player.facing, 19, 21);
        if (!this._gameCoordinateHelper.contains(draft.wallsAt, tryPlayerAt)) {
          draft.player.at = tryPlayerAt;
        }

        if (this._gameCoordinateHelper.contains(draft.ghosts.map(o => o.at), draft.player.at)) {
          draft.gameIsOver = true;
        }

        if (!draft.gameIsOver) {
          draft.ghosts.forEach(ghost => {
            this._evolveGhost(ghost, draft.wallsAt);
          });

          if (this._gameCoordinateHelper.contains(draft.ghosts.map(o => o.at), draft.player.at)) {
            draft.gameIsOver = true;
            draft.gameIsStopped = true;
          }

          if (this._gameCoordinateHelper.contains(draft.gemsAt, draft.player.at)) {
            draft.gemsAt = this._gameCoordinateHelper.remove(draft.gemsAt, draft.player.at);
            draft.score++;
          }
        }
      }
    });
  }

  private _reduceGameStoppedToggle(state: GameState): GameState {
    return produce(state, draft => {
      if (!draft.gameIsOver) {
        draft.gameIsStopped = !draft.gameIsStopped;
      }
    });
  }

  private _evolveGhost(ghost: GhostState, walls: GameCoordinate[]): void {
    let newFacing = ghost.facing;

    const newAt = (d: Direction) => getGameCoordinateNeighbour(ghost.at, d, 19, 21);
    const inWall = (d: Direction) => walls.some(o => new GameCoordinateHelper().areEqual(o, newAt(d)));

    if (Math.random() < 0.2) {
      newFacing = Math.random() < 0.5 ? turnLeft(ghost.facing) : turnRight(ghost.facing);
    }

    if (inWall(newFacing)) {
      newFacing = ghost.facing;
    }

    const leftFirst = Math.random() < 0.5;

    if (inWall(newFacing)) {
      newFacing = leftFirst ? turnLeft(ghost.facing) : turnRight(ghost.facing);
    }

    if (inWall(newFacing)) {
      newFacing = leftFirst ? turnRight(ghost.facing) : turnLeft(ghost.facing);
    }

    if (inWall(newFacing)) {
      newFacing = turnAround(ghost.facing);
    }

    ghost.facing = newFacing;
    ghost.at = newAt(newFacing);
  }
}
