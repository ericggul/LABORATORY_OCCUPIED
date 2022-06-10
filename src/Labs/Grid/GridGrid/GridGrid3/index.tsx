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

    this.gridUnitWidth = 20;
    this.particlesNumX = Math.ceil(this.stageWidth / this.gridUnitWidth);
    this.particlesNumY = Math.ceil(this.stageHeight / this.gridUnitWidth);

    for (
      let i = 0;
      i < this.stageWidth + this.gridUnitWidth;
      i += this.gridUnitWidth
    ) {
      for (
        let j = 0;
        j < this.stageHeight + this.gridUnitWidth;
        j += this.gridUnitWidth
      ) {
        this.particles.push(
          new Particle(
            i,
            j,
            this.gridUnitWidth,
            this.stageWidth,
            this.stageHeight
          )
        );
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

  constructor(x: any, y: any, size: any, width: any, height: any) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.divider = Math.random() < 0.5 ? 4 : 5;
    this.unitSize = this.size / this.divider;

    this.fillStyle = {
      h: getRandom(50, 200) + (100 * y) / height,
      s: 100,
      l: getRandom(50, 70),
    };
  }

  draw(ctx: any) {
    const getRandomColor = () =>
      `hsla(${this.fillStyle.h + getRandom(-100, 100)}, ${this.fillStyle.s}%, ${
        this.fillStyle.l
      }%, 0.1)`;
    for (let i = 0; i < this.divider; i++) {
      for (let j = 0; j < this.divider; j++) {
        const hOV = Math.random() < 0.5 ? 0 : 1;
        let grd = ctx.createLinearGradient(
          this.x + i * this.unitSize,
          this.y + j * this.unitSize,
          this.x + (i + 1 - hOV) * this.unitSize,
          this.y + (j + 1) * this.unitSize
        );
        const colorA = getRandomColor();
        const colorB = getRandomColor();
        grd.addColorStop(0, colorA);
        grd.addColorStop(1, colorB);
        ctx.fillStyle = grd;

        ctx.fillRect(
          this.x + (i - 5) * this.unitSize,
          this.y + (j - 5) * this.unitSize,
          this.unitSize * 11,
          this.unitSize * 11
        );
      }
    }
  }
}
