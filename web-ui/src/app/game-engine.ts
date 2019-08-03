import { Injectable } from '@angular/core';
import { Subject, Observable, NEVER, interval } from 'rxjs';
import { scan, shareReplay, startWith, map, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

import { GameState } from './_models/game-state';
import { Action } from './_actions/action';
import { RootReducer } from './_reducers/root-reducer';
import { GameControls } from './game-controls';
import { NextFrameAction } from './_actions/next-frame-action';
import { InitialStateFactory } from './_helpers/initial-state-factory';

export const FPS = 5;

@Injectable({ providedIn: 'root' })
export class GameEngine {
  constructor(
    private readonly _controls: GameControls,
    private readonly _reducer: RootReducer,
    private readonly _initialStateFactory: InitialStateFactory
  ) {
    this._controls.setupKeybindings(this.dispatch.bind(this));

    this.actions$ = this._actions$.asObservable();

    this.state$ = this.actions$.pipe(
      scan<Action, GameState>(
        (state, action) => this._reducer.reduce(state, action),
        this._initialStateFactory.getInitialState()
      ),
      startWith(this._initialStateFactory.getInitialState()),
      shareReplay(1)
    );

    this._framesEffect$ = this.state$.pipe(
      map(o => o.gameIsStopped),
      distinctUntilChanged(),
      switchMap(o => (o ? NEVER : interval(1000 / FPS))),
      map(() => {}),
      tap(() => {
        this.dispatch(new NextFrameAction());
      })
    );
  }

  public readonly actions$: Observable<Action>;
  public readonly state$: Observable<GameState>;

  private readonly _actions$ = new Subject<Action>();
  private readonly _framesEffect$: Observable<void>;

  public start(): void {
    this._framesEffect$.subscribe();
  }

  public dispatch(action: Action): void {
    this._actions$.next(action);
  }
}
