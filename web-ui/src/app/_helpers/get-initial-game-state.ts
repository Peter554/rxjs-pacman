import { GameState } from '../_models/game-state';
import { GameCoordinate } from '../_models/game-coordinate';
import { GameCoordinateArrayHelper } from './game-coordinate-array-helper';
import { Direction } from '../_models/direction';
import { GhostState } from '../_models/ghost-state';
import { getWallCoordinates } from './get-wall-coordinates';

const getAllGameCoordinates = (cellsX = 10, cellsY = 10): GameCoordinate[] => {
  const coordinates: GameCoordinate[] = [];

  for (let i = 0; i < cellsX; i++) {
    for (let j = 0; j < cellsY; j++) {
      coordinates.push([i + 1, j + 1]);
    }
  }

  return coordinates;
};

const getGemCoordinates = (): GameCoordinate[] => {
  let gems = GameCoordinateArrayHelper.remove(getAllGameCoordinates(19, 21), [2, 2]);

  getWallCoordinates().forEach(wall => {
    gems = GameCoordinateArrayHelper.remove(gems, wall);
  });

  return gems;
};

const getGhostCoordinates = (): GhostState[] => {
  return [
    { at: [9, 11], facing: Direction.Right },
    { at: [10, 11], facing: Direction.Up },
    { at: [11, 11], facing: Direction.Left }
  ];
};

export const getInitialGameState = (): GameState => {
  return {
    gameIsStopped: false,
    gameIsOver: false,
    frames: 0,
    player: {
      at: [2, 2],
      facing: Direction.Right
    },
    score: 0,
    wallsAt: getWallCoordinates(),
    gemsAt: getGemCoordinates(),
    ghosts: getGhostCoordinates()
  };
};
