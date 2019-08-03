import { GameCoordinate } from '../_models/game-coordinate';
import { Injectable } from '@angular/core';
import { Direction } from '../_models/direction';

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

  public getNeighbour(
    coordinate: GameCoordinate,
    direction: Direction,
    cellsX: number,
    cellsY: number
  ): GameCoordinate {
    const dx = direction === Direction.Left ? -1 : direction === Direction.Right ? +1 : 0;
    const dy = direction === Direction.Up ? -1 : direction === Direction.Down ? +1 : 0;

    let [xNew, yNew] = [coordinate[0] + dx, coordinate[1] + dy];

    xNew = ((xNew - 1 + cellsX) % cellsX) + 1;
    yNew = ((yNew - 1 + cellsY) % cellsY) + 1;

    return [xNew, yNew];
  }
}
