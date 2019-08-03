import { GameCoordinate } from '../_models/game-coordinate';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameCoordinateHelper {
  public contains(coordinates: GameCoordinate[], coordinate: GameCoordinate): boolean {
    return coordinates.some(o => this.areEqual(o, coordinate));
  }

  public remove(coordinates: GameCoordinate[], coordinate: GameCoordinate): GameCoordinate[] {
    return coordinates.filter(o => !this.areEqual(o, coordinate));
  }

  public areEqual(a: GameCoordinate, b: GameCoordinate): boolean {
    return a[0] === b[0] && a[1] === b[1];
  }
}
