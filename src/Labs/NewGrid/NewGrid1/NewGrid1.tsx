import style from "./NewGrid.module.scss";
import { useState, useEffect } from "react";

const getRandom = (a: number, b: number) => {
  return Math.random() * (b - a) + a;
};

const discreteGenerator = (a: number, interval: number) => {
  return Math.abs((a % interval) - interval / 2) + getRandom(-1, 1);
};

export default function NewGridTest() {
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

  temp: any;

  constructor() {
    this.wrapper = document.getElementById("CanvasWrapper");
    this.canvas = document.createElement("canvas");
    this.wrapper.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];

    this.resize();
    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = this.wrapper.clientWidth;
    this.stageHeight = this.wrapper.clientHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;
    this.ctx.scale(1, 1);

    this.ctx.globalCompositeOperation = "soft-light";
    this.particlesNum = Math.floor(this.stageHeight / 10);

    for (let i = 0; i < this.particlesNum; i++) {
      this.particles.push(
        new Row(
          (this.stageHeight * i) / this.particlesNum,
          discreteGenerator(i, 7),
          discreteGenerator(i, 30),
          this.stageWidth
        )
      );
    }
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    for (let i = 0; i < this.particlesNum; i++) {
      this.particles[i].draw(this.ctx);
    }
  }
}

class Row {
  y: any;
  distance: any;
  size: any;
  startPoint: any;
  number: any;
  stageWidth: any;

  constructor(y: any, distance: any, size: any, stageWidth: any) {
    this.y = y;
    this.distance = distance;
    this.size = size;
    this.number =
      Math.ceil((stageWidth + this.size) / (this.distance + this.size)) + 4;
    this.startPoint =
      stageWidth / 2 - (this.number / 2) * (this.distance + this.size);
  }

  draw(ctx: any) {
    for (let i = 0; i < this.number; i++) {
      ctx.beginPath();
      ctx.fillRect(
        (this.distance + this.size) * i - this.size / 2 + this.startPoint,
        this.y - this.size / 2,
        this.size,
        this.size
      );
      ctx.fillStyle = "black";

      ctx.fill();
    }
  }
}
