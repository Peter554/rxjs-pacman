import { Injectable } from '@angular/core';

import { CanvasDrawer } from './canvas-drawer';
import { GameCoordinate } from '../_models/game-coordinate';
import { Direction } from '../_models/direction';

interface PacmacDrawArgs {
  at: GameCoordinate;
  facing: Direction;
}

@Injectable({
  providedIn: 'root'
})
export class PacmanDrawer extends CanvasDrawer<PacmacDrawArgs> {
  public draw(args: PacmacDrawArgs): void {
    const topLeft = this.getTopLeft(args.at);

    this.context.beginPath();

    const startAngle = 0.2 * Math.PI + this._mapDirectionToAngle(args.facing);

    this.context.arc(
      topLeft[0] + 0.5 * this.cellSize,
      topLeft[1] + 0.5 * this.cellSize,
      0.35 * this.cellSize,
      startAngle,
      startAngle + 1.6 * Math.PI
    );

    this.context.lineTo(topLeft[0] + 0.5 * this.cellSize, topLeft[1] + 0.5 * this.cellSize);
    this.context.closePath();

    this.context.fillStyle = '#ff0';
    this.context.fill();
  }

  private _mapDirectionToAngle(direction: Direction): number {
    switch (direction) {
      case Direction.Right:
        return 0;
      case Direction.Down:
        return 0.5 * Math.PI;
      case Direction.Left:
        return Math.PI;
      case Direction.Up:
        return 1.5 * Math.PI;
    }
  }
}
