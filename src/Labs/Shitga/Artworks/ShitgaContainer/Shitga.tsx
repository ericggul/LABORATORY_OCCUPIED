import style from "./Shitga.module.scss";

import { useState, useEffect } from "react";

const getRandom = (a: number, b: number) => {
  return Math.random() * (b - a) + a;
};

const weightedNumber = (start: any, last: any, weight: any) => {
  let result = last;

  if (Math.random() < weight) {
    result = start;
  } else {
    result = Math.floor(Math.random() * (last - start) + start + 1);
  }

  return result;
};

const fibonacci = (a: number) => {
  let curr = 1;
  let prev = 0;
  let prev2 = 0;
  for (let i = 0; i < a; i++) {
    prev2 = curr;
    curr = curr + prev;
    prev = prev2;
  }
  return curr;
};

export default function Shitga() {
  useEffect(() => {
    const draw = new App();

    return () => draw.destroy();
  }, []);

  return <div className={style.container} id="CanvasWrapper"></div>;
}

class App {
  wrapper: any;
  canvas: any;
  ctx: any;
  stageWidth: any;
  stageHeight: any;

  ratio: any;

  squareFibonacci: any;

  squareInterval: any;
  numbers: any;
  margin: any;

  scale: any;

  resizeEvent: any;

  constructor() {
    this.wrapper = document.getElementById("CanvasWrapper");
    this.canvas = document.createElement("canvas");
    this.wrapper.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.resize();
  }

  resize() {
    this.stageWidth = this.wrapper.clientWidth;
    this.stageHeight = this.wrapper.clientHeight;

    this.canvas.width = Math.min(this.stageWidth, this.stageHeight);
    this.canvas.height = Math.min(this.stageWidth, this.stageHeight);

    this.ratio = Math.min(this.stageWidth, this.stageHeight) / 610;

    this.ctx.scale(1, 1);

    this.squareFibonacci = 6;
    this.squareInterval = fibonacci(this.squareFibonacci) * this.ratio;

    this.numbers = Math.floor(610 / this.squareInterval);
    this.margin =
      Math.floor(
        (610 -
          this.numbers * this.squareInterval +
          fibonacci(this.squareFibonacci - 2)) /
          2
      ) * this.ratio;
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);
    this.init();
  }

  destroy() {
    this.canvas.remove();
    this.numbers = 0;
  }

  init() {
    for (let i = 0; i < this.numbers; i++) {
      for (let j = 0; j < this.numbers; j++) {
        this.ctx.fillStyle = `rgba(0, 0, 0, ${getRandom(
          getRandom(0.2, 0.4),
          getRandom(0.8, 1)
        )})`;
        this.ctx.fillRect(
          this.squareInterval * i + this.margin,
          this.squareInterval * j + this.margin,
          fibonacci(
            weightedNumber(
              this.squareFibonacci - 1,
              this.squareFibonacci + 3,
              0.95
            )
          ) * this.ratio,
          fibonacci(
            weightedNumber(
              this.squareFibonacci - 1,
              this.squareFibonacci + 2,
              0.95
            )
          ) * this.ratio
        );
      }
    }
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(
      0,
      this.margin +
        this.squareInterval * this.numbers -
        fibonacci(this.squareFibonacci - 2) * this.ratio,
      this.stageWidth,
      this.margin + 1
    );
    this.ctx.fillRect(
      this.margin +
        this.squareInterval * this.numbers -
        fibonacci(this.squareFibonacci - 2) * this.ratio,
      0,
      this.margin + 1,
      this.stageHeight
    );
  }
}
