import { Injectable } from '@angular/core';
import { CanvasDrawer } from './canvas-drawer';

interface BackgroundDrawArgs {
  cellsX: number;
  cellsY: number;
}

@Injectable({
  providedIn: 'root'
})
export class BackgroundDrawer extends CanvasDrawer<BackgroundDrawArgs> {
  public draw(args: BackgroundDrawArgs): void {
    const canvasSizeX = this.cellSize * args.cellsX;
    const canvasSizeY = this.cellSize * args.cellsY;

    this.context.clearRect(0, 0, canvasSizeX, canvasSizeY);
    this.context.fillStyle = '#000';
    this.context.fillRect(0, 0, canvasSizeX, canvasSizeY);
  }
}
