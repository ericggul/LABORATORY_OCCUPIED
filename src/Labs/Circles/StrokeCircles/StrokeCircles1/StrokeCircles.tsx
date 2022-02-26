import style from "./StrokeCircles.module.scss";
import {
  shuffle,
  getRandomFromArray,
  getRandomFromArrayWithWeight,
} from "../../../../functions/arrays";
import { useState, useEffect } from "react";

const getRandom = (a: number, b: number) => {
  return Math.random() * (b - a) + a;
};

const discreteGenerator = (a: number, interval: number) => {
  return Math.abs((a % interval) - interval / 2) + getRandom(-1, 1);
};

export default function NestedCircles() {
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

  maximumRadius: any;

  circleSets: any;
  circleNum: any;
  subdivision: any;

  temp: any;

  constructor() {
    this.wrapper = document.getElementById("CanvasWrapper");
    this.canvas = document.createElement("canvas");
    this.wrapper.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.circleSets = [];

    this.resize();

    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = this.wrapper.clientWidth;
    this.stageHeight = this.wrapper.clientHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;
    this.ctx.scale(1, 1);

    this.maximumRadius = Math.min(this.stageHeight, this.stageHeight);
    this.circleNum = this.stageWidth + this.stageHeight;

    for (let i = 0; i < this.circleNum; i++) {
      const pos = getRandom(0, 1);
      this.circleSets.push({
        x: 0,
        y: 0,
        radius: pos * (this.stageWidth + this.stageHeight),
        lineWidth: pos * 0.5,
      });
    }
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.circleSets.map((e: any) => this.drawSingle(e));
  }

  drawSingle(data: any) {
    this.ctx.beginPath();
    this.ctx.lineWidth = data.lineWidth;
    this.ctx.strokeStyle = "black";
    this.ctx.arc(data.x, data.y, data.radius, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.closePath();
  }
}
