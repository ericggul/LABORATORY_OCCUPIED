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
  const [draw, setDraw] = useState<any>(null);
  useEffect(() => {
    setDraw(new App());
  }, []);

  useEffect(() => {
    if (draw) {
      document.addEventListener("click", () => draw.capture());
      return () => document.removeEventListener("click", () => draw.capture());
    }
  }, [draw]);

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

  scale: any;

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

    this.scale = 10;

    this.canvas.width = 610 * this.scale;
    this.canvas.height = 610 * this.scale;

    this.ctx.scale(this.scale, this.scale);

    this.squareFibonacci = 5;
    this.squareInterval = fibonacci(this.squareFibonacci);

    this.numbers = Math.floor(610 / this.squareInterval);
    this.margin = Math.floor(
      (610 -
        this.numbers * this.squareInterval +
        fibonacci(this.squareFibonacci - 2)) /
        2
    );
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);
    this.init2();
  }

  capture() {
    console.log("handling..");
    let dataURL = this.canvas.toDataURL("image/png");
    var link = document.createElement("a");
    link.download = "shitga.png";
    link.href = dataURL;

    link.click();
    console.log("downloaded..");
    link.remove();
  }

  init2() {
    for (let i = 0; i < this.numbers; i++) {
      for (let j = 0; j < this.numbers; j++) {
        const horizontal = Math.random() < 0.5;
        this.ctx.fillStyle = `rgba(0, 0, 0, ${getRandom(0.6, 1)})`;

        if (horizontal) {
          this.ctx.fillRect(
            this.squareInterval * i + this.margin,
            this.squareInterval * j + this.margin,
            fibonacci(
              weightedNumber(
                this.squareFibonacci - 1,
                this.squareFibonacci + 3,
                0.8
              )
            ),
            fibonacci(this.squareFibonacci - 1)
          );
        } else {
          this.ctx.fillRect(
            this.squareInterval * i + this.margin,
            this.squareInterval * j + this.margin,
            fibonacci(this.squareFibonacci - 1),
            fibonacci(
              weightedNumber(
                this.squareFibonacci - 1,
                this.squareFibonacci + 3,
                0.7
              )
            )
          );
        }
      }
    }
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(
      0,
      this.margin +
        this.squareInterval * this.numbers -
        fibonacci(this.squareFibonacci - 2),
      this.stageWidth,
      this.margin + 1
    );
    this.ctx.fillRect(
      this.margin +
        this.squareInterval * this.numbers -
        fibonacci(this.squareFibonacci - 2),
      0,
      this.margin + 1,
      this.stageHeight
    );
  }
}
