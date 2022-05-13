import { WIDTH, HEIGHT, Point, BallStatus, isSameDir } from "./utils.js";

export class Ball {
  private readonly radius: number;
  private pos: Point = { x: 0, y: 0 };
  private dir: Point = { x: 0, y: 0 };
  private min: Point = { x: 0, y: 0 };
  private max: Point = { x: 0, y: 0 };

  constructor(radius: number, speed: number) {
    this.radius = radius;
    this.dir.x = Math.random() > 0.5 ? speed : -speed;
    this.dir.y = Math.random() > 0.5 ? speed : -speed;

    const diameter = radius * 2;
    this.pos.x = Math.floor(Math.random() * (WIDTH - diameter * 2)) + diameter;
    this.pos.y = Math.floor(Math.random() * (HEIGHT - diameter * 2)) + diameter;
    console.log(this.pos);
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.pos.x += this.dir.x;
    this.pos.y += this.dir.y;

    ctx.fillStyle = "#000000";
    this.bounce(WIDTH, HEIGHT);

    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  bounce(width: number, height: number) {
    this.min.x = this.radius;
    this.min.y = this.radius;
    this.max.x = width - this.radius;
    this.max.y = height - this.radius;

    if (this.pos.x < this.min.x || this.pos.x > this.max.x) {
      this.dir.x *= -1;
      this.pos.x += this.dir.x;
    }
    if (this.pos.y < this.min.y || this.pos.y > this.max.y) {
      this.dir.y *= -1;
      this.pos.y += this.dir.y;
    }
  }

  getPos() {
    return this.pos;
  }

  getDir() {
    return this.dir;
  }

  getRadius() {
    return this.radius;
  }

  setDir(dir: Point) {
    this.dir = dir;
  }

  setPos(pos: Point) {
    this.pos = pos;
  }
}

export class Balls {
  balls: Ball[] = [];
  status: BallStatus[] = [];
  constructor(num: number) {
    for (let i = 0; i < num; i++) {
      const radius = Math.floor(Math.random() * 20) + 10;
      const speed = Math.floor(Math.random() * 4) + 2;
      const newItem = new Ball(radius, speed);
      while (this.checkSamePos(newItem)) {
        newItem.setPos({
          x: Math.floor(Math.random() * (WIDTH - radius * 2)) + radius,
          y: Math.floor(Math.random() * (HEIGHT - radius * 2)) + radius,
        });
      }
      this.balls.push(newItem);
      this.status.push({
        pos: this.balls[i].getPos(),
        dir: this.balls[i].getDir(),
        radius: radius,
      });
    }
  }

  checkSamePos(ball: Ball) {
    for (let i = 0; i < this.balls.length; i++) {
      const minDistance = this.balls[i].getRadius() + ball.getRadius();
      const deltaX = ball.getPos().x - this.balls[i].getPos().x;
      const deltaY = ball.getPos().y - this.balls[i].getPos().y;

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      console.log(distance, minDistance);
      if (distance < minDistance) {
        return true;
      }
    }
    return false;
  }

  updatePosDir = () => {
    this.status.forEach((ball, index) => {
      ball.pos = this.balls[index].getPos();
      ball.dir = this.balls[index].getDir();
    });
  };

  rotate = (dir: Point, angle: number) => {
    const x = dir.x * Math.cos(angle) - dir.y * Math.sin(angle);
    const y = dir.x * Math.sin(angle) + dir.y * Math.cos(angle);
    return { x, y };
  };

  ballCollision = (ball1: Ball, ball2: Ball) => {
    const stat1 = this.status[this.balls.indexOf(ball1)];
    const stat2 = this.status[this.balls.indexOf(ball2)];

    const deltaX = stat1.pos.x - stat2.pos.x;
    const deltaY = stat1.pos.y - stat2.pos.y;

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const minDistance = stat1.radius + stat2.radius;

    if (distance <= minDistance) {
      let angle = Math.atan2(deltaY, deltaX);

      const speed1 = Math.sqrt(
        stat1.dir.x * stat1.dir.x + stat1.dir.y * stat1.dir.y
      );
      const speed2 = Math.sqrt(
        stat2.dir.x * stat2.dir.x + stat2.dir.y * stat2.dir.y
      );

      const tmp1 = Math.atan2(stat1.dir.y, stat1.dir.x);
      const tmp2 = Math.atan2(stat2.dir.y, stat2.dir.x);

      const direction = (tmp1 - angle) * (speed1 / (speed1 + speed2));
      const direction2 = (tmp2 - angle) * (speed2 / (speed1 + speed2));

      let newDir1 = {
        x: Math.cos(angle + direction) * speed1,
        y: Math.sin(angle + direction) * speed1,
      };
      let newDir2 = {
        x: Math.cos(angle + direction2) * speed2,
        y: Math.sin(angle + direction2) * speed2,
      };

      if (isSameDir(newDir1, newDir2)) {
        newDir1 = { x: newDir1.x, y: newDir1.y };
        newDir2 = { x: -newDir2.x, y: -newDir2.y };
      }

      ball1.setDir(newDir1);
      ball2.setDir(newDir2);
    }
  };

  collision = () => {
    const list: number[][] = [];
    for (let i = 0; i < this.balls.length; i++) {
      for (let j = i + 1; j < this.balls.length; j++) {
        if (
          i !== j &&
          list.find((item) => item[0] === j && item[1] === i) === undefined
        ) {
          list.push([i, j]);
          this.ballCollision(this.balls[i], this.balls[j]);
        }
      }
    }
  };

  allDraw(ctx: CanvasRenderingContext2D) {
    this.updatePosDir();

    this.collision();

    this.balls.forEach((ball) => {
      ball.draw(ctx);
    });
  }
}
