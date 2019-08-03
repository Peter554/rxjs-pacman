import { GameCoordinate } from '../_models/game-coordinate';
import { GhostState } from '../_models/ghost-state';
import { turnLeft, turnAround, turnRight } from './direction-helpers';
import { getGameCoordinateNeighbour } from './get-game-coordinate-neighbour';
import { Direction } from '../_models/direction';
import { GameCoordinateHelper } from './game-coordinate-helper';

export const evolveGhost = (ghost: GhostState, walls: GameCoordinate[]): void => {
  let newFacing = ghost.facing;

  const newAt = (d: Direction) => getGameCoordinateNeighbour(ghost.at, d, 19, 21);
  const inWall = (d: Direction) => walls.some(o => new GameCoordinateHelper().areEqual(o, newAt(d)));

  if (Math.random() < 0.2) {
    newFacing = Math.random() < 0.5 ? turnLeft(ghost.facing) : turnRight(ghost.facing);
  }

  if (inWall(newFacing)) {
    newFacing = ghost.facing;
  }

  const leftFirst = Math.random() < 0.5;

  if (inWall(newFacing)) {
    newFacing = leftFirst ? turnLeft(ghost.facing) : turnRight(ghost.facing);
  }

  if (inWall(newFacing)) {
    newFacing = leftFirst ? turnRight(ghost.facing) : turnLeft(ghost.facing);
  }

  if (inWall(newFacing)) {
    newFacing = turnAround(ghost.facing);
  }

  ghost.facing = newFacing;
  ghost.at = newAt(newFacing);
};
