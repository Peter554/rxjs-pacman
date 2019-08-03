import { Direction } from '../_models/direction';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DirectionHelper {
  public turnRight(direction: Direction): Direction {
    return (direction + 1) % 4;
  }

  public turnAround(direction: Direction): Direction {
    return (direction + 2) % 4;
  }

  public turnLeft(direction: Direction): Direction {
    return (direction + 3) % 4;
  }
}
