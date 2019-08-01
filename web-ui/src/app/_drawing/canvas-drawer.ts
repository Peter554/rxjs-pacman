import { GameCoordinate } from '../_models/game-coordinate';
import { CanvasCoordinate } from '../_models/canvas-coordinate';

export abstract class CanvasDrawer<T> {
  protected cellSize = 10;
  protected context!: CanvasRenderingContext2D;

  public abstract draw(args: T): void;

  public setContext(context: CanvasRenderingContext2D): CanvasDrawer<T> {
    this.context = context;
    return this;
  }

  public setCellSize(size: number): CanvasDrawer<T> {
    this.cellSize = size;
    return this;
  }

  protected getTopLeft(coordinate: GameCoordinate): CanvasCoordinate {
    return [(coordinate[0] - 1) * this.cellSize, (coordinate[1] - 1) * this.cellSize];
  }

  protected getCenter(coordinate: GameCoordinate): CanvasCoordinate {
    const topLeft = this.getTopLeft(coordinate);
    return [topLeft[0] + 0.5 * this.cellSize, topLeft[1] + 0.5 * this.cellSize];
  }
}
