import { Injectable } from '@angular/core';

import { Reducer } from './reducer';
import { Action } from '../_actions/action';
import { GameState } from '../_models/game-state';
import { KeyUpAction } from '../_actions/key-up-action';
import { KeyDownAction } from '../_actions/key-down-action';
import { KeyLeftAction } from '../_actions/key-left-action';
import { KeyRightAction } from '../_actions/key-right-action';
import { RestartGameAction } from '../_actions/restart-game-action';
import { reduceKeyPress } from './reduce-key-press';
import { GameStoppedToggleAction } from '../_actions/game-stopped-toggle.action';
import { reduceGameStoppedToggle } from './reduce-game-stopped-toggle';
import { NextFrameAction } from '../_actions/next-frame-action';
import { reduceNextFrame } from './reduce-next-frame';
import { Direction } from '../_models/direction';
import { InitialStateFactory } from '../_helpers/initial-state-factory';

@Injectable({
  providedIn: 'root'
})
export class RootReducer implements Reducer<Action> {
  constructor(private readonly _initialStateFactory: InitialStateFactory) {}

  public reduce(state: GameState, action: Action): GameState {
    if (action instanceof KeyUpAction) {
      return reduceKeyPress(state, Direction.Up);
    } else if (action instanceof KeyDownAction) {
      return reduceKeyPress(state, Direction.Down);
    } else if (action instanceof KeyLeftAction) {
      return reduceKeyPress(state, Direction.Left);
    } else if (action instanceof KeyRightAction) {
      return reduceKeyPress(state, Direction.Right);
    } else if (action instanceof NextFrameAction) {
      return reduceNextFrame(state);
    } else if (action instanceof GameStoppedToggleAction) {
      return reduceGameStoppedToggle(state);
    } else if (action instanceof RestartGameAction) {
      return this._initialStateFactory.getInitialState();
    } else {
      return state;
    }
  }
}
