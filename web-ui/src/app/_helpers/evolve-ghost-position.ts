import { GameCoordinate } from '../_models/game-coordinate';
import { GhostState } from '../_models/ghost-state';
import { turnLeft, turnAround, turnRight } from './direction-helpers';
import { getGameCoordinateNeighbour } from './get-game-coordinate-neighbour';
import { areEqual } from './are-equal';

export const evolveGhost = (ghost: GhostState, walls: GameCoordinate[]): void => {
  let newFacing = ghost.facing;
  const newAt = () => getGameCoordinateNeighbour(ghost.at, newFacing, 19, 21);
  const inWall = () => walls.some(o => areEqual(o, newAt()));

  if (Math.random() < 0.2) {
    newFacing = Math.random() < 0.5 ? turnLeft(ghost.facing) : turnRight(ghost.facing);
  }

  const leftFirst = Math.random() < 0.5;

  if (inWall()) {
    newFacing = leftFirst ? turnLeft(ghost.facing) : turnRight(ghost.facing);
  }

  if (inWall()) {
    newFacing = leftFirst ? turnRight(ghost.facing) : turnLeft(ghost.facing);
  }

  if (inWall()) {
    newFacing = turnAround(ghost.facing);
  }

  ghost.facing = newFacing;
  ghost.at = newAt();
};
