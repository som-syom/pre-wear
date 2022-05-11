import { WIDTH, HEIGHT } from "./utils.js";

export class Ball {
  private readonly radius: number;
  private x: number;
  private y: number;
  private vx: number;
  private vy: number;
  private minX!: number;
  private minY!: number;
  private maxX!: number;
  private maxY!: number;

  constructor(radius: number, speed: number) {
    this.radius = radius;
    this.vx = speed;
    this.vy = speed;

    const diameter = radius * 2;
    this.x = Math.floor(Math.random() * WIDTH - diameter * 2) + diameter;
    this.y = Math.floor(Math.random() * HEIGHT - diameter * 2) + diameter;
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.x += this.vx;
    this.y += this.vy;

    ctx.fillStyle = "#000000";
    this.bounce(WIDTH, HEIGHT);

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  bounce(width: number, height: number) {
    this.minX = this.radius;
    this.minY = this.radius;
    this.maxX = width - this.radius;
    this.maxY = height - this.radius;

    if (this.x < this.minX || this.x > this.maxX) {
      this.vx *= -1;
      this.x += this.vx;
    } else if (this.y < this.minY || this.y > this.maxY) {
      this.vy *= -1;
      this.y += this.vy;
    }
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
