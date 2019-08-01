import { Injectable } from '@angular/core';
import { CanvasDrawer } from './canvas-drawer';
import { GameCoordinate } from '../_models/game-coordinate';

interface GemDrawArgs {
  at: GameCoordinate;
}

@Injectable({
  providedIn: 'root'
})
export class GemDrawer extends CanvasDrawer<GemDrawArgs> {
  public draw(args: GemDrawArgs): void {
    const center = this.getCenter(args.at);
    this.context.translate(center[0], center[1]);
    this.context.rotate(0.25 * Math.PI);

    const scale = 0.1 + Math.random() / 25;
    this.context.scale(scale, scale);

    this.context.fillStyle = '#fff';
    this.context.fillRect(-0.5 * this.cellSize, -0.5 * this.cellSize, this.cellSize, this.cellSize);

    this.context.setTransform(1, 0, 0, 1, 0, 0);
  }
}
