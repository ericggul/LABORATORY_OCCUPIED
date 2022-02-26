import style from "./NestedCircles.module.scss";

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

    this.maximumRadius = Math.min(this.stageHeight, this.stageHeight);
    this.circleNum = 150000;

    for (let i = 0; i < this.circleNum; i++) {
      this.circleSets.push({
        lineWidth: getRandom(0.01, 0.03),
        color: { h: 0, s: 100, l: getRandom(30, 70) },
        radius: getRandom(this.maximumRadius / 3, (this.maximumRadius * 6) / 5),
        x: getRandom(-this.stageWidth, -this.stageWidth / 6),
        y: getRandom((this.stageHeight * 2) / 5, (this.stageHeight * 3) / 5),
      });
    }

    // for (let i = 0; i < this.circleNum; i++) {
    //   this.circleSets.push(
    //     Math.random() < 0.7
    //       ? new Circle(
    //           { h: 0, s: 100, l: getRandom(30, 70) },
    //           getRandom(this.maximumRadius / 3, (this.maximumRadius * 6) / 5),
    //           getRandom(-this.stageWidth, -this.stageWidth / 6),
    //           getRandom((this.stageHeight * 2) / 5, (this.stageHeight * 3) / 5)
    //         )
    //       : new Circle(
    //           { h: 0, s: getRandom(30, 90), l: getRandom(0, 30) },
    //           getRandom(this.maximumRadius / 3, this.maximumRadius),
    //           getRandom(this.stageWidth / 6, this.stageWidth / 2) +
    //             this.stageWidth,
    //           getRandom((this.stageHeight * 2) / 5, (this.stageHeight * 3) / 5)
    //         )
    //   );
    // }
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    for (let i = 0; i < this.circleNum; i++) {
      this.drawSingle(this.circleSets[i]);
    }
  }

  drawSingle(data: any) {
    this.ctx.beginPath();
    this.ctx.lineWidth = data.lineWidth;
    this.ctx.strokeStyle = `hsl(${data.color.h}, ${data.color.s}%, ${data.color.l}%)`;
    this.ctx.arc(data.x, data.y, data.radius, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.closePath();
  }
}

class CircleSet {
  colorRange: any;
  radiusRange: any;
  xRange: any;
  yRange: any;

  circleNum: any;
  circleSets: any;

  constructor(x: any) {}
}

class Circle {
  color: any;
  radius: any;
  x: any;
  y: any;

  lineWidth: any;
  speed: any;

  constructor(color: any, radius: any, x: any, y: any) {
    this.color = color;
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.lineWidth = getRandom(0.01, 0.03);
  }

  draw(ctx: any) {
    ctx.beginPath();
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = `hsl(${this.color.h}, ${this.color.s}%, ${this.color.l}%)`;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
  }
}
