import { Direction } from '../_models/direction';



export const turnRight = (direction: Direction): Direction => {
  return (direction + 1) % 4;
};

export const turnAround = (direction: Direction): Direction => {
  return (direction + 2) % 4;
};

export const turnLeft = (direction: Direction): Direction => {
  return (direction + 3) % 4;
};
