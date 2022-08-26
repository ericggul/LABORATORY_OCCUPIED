import style from "./style.module.scss";
import { useState, useEffect } from "react";

const getRandom = (a: number, b: number) => {
  return Math.random() * (b - a) + a;
};

export default function HopeTest() {
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

  temp: any;
  gravityPoints: any;
  radials: any;

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

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;
    this.ctx.scale(1, 1);

    this.init();
  }

  init() {
    this.radials = [];
    for (let i = 0; i < 500; i++) {
      this.radials.push(
        new Concentric(
          getRandom(0, this.stageWidth),
          getRandom(0, this.stageHeight),
          Math.floor(getRandom(10, getRandom(50, getRandom(50, 140))))
        )
      );
    }

    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.radials.forEach((radial: any) => radial.draw(this.ctx));
  }
}

class Concentric {
  x: any;
  y: any;
  centerHole: any;

  radialNumber: any;
  radials: any;

  constructor(x: any, y: any, radialNumber: any) {
    this.x = x;
    this.y = y;
    this.centerHole = 10;
    this.radialNumber = radialNumber;
    this.init();
  }

  init() {
    this.radials = [];
    for (let i = 0; i < this.radialNumber; i++) {
      this.radials.push(
        new SingleRadial(
          this.x,
          this.y,
          i ** 1.2 + this.centerHole,
          this.radialNumber - i,
          i
        )
      );
    }
  }

  draw(ctx: any) {
    this.radials.forEach((radial: any) => radial.draw(ctx));
  }
}

class SingleRadial {
  x: any;
  y: any;
  radius: any;

  widthRange: any;
  heightRange: any;
  numbers: any;
  rectArray: any;

  constructor(
    x: number,
    y: number,
    radius: number,
    number: number,
    idx: number
  ) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.numbers = number;

    this.widthRange = { min: this.radius * 0, max: this.radius * 0.1 };
    this.heightRange = { min: this.radius * 0.05, max: this.radius * 0.5 };

    this.init();
  }

  init() {
    this.rectArray = [];
    for (let i = 0; i < this.numbers; i++) {
      let angle = getRandom(0, Math.PI * 2);
      this.rectArray.push(
        new Rect(
          this.x + this.radius * Math.cos(angle) * getRandom(0.9, 1.1),
          this.y + this.radius * Math.sin(angle) * getRandom(0.9, 1.1),
          getRandom(this.widthRange.min, this.widthRange.max),
          getRandom(this.heightRange.min, this.heightRange.max),
          angle
        )
      );
    }
  }

  draw(ctx: any) {
    console.log("draw");
    this.rectArray.forEach((rect: any) => rect.draw(ctx));
  }
}

class Rect {
  x: number;
  y: number;
  width: number;
  height: number;
  angle: number;
  opacity: any;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    angle: number
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.angle = angle;
    this.opacity = getRandom(
      0.0,
      getRandom(0.03, getRandom(0.04, getRandom(0.05, getRandom(0.1, 0.3))))
    );
  }

  draw(ctx: any) {
    ctx.save();
    ctx.translate(this.x, this.y);
    Math.random() < 0.3 ? ctx.rotate(this.angle) : ctx.rotate(0);

    ctx.fillStyle =
      Math.random() < 0.1
        ? `rgba(255, 255, 255, ${this.opacity})`
        : `rgba(0, 0, 0, ${this.opacity})`;
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    // ctx.arc(0, 0, this.height, 0, Math.PI * 2);
    ctx.restore();
  }
}
