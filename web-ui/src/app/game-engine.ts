import { Injectable } from '@angular/core';
import { Subject, Observable, NEVER, interval, timer } from 'rxjs';
import { scan, shareReplay, startWith, map, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { Howl } from 'howler';

import { GameState } from './_models/game-state';
import { Action } from './_actions/action';
import { getInitialGameState } from './_helpers/get-initial-game-state';
import { RootReducer } from './_reducers/root-reducer';
import { GameControls } from './game-controls';
import { NextFrameAction } from './_actions/next-frame-action';

export const FPS = 5;

@Injectable({ providedIn: 'root' })
export class GameEngine {
  constructor(private readonly _controls: GameControls, private readonly _reducer: RootReducer) {
    this._controls.setupKeybindings(this.dispatch.bind(this));

    this.actions$ = this._actions$.asObservable();

    this.state$ = this.actions$.pipe(
      scan<Action, GameState>(this._reducer.reduce, getInitialGameState()),
      startWith(getInitialGameState()),
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

    const sound = new Howl({
      src: ['assets/opening_song.mp3']
    });

    this._soundEffect$ = this.state$.pipe(
      map(o => o.gameIsStopped),
      distinctUntilChanged(),
      switchMap(o => (o ? NEVER : timer(0, 8000))),
      map(() => {}),
      tap(() => {
        sound.play();
      })
    );
  }

  public readonly actions$: Observable<Action>;
  public readonly state$: Observable<GameState>;

  private readonly _actions$ = new Subject<Action>();
  private readonly _framesEffect$: Observable<void>;
  private readonly _soundEffect$: Observable<void>;

  public start(): void {
    this._framesEffect$.subscribe();
  }

  public startSound(): void {
    this._soundEffect$.subscribe();
  }

  public dispatch(action: Action): void {
    this._actions$.next(action);
  }
}
