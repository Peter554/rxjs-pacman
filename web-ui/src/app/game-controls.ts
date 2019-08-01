import { Injectable, NgZone } from '@angular/core';
import * as Mousetrap from 'mousetrap';

import { KeyUpAction } from './_actions/key-up-action';
import { KeyDownAction } from './_actions/key-down-action';
import { KeyLeftAction } from './_actions/key-left-action';
import { KeyRightAction } from './_actions/key-right-action';
import { Action } from './_actions/action';

@Injectable({
  providedIn: 'root'
})
export class GameControls {
  constructor(private readonly _ngZone: NgZone) {}

  public setupKeybindings(dispatch: (action: Action) => void): void {
    Mousetrap.bind('w', () => {
      this._ngZone.run(() => {
        dispatch(new KeyUpAction());
      });
    });

    Mousetrap.bind('s', () => {
      this._ngZone.run(() => {
        dispatch(new KeyDownAction());
      });
    });

    Mousetrap.bind('a', () => {
      this._ngZone.run(() => {
        dispatch(new KeyLeftAction());
      });
    });

    Mousetrap.bind('d', () => {
      this._ngZone.run(() => {
        dispatch(new KeyRightAction());
      });
    });
  }
}
