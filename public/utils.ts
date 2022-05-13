export const WIDTH = 1000;
export const HEIGHT = 500;

export const isSameDir = (dir1: Point, dir2: Point) => {
  if (
    ((dir1.x > 0 && dir2.x > 0) || (dir1.x < 0 && dir2.x < 0)) &&
    ((dir1.y > 0 && dir2.y > 0) || (dir1.y < 0 && dir2.y < 0))
  ) {
    return true;
  }
  return false;
};

export interface Point {
  x: number;
  y: number;
}

export interface BallStatus {
  pos: Point;
  dir: Point;
  radius: number;
}
