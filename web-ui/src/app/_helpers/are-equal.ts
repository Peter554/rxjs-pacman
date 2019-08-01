import { GameCoordinate } from '../_models/game-coordinate';

export const areEqual = (a: GameCoordinate, b: GameCoordinate): boolean => {
  return a[0] === b[0] && a[1] === b[1];
};
