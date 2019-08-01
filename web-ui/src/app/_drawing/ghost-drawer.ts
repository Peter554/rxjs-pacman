import { CanvasDrawer } from './canvas-drawer';
import { GameCoordinate } from '../_models/game-coordinate';
import { Direction } from '../_models/direction';

interface GhostDrawArgs {
  at: GameCoordinate;
  facing: Direction;
}

export class GhostDrawer extends CanvasDrawer<GhostDrawArgs> {
  public draw(args: GhostDrawArgs): void {
    const center = this.getCenter(args.at);
    this.context.translate(center[0], center[1]);
    this.context.rotate((args.facing * Math.PI) / 2);
    this.context.scale(0.7, 0.7);

    this.context.beginPath();

    this.context.moveTo(0, -0.5 * this.cellSize);
    this.context.lineTo(0.5 * this.cellSize, 0.5 * this.cellSize);
    this.context.lineTo(-0.5 * this.cellSize, 0.5 * this.cellSize);
    this.context.closePath();

    this.context.fillStyle = '#f00';
    this.context.fill();

    this.context.setTransform(1, 0, 0, 1, 0, 0);
  }
}
