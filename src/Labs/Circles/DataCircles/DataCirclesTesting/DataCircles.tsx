import style from "./DataCircles.module.scss";
import Stations from "../Data/Stations.xlsx";

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

    // this.ctx.globalCompositeOperation = "soft-light";

    this.maximumRadius = Math.min(this.stageHeight, this.stageHeight) / 3;
    this.circleNum = 50;
    for (let i = 0; i < this.circleNum; i++) {
      this.circleSets.push(
        new Circle(
          { h: 30, s: 40, l: i },
          (this.maximumRadius * (this.circleNum - i)) / this.circleNum,
          this.stageWidth / 2,
          this.stageHeight / 2
        )
      );
    }
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    for (let i = 0; i < this.circleNum; i++) {
      this.circleSets[i].draw(this.ctx);
    }
  }
}

class Circle {
  color: any;
  radius: any;
  x: any;
  y: any;

  speed: any;

  constructor(color: any, radius: any, x: any, y: any) {
    this.color = color;
    this.radius = radius;
    this.x = x;
    this.y = y;
  }

  draw(ctx: any) {
    ctx.beginPath();
    ctx.fillStyle = `hsl(${this.color.h}, ${this.color.s}%, ${this.color.l}%)`;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}
