import { CanvasDrawer } from './canvas-drawer';
import { GameCoordinate } from '../_models/game-coordinate';

interface WallDrawArgs {
  at: GameCoordinate;
}

export class WallDrawer extends CanvasDrawer<WallDrawArgs> {
  public draw(args: WallDrawArgs): void {
    const topLeft = this.getTopLeft(args.at);

    this.context.fillStyle = '#223';
    this.context.fillRect(topLeft[0], topLeft[1], this.cellSize, this.cellSize);
  }
}
