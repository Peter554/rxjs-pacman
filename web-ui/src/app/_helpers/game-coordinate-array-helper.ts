import { GameCoordinate } from '../_models/game-coordinate';

export class GameCoordinateArrayHelper {
  public static contains(coordinates: GameCoordinate[], coordinate: GameCoordinate): boolean {
    return coordinates.some(o => this._equal(o, coordinate));
  }

  public static remove(coordinates: GameCoordinate[], coordinate: GameCoordinate): GameCoordinate[] {
    return coordinates.filter(o => !this._equal(o, coordinate));
  }

  private static _equal(a: GameCoordinate, b: GameCoordinate): boolean {
    return a[0] === b[0] && a[1] === b[1];
  }
}
