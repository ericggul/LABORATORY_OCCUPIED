import style from "./FourPillars.module.scss";
import { useState, useEffect } from "react";

const getRandom = (a: number, b: number) => {
  return Math.random() * (b - a) + a;
};

const discreteGenerator = (a: number, interval: number) => {
  return Math.abs((a % interval) - interval / 2) + getRandom(-1, 1);
};

export default function FourPillars() {
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

  squareNumber: any;

  squareWidth: any;
  squareHeight: any;
  squareSets: any;

  constructor() {
    this.wrapper = document.getElementById("CanvasWrapper");
    this.canvas = document.createElement("canvas");
    this.wrapper.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.squareSets = [];

    this.resize();

    window.addEventListener("resize", this.resize.bind(this));
    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    window.addEventListener("resize", this.resize.bind(this));
    this.stageWidth = this.wrapper.clientWidth;
    this.stageHeight = this.wrapper.clientHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;

    this.squareWidth = 70;
    this.squareHeight = this.stageHeight / 4;
    this.ctx.scale(1, 1);
    this.init();
  }

  init() {
    for (
      let i = -this.squareWidth;
      i < this.stageWidth;
      i += getRandom(this.squareWidth / 9, this.squareWidth / 5)
    ) {
      for (
        let j = -this.squareHeight;
        j < this.stageHeight;
        j += this.squareHeight
      ) {
        this.squareSets.push(
          new Square(
            i,
            j,
            getRandom(this.squareWidth * 0.6, this.squareWidth * 1.5),
            getRandom(this.squareHeight * 0.95, this.squareHeight * 1.1),
            this.ctx
          )
        );
      }
    }
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    // this.scratchSets.map((scr: any, i: any) => scr.draw(this.ctx));
  }
}

class Square {
  x: any;
  y: any;
  width: any;
  height: any;
  ctx: any;

  angle: any;

  scratchNumber: any;
  scratchSets: any;

  constructor(x: any, y: any, width: any, height: any, ctx: any) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;

    this.angle = getRandom((-Math.PI * 30) / 180, (Math.PI * 30) / 180);

    this.scratchSets = [];
    this.scratchNumber = getRandom(3, 15);

    this.init(this.ctx);
  }

  init(ctx: any) {
    this.ctx.fillStyle = `rgba(
      ${getRandom(30, 220)}, 
      ${getRandom(132, 138)}, 
      ${getRandom(230, 240)}, 
      ${getRandom(0.1, 0.5)})`;
    this.ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    this.ctx.rotate(this.angle);
    this.ctx.fillRect(
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    this.ctx.rotate(-this.angle);
    this.ctx.translate(-this.x - this.width / 2, -this.y - this.height / 2);

    for (let i = 0; i < this.scratchNumber; i++) {
      this.scratchSets.push(
        new Scratch(
          getRandom(this.x, this.x + this.width),
          getRandom(this.y, this.y + this.height),
          getRandom(0, 6),
          getRandom(0, 6),
          this.ctx
        )
      );
    }
  }
}

class Scratch {
  x: any;
  y: any;
  width: any;
  height: any;
  ctx: any;

  constructor(x: any, y: any, width: any, height: any, ctx: any) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;

    this.init(this.ctx);
  }

  init(ctx: any) {
    ctx.beginPath();
    ctx.moveTo(this.x - this.width / 2, this.y);
    ctx.bezierCurveTo(
      this.x + this.width / 3,
      this.y - this.height / 2,
      this.x + this.width / 3,
      this.y + this.height / 2,
      this.x - this.width / 2,
      this.y
    );
    ctx.fillStyle = "white";
    ctx.fill();
  }
}
