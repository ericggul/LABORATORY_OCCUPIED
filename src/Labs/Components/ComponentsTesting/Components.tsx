import style from "./Components.module.scss";
import { useState, useEffect } from "react";

const getRandom = (a: number, b: number) => {
  return Math.random() * (b - a) + a;
};

const discreteGenerator = (a: number, interval: number) => {
  return Math.abs((a % interval) - interval / 2) + getRandom(-1, 1);
};

export default function Components() {
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

  scratchNumber: any;
  scratchSets: any;

  constructor() {
    this.wrapper = document.getElementById("CanvasWrapper");
    this.canvas = document.createElement("canvas");
    this.wrapper.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.scratchNumber = 100;
    this.scratchSets = [];

    this.resize();

    window.requestAnimationFrame(this.animate.bind(this));
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
    this.ctx.fillStyle = "pink";
    this.ctx.fillRect(
      (this.stageWidth * 1) / 3,
      (this.stageHeight * 1) / 3,
      (this.stageWidth * 1) / 3,
      (this.stageHeight * 1) / 3
    );

    for (let i = 0; i < this.scratchNumber; i++) {
      this.scratchSets.push(
        new Scratch(
          getRandom(this.stageWidth / 3, (this.stageWidth * 2) / 3),
          getRandom(this.stageHeight / 3, (this.stageHeight * 2) / 3),
          getRandom(3, 7),
          getRandom(3, 7),
          this.ctx
        )
      );
    }
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    // this.scratchSets.map((scr: any, i: any) => scr.draw(this.ctx));
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
