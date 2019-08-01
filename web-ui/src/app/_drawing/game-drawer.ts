import { Injectable } from '@angular/core';

import { CanvasDrawer } from './canvas-drawer';
import { GameState } from '../_models/game-state';
import { BackgroundDrawer } from './background-drawer';
import { PacmanDrawer } from './pacman-drawer';
import { GemDrawer } from './gem-drawer';
import { WallDrawer } from './wall-drawer';
import { GhostDrawer } from './ghost-drawer';

@Injectable({
  providedIn: 'root'
})
export class GameDrawer extends CanvasDrawer<GameState> {
  constructor() {
    super();

    this._backgroundDrawer = new BackgroundDrawer();
    this._pacmanDrawer = new PacmanDrawer();
    this._wallDrawer = new WallDrawer();
    this._gemDrawer = new GemDrawer();
    this._ghostDrawer = new GhostDrawer();
  }

  private readonly _backgroundDrawer: BackgroundDrawer;
  private readonly _pacmanDrawer: PacmanDrawer;
  private readonly _wallDrawer: WallDrawer;
  private readonly _gemDrawer: GemDrawer;
  private readonly _ghostDrawer: GhostDrawer;

  public draw(state: GameState): void {
    this._backgroundDrawer.draw({ cellsX: 19, cellsY: 21 });

    state.wallsAt.forEach(coordinate => {
      this._wallDrawer.draw({ at: coordinate });
    });

    state.gemsAt.forEach(coordinate => {
      this._gemDrawer.draw({ at: coordinate });
    });

    this._pacmanDrawer.draw({ at: state.player.at, facing: state.player.facing });

    state.ghosts.forEach(ghost => {
      this._ghostDrawer.draw({ at: ghost.at, facing: ghost.facing });
    });
  }

  public setContext(context: CanvasRenderingContext2D): GameDrawer {
    this.context = context;

    this._backgroundDrawer.setContext(context);
    this._pacmanDrawer.setContext(context);
    this._wallDrawer.setContext(context);
    this._gemDrawer.setContext(context);
    this._ghostDrawer.setContext(context);

    return this;
  }

  public setCellSize(size: number): GameDrawer {
    this._backgroundDrawer.setCellSize(size);
    this._pacmanDrawer.setCellSize(size);
    this._wallDrawer.setCellSize(size);
    this._gemDrawer.setCellSize(size);
    this._ghostDrawer.setCellSize(size);

    return this;
  }
}
