import style from "./AnimatedGrid.module.scss";
import { useState, useEffect } from "react";

const getRandom = (a: number, b: number) => {
  return Math.random() * (b - a) + a;
};

const discreteGenerator = (a: number, interval: number) => {
  return Math.abs((a % interval) - interval / 2) + getRandom(-1, 1);
};

export default function AnimatedGrid() {
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

  gridWidth: any;
  gridHeight: any;

  gridSets: any;

  constructor() {
    this.wrapper = document.getElementById("CanvasWrapper");
    this.canvas = document.createElement("canvas");
    this.wrapper.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.gridSets = [];

    this.resize();

    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = this.wrapper.clientWidth;
    this.stageHeight = this.wrapper.clientHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;
    this.ctx.scale(1, 1);

    // this.ctx.globalCompositeOperation = "soft-light";

    this.gridWidth = 20;
    this.gridHeight = 20;

    for (
      let i = -this.gridWidth * 5;
      i < this.stageWidth;
      i += this.gridWidth
    ) {
      for (
        let j = -this.gridHeight * 5;
        j < this.stageHeight;
        j += this.gridHeight
      ) {
        this.gridSets.push(
          new Element(
            i,
            j,
            this.gridWidth,
            this.gridHeight,
            this.stageHeight *
              ((j + this.gridHeight * 5) / this.gridHeight) ** 0.8
          )
        );
      }
    }
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.gridSets.map((el: any, i: number) => el.draw(this.ctx));
  }
}

const boundedArrayGenerator = (min: any, max: any, size: any) => {
  let tempArray = [];
  for (let i = 0; i < size; i++) {
    tempArray.push(getRandom(min, max));
  }
  return tempArray.sort((a, b) => b - a);
};

class Element {
  x: any;
  y: any;

  width: any;
  height: any;

  color: any;
  colorAmpl: any;

  time: any;
  interval: any;

  constructor(x: any, y: any, width: any, height: any, interval: any) {
    this.x = x + width * getRandom(-0.3, 0.3);
    this.y = y + height * getRandom(-0.3, 0.3);
    this.width = width * getRandom(4.5, 10.5);
    this.height = height * getRandom(4.5, 6.5);
    this.time = 10000;
    this.interval = interval * getRandom(0.9, 2);
    this.color = 0;
    this.colorAmpl = getRandom(70, 90);
  }

  draw(ctx: any) {
    this.time++;
    this.color =
      Math.min(Math.sin((this.time * this.interval) / 100000) * 1.3, 1) *
        this.colorAmpl +
      80;
    ctx.fillStyle = `rgba(${this.color + 100}, ${this.color}, ${
      this.color * 1.6
    }, 0.1)`;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
