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

  squareFibonacci: any;

  squareInterval: any;
  numbers: any;
  margin: any;

  constructor() {
    this.wrapper = document.getElementById("CanvasWrapper");
    this.canvas = document.createElement("canvas");
    this.wrapper.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.resize();
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.stageWidth = this.wrapper.clientWidth;
    this.stageHeight = this.wrapper.clientHeight;

    this.canvas.width = fibonacci(14);
    this.canvas.height = fibonacci(14);
    this.ctx.scale(1, 1);

    this.squareFibonacci = 6;
    this.squareInterval = fibonacci(this.squareFibonacci);
    this.numbers = Math.floor(this.canvas.width / this.squareInterval);
    this.margin = Math.floor(
      (this.canvas.width -
        this.numbers * this.squareInterval +
        fibonacci(this.squareFibonacci - 2)) /
        2
    );

    for (let i = 0; i < 10; i++) {
      this.init2();
    }
  }

  init2() {
    for (let i = 0; i < this.numbers; i++) {
      for (let j = 0; j < this.numbers; j++) {
        this.ctx.filter = `opacity(${getRandom(
          10,
          getRandom(10, getRandom(10, 60))
        )}%)`;
        this.ctx.fillStyle = `rgba(0, 0,0, ${getRandom(
          getRandom(0.1, 0.7),
          0.7
        )})`;
        this.ctx.fillRect(
          this.squareInterval * i + this.margin,
          this.squareInterval * j + this.margin,
          fibonacci(
            weightedNumber(
              this.squareFibonacci - 1,
              this.squareFibonacci + 3,
              0.98
            )
          ),
          fibonacci(
            weightedNumber(
              this.squareFibonacci - 1,
              this.squareFibonacci + 3,
              0.98
            )
          )
        );
      }
    }
    this.ctx.filter = `opacity(100%)`;
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(
      0,
      this.margin +
        this.squareInterval * this.numbers -
        fibonacci(this.squareFibonacci - 2),
      this.canvas.width,
      this.margin + 1
    );
    this.ctx.fillRect(
      this.margin +
        this.squareInterval * this.numbers -
        fibonacci(this.squareFibonacci - 2),
      0,
      this.margin + 1,
      this.canvas.height
    );
  }
}
