import style from "./GridTestingCentre.module.scss";
import { useState, useEffect } from "react";

const getRandom = (a: number, b: number) => {
  return Math.random() * (b - a) + a;
};

export default function GridTest() {
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

  gridUnitWidth: any;

  particles: any;
  particlesNumX: any;
  particlesNumY: any;
  particlesNum: any;

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

    this.gridUnitWidth = 36;
    this.particlesNumX = Math.ceil(this.stageWidth / this.gridUnitWidth);
    this.particlesNumY = Math.ceil(this.stageHeight / this.gridUnitWidth);

    for (let i = 0; i < this.stageWidth; i += this.gridUnitWidth) {
      for (let j = 0; j < this.stageHeight; j += this.gridUnitWidth) {
        this.particles.push(new Particle(i, j, this.gridUnitWidth));
      }
    }
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.particles.map((particle: any) => particle.draw(this.ctx));
  }
}

class Particle {
  x: any;
  y: any;
  size: any;
  divider: any;
  unitSize: any;

  fillStyle: any;

  constructor(x: any, y: any, size: any) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.divider = Math.random() < 0.5 ? 4 : 5;
    this.unitSize = this.size / this.divider;

    this.fillStyle = {
      h: 220,
      s: getRandom(50, 100),
      l: 50,
    };
  }

  draw(ctx: any) {
    const getRandomColor = () =>
      `hsl(${this.fillStyle.h + getRandom(-50, 50)}, ${this.fillStyle.s}%, ${
        this.fillStyle.l
      }%)`;
    for (let i = 0; i < this.divider; i++) {
      for (let j = 0; j < this.divider; j++) {
        const horizontalOrVertical = Math.random() < 0.5 ? 0 : 1;
        let grd = ctx.createLinearGradient(
          this.x + i * this.unitSize,
          this.y + j * this.unitSize,
          this.x + (i + horizontalOrVertical) * this.unitSize,
          this.y + (j + 1 - horizontalOrVertical) * this.unitSize
        );
        const colorA = getRandomColor();
        const colorB = getRandomColor();
        grd.addColorStop(0.2, colorA);
        grd.addColorStop(0.8, colorB);

        ctx.fillStyle = grd;
        ctx.fillRect(
          this.x + i * this.unitSize,
          this.y + j * this.unitSize,
          this.unitSize,
          this.unitSize
        );
      }
    }
  }
}
