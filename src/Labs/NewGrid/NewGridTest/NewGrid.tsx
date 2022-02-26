import style from "./NewGrid.module.scss";
import { useState, useEffect } from "react";

const getRandom = (a: number, b: number) => {
  return Math.random() * (b - a) + a;
};

const discreteGenerator = (a: number, interval: number) => {
  return 5 * (Math.abs((a % interval) - interval / 2) + 1) + getRandom(-1, 1);
};

export default function NewGrid() {
  useEffect(() => {
    const app = new App();
  }, []);

  return <div className={style.container} id="CanvasWrapper"></div>;
}

class App {
  wrapper: any;
  canvas: any;
  ctx: any;
  stageWidth: any;
  stageHeight: any;
  particles: any;
  particlesNum: any;
  particlesNumHeight: any;
  particlesNumWidth: any;

  temp: any;

  constructor() {
    this.wrapper = document.getElementById("CanvasWrapper");
    this.canvas = document.createElement("canvas");
    this.wrapper.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];

    this.resize();
  }

  resize() {
    this.stageWidth = this.wrapper.clientWidth;
    this.stageHeight = this.wrapper.clientHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;
    this.ctx.scale(1, 1);

    this.ctx.globalCompositeOperation = "soft-light";
    this.particlesNumHeight = Math.ceil(this.stageHeight / 10);
    this.particlesNumWidth = Math.ceil(this.stageWidth / 10);
    this.init();
  }

  calculator(i: any, j: any) {
    return Math.abs(
      10 -
        ((i - this.particlesNumWidth / 4) ** 2 +
          (j - this.particlesNumHeight / 3) * 80) /
          100
    );
  }

  init() {
    for (var i = 0; i < this.particlesNumWidth; i++) {
      for (var j = 0; j < this.particlesNumHeight; j++) {
        this.particles.push(
          new Point(
            (i * this.stageWidth) / this.particlesNumWidth,
            (j * this.stageHeight) / this.particlesNumHeight,
            this.calculator(i, j)
          )
        );
      }
    }

    for (var i = 0; i < this.particlesNumWidth; i++) {
      for (var j = 0; j < this.particlesNumHeight; j++) {
        this.particles[i * this.particlesNumHeight + j].draw(this.ctx);
      }
    }
  }
}

class Point {
  x: any;
  y: any;
  size: any;
  time: any;

  constructor(x: any, y: any, size: any) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  draw(ctx: any) {
    ctx.beginPath();
    ctx.fillRect(
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size,
      this.size
    );
    ctx.fillStyle = "black";
    ctx.fill();
  }
}
