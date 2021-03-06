import { Injectable } from '@angular/core';
import { GameState } from '../_models/game-state';
import { Direction } from '../_models/direction';
import { GhostState } from '../_models/ghost-state';
import { GameCoordinate } from '../_models/game-coordinate';
import { GameCoordinateHelper } from './game-coordinate-helper';

@Injectable({
  providedIn: 'root'
})
export class InitialStateFactory {
  constructor(private readonly _gameCoordinateHelper: GameCoordinateHelper) {}

  public getInitialState(): GameState {
    return {
      gameIsStopped: false,
      gameIsOver: false,
      frames: 0,
      player: {
        at: [2, 2],
        facing: Direction.Right
      },
      score: 0,
      wallsAt: this._getWallCoordinates(),
      gemsAt: this._getGemCoordinates(),
      ghosts: this._getGhostCoordinates()
    };
  }

  private _getGhostCoordinates(): GhostState[] {
    return [
      { at: [9, 11], facing: Direction.Right },
      { at: [10, 11], facing: Direction.Up },
      { at: [11, 11], facing: Direction.Left }
    ];
  }

  private _getWallCoordinates(): GameCoordinate[] {
    return [
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 1],
      [5, 1],
      [6, 1],
      [7, 1],
      [8, 1],
      [9, 1],
      [10, 1],
      [11, 1],
      [12, 1],
      [13, 1],
      [14, 1],
      [15, 1],
      [16, 1],
      [17, 1],
      [18, 1],
      [19, 1],
      [20, 1],
      [21, 1],

      [1, 21],
      [2, 21],
      [3, 21],
      [4, 21],
      [5, 21],
      [6, 21],
      [7, 21],
      [8, 21],
      [9, 21],
      [10, 21],
      [11, 21],
      [12, 21],
      [13, 21],
      [14, 21],
      [15, 21],
      [16, 21],
      [17, 21],
      [18, 21],
      [19, 21],
      [20, 21],
      [21, 21],

      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5],
      [1, 6],
      [1, 7],
      [1, 8],
      [1, 9],
      [1, 10],
      [1, 12],
      [1, 13],
      [1, 14],
      [1, 15],
      [1, 16],
      [1, 17],
      [1, 18],
      [1, 19],
      [1, 20],
      [1, 21],

      [19, 2],
      [19, 3],
      [19, 4],
      [19, 5],
      [19, 6],
      [19, 7],
      [19, 8],
      [19, 9],
      [19, 10],
      [19, 12],
      [19, 13],
      [19, 14],
      [19, 15],
      [19, 16],
      [19, 17],
      [19, 18],
      [19, 19],
      [19, 20],
      [19, 21],

      [2, 8],
      [3, 8],
      [4, 8],
      [2, 9],
      [3, 9],
      [4, 9],
      [2, 10],
      [3, 10],
      [4, 10],

      [2, 12],
      [3, 12],
      [4, 12],
      [2, 13],
      [3, 13],
      [4, 13],
      [2, 14],
      [3, 14],
      [4, 14],

      [16, 8],
      [17, 8],
      [18, 8],
      [16, 9],
      [17, 9],
      [18, 9],
      [16, 10],
      [17, 10],
      [18, 10],

      [16, 12],
      [17, 12],
      [18, 12],
      [16, 13],
      [17, 13],
      [18, 13],
      [16, 14],
      [17, 14],
      [18, 14],

      [3, 3],
      [3, 4],
      [4, 3],
      [4, 4],

      [16, 3],
      [16, 4],
      [17, 3],
      [17, 4],

      [16, 18],
      [16, 19],
      [17, 18],
      [17, 19],

      [3, 18],
      [3, 19],
      [4, 18],
      [4, 19],

      [8, 10],
      [8, 11],
      [8, 12],
      [9, 12],
      [10, 12],
      [11, 12],
      [12, 12],
      [12, 11],
      [12, 10],
      [9, 10],
      [11, 10],

      [10, 2],
      [10, 3],
      [10, 4],

      [10, 18],
      [10, 19],
      [10, 20],

      [6, 3],
      [6, 4],
      [7, 3],
      [7, 4],
      [8, 3],
      [8, 4],

      [12, 3],
      [12, 4],
      [13, 3],
      [13, 4],
      [14, 3],
      [14, 4],

      [12, 18],
      [12, 19],
      [13, 18],
      [13, 19],
      [14, 18],
      [14, 19],

      [6, 18],
      [6, 19],
      [7, 18],
      [7, 19],
      [8, 18],
      [8, 19],

      [3, 6],
      [4, 6],

      [16, 6],
      [17, 6],

      [3, 16],
      [4, 16],

      [16, 16],
      [17, 16],

      [8, 6],
      [9, 6],
      [10, 6],
      [11, 6],
      [12, 6],
      [10, 7],
      [10, 8],

      [8, 16],
      [9, 16],
      [10, 16],
      [11, 16],
      [12, 16],
      [10, 15],
      [10, 14],

      [6, 6],
      [6, 7],
      [6, 8],
      [6, 9],
      [6, 10],
      [7, 8],
      [8, 8],

      [6, 12],
      [6, 13],
      [6, 14],
      [6, 15],
      [6, 16],
      [7, 14],
      [8, 14],

      [14, 6],
      [14, 7],
      [14, 8],
      [14, 9],
      [14, 10],
      [13, 8],
      [12, 8],

      [14, 12],
      [14, 13],
      [14, 14],
      [14, 15],
      [14, 16],
      [13, 14],
      [12, 14]
    ];
  }

  private _getAllGameCoordinates(cellsX: number, cellsY: number): GameCoordinate[] {
    const coordinates: GameCoordinate[] = [];

    for (let i = 0; i < cellsX; i++) {
      for (let j = 0; j < cellsY; j++) {
        coordinates.push([i + 1, j + 1]);
      }
    }

    return coordinates;
  }

  private _getGemCoordinates(): GameCoordinate[] {
    let gems = this._getAllGameCoordinates(19, 21).filter(o => !this._gameCoordinateHelper.areEqual(o, [2, 2]));

    this._getWallCoordinates().forEach(wall => {
      gems = gems.filter(o => !this._gameCoordinateHelper.areEqual(o, wall));
    });

    return gems;
  }
}
