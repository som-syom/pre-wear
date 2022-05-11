import { Ball, Balls } from "./ball.js";

class Canvas {
  canvas: HTMLCanvasElement | null;
  ctx: CanvasRenderingContext2D | null;
  ball: Balls;

  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.id = "canvas";
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = 1000;
    this.canvas.height = 500;

    this.ball = new Balls(5);

    const container = document.getElementById("container");
    if (container) container.appendChild(this.canvas);
    window.requestAnimationFrame(this.animate);
  }
  animate = () => {
    window.requestAnimationFrame(this.animate);
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ball.allDraw(this.ctx);
    }
  };
}

window.onload = () => {
  new Canvas();
};

console.log("hi");
