import { GameCoordinate } from '../_models/game-coordinate';
import { Direction } from '../_models/direction';

export const getGameCoordinateNeighbour = (
  coordinate: GameCoordinate,
  direction: Direction,
  cellsX: number,
  cellsY: number
): GameCoordinate => {
  const dx = direction === Direction.Left ? -1 : direction === Direction.Right ? +1 : 0;
  const dy = direction === Direction.Up ? -1 : direction === Direction.Down ? +1 : 0;

  let [xNew, yNew] = [coordinate[0] + dx, coordinate[1] + dy];

  xNew = ((xNew - 1 + cellsX) % cellsX) + 1;
  yNew = ((yNew - 1 + cellsY) % cellsY) + 1;

  return [xNew, yNew];
};
