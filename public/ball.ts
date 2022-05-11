import { WIDTH, HEIGHT, Point } from "./utils.js";

export class Ball {
  private readonly radius: number;
  private pos: Point = { x: 0, y: 0 };
  private dir: Point = { x: 0, y: 0 };
  private min: Point = { x: 0, y: 0 };
  private max: Point = { x: 0, y: 0 };

  constructor(radius: number, speed: number) {
    this.radius = radius;
    this.dir.x = speed;
    this.dir.y = speed;

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
    } else if (this.pos.y < this.min.y || this.pos.y > this.max.y) {
      this.dir.y *= -1;
      this.pos.y += this.dir.y;
    }
  }

  getPos() {
    return this.pos;
  }

  getRadius() {
    return this.radius;
  }
}

export class Balls {
  balls: Ball[] = [];
  constructor(num: number) {
    for (let i = 0; i < num; i++) {
      const radius = Math.floor(Math.random() * 20) + 10;
      const speed = Math.floor(Math.random() * 10) + 1;
      this.balls.push(new Ball(radius, speed));
    }
  }

  allDraw(ctx: CanvasRenderingContext2D) {
    this.balls.forEach((ball) => {
      ball.draw(ctx);
    });
  }
}
