import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';

import { GameState } from '../_models/game-state';
import { GameEngine, FPS } from '../game-engine';
import { Observable, NEVER, interval } from 'rxjs';
import { map, tap, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { GameDrawer } from '../_drawing/game-drawer';
import { RestartGameAction } from '../_actions/restart-game-action';
import { GameStoppedToggleAction } from '../_actions/game-stopped-toggle.action';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html'
})
export class GameComponent implements OnInit {
  constructor(private readonly _gameEngine: GameEngine, private readonly _gameDrawer: GameDrawer) {
    this.state$ = this._gameEngine.state$;

    this.gameIsStopped$ = this.state$.pipe(map(o => o.gameIsStopped));
    this.gameIsOver$ = this.state$.pipe(map(o => o.gameIsOver));
    this.gameTime$ = this.state$.pipe(map(o => Math.floor(o.frames / FPS)));
    this.playerScore$ = this.state$.pipe(map(o => o.score));
  }

  @ViewChild('canvas', { static: true })
  public canvasRef!: ElementRef;

  public readonly state$: Observable<GameState>;
  public readonly gameIsStopped$: Observable<boolean>;
  public readonly gameIsOver$: Observable<boolean>;
  public readonly gameTime$: Observable<number>;
  public readonly playerScore$: Observable<number>;

  public ngOnInit(): void {
    const canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    this._gameDrawer.setContext(context).setCellSize(100);

    const drawEffect$ = this.state$.pipe(
      tap(state => {
        this._gameDrawer.draw(state);
      })
    );

    drawEffect$.subscribe();

    this._gameEngine.start();
    this._gameEngine.startSound();
  }

  public handleClickOnRestart(): void {
    this._gameEngine.dispatch(new RestartGameAction());
  }

  public handleClickOnPause(): void {
    this._gameEngine.dispatch(new GameStoppedToggleAction());
  }
}
