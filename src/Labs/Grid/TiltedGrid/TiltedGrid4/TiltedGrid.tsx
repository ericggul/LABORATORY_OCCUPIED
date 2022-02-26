import style from "./TiltedGrid.module.scss";
import { useState, useEffect } from "react";

const getRandom = (a: number, b: number) => {
  return Math.random() * (b - a) + a;
};

const discreteGenerator = (a: number, interval: number) => {
  return Math.abs((a % interval) - interval / 2) + getRandom(-1, 1);
};

export default function TiltedGrid() {
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

  gridSets: any;
  gridSetsNum: any;

  tiltedAngle: any;

  temp: any;

  constructor() {
    this.wrapper = document.getElementById("CanvasWrapper");
    this.canvas = document.createElement("canvas");
    this.wrapper.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.gridSets = [];

    this.tiltedAngle = (23.5 * Math.PI) / 180;
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

    this.gridSetsNum = 50;

    for (let i = 0; i < this.gridSetsNum; i++) {
      this.gridSets.push(
        new GridSet(
          getRandom(0, this.stageWidth),
          getRandom(0, this.stageHeight),
          (getRandom((this.gridSetsNum - i) * 0.9, (this.gridSetsNum - i) * 1) *
            this.stageWidth) /
            this.gridSetsNum,
          (getRandom((this.gridSetsNum - i) * 0.9, (this.gridSetsNum - i) * 1) *
            this.stageWidth) /
            this.gridSetsNum,
          30,
          {
            h: getRandom(170, 180),
            s: 0,
            l: (i * 10) / this.gridSetsNum + getRandom(0, 10),
          },
          this.tiltedAngle
        )
      );
    }
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    for (let i = 0; i < this.gridSetsNum; i++) {
      this.gridSets[i].draw(this.ctx);
    }
  }
}

const boundedArrayGenerator = (min: any, max: any, size: any) => {
  let tempArray = [];
  for (let i = 0; i < size; i++) {
    tempArray.push(getRandom(min, max));
  }
  return tempArray.sort((a, b) => b - a);
};

class GridSet {
  x: any;
  y: any;
  elementsNum: any;
  elements: any;
  widthArray: any;
  heightArray: any;
  color: any;
  angle: any;
  constructor(
    x: any,
    y: any,
    width: any,
    height: any,
    elementsNum: any,
    color: any,
    angle: any
  ) {
    this.x = x;
    this.y = y;

    this.elementsNum = elementsNum;
    this.elements = [];
    this.widthArray = boundedArrayGenerator(width / 20, width, elementsNum);
    this.heightArray = boundedArrayGenerator(height / 20, height, elementsNum);

    this.color = color;
    this.angle = angle + getRandom(-0.5, 0.5);
    this.init();
  }

  init() {
    for (let i = 0; i < this.elementsNum; i++) {
      this.elements.push(
        new Element(
          this.x,
          this.y,
          this.widthArray[i],
          this.heightArray[i],
          this.angle,
          i % 2 === 0
            ? `hsl(${this.color.h}, ${this.color.s}%, ${this.color.l}%)`
            : "pink"
        )
      );
    }
  }

  draw(ctx: any) {
    for (let i = 0; i < this.elementsNum; i++) {
      this.elements[i].draw(ctx);
    }
  }
}

class Element {
  x: any;
  y: any;
  standardWidth: any;
  standardHeight: any;
  width: any;
  height: any;
  angle: any;
  color: any;

  speedIndex: any;
  speedWidth: any;
  speedHeight: any;

  time: any;
  interval: any;

  constructor(x: any, y: any, width: any, height: any, angle: any, color: any) {
    this.x = x;
    this.y = y;
    this.standardWidth = width;
    this.standardHeight = height;
    this.width = 0;
    this.height = 0;

    this.angle = angle + getRandom(-0.03, 0.03);
    this.color = color;

    this.speedIndex = getRandom(0.03, 0.06);
    this.time = 0;
    this.interval = getRandom(200, 800);
  }

  draw(ctx: any) {
    this.speedWidth = (this.standardWidth - this.width) * this.speedIndex;
    this.speedHeight = (this.standardHeight - this.height) * this.speedIndex;

    this.width += this.speedWidth;
    this.height += this.speedHeight;

    this.time += 1;
    if (this.time > this.interval) {
      this.time = 0;
      this.width = 0;
      this.height = 0;
    }
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.rotate(-this.angle);
    ctx.translate(-this.x, -this.y);
  }
}
