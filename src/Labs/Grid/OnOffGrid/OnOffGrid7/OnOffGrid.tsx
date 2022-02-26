import style from "./OnOffGrid.module.scss";
import { useState, useEffect, useCallback } from "react";

const CENTER = { x: 0.34, y: 0.73 };

const distrub = (): any => {
  return Math.random() * Math.random();
};

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

const CONVERT_POS = { x: 0.2, y: 0.3 };
const CONVERT_INTERVAL = { x: 0.1, y: 0.15 };
const CONVERT_INTENSITY = { x: 50, y: 50 };

function OnOffGrid() {
  useEffect(() => {
    const draw = new Canvas();
  }, []);

  return (
    <div
      id="CanvasWrapper"
      style={{ width: "100vw", height: "100vh", background: "black" }}
    />
  );
}

class Canvas {
  wrapper: any;
  canvas: any;
  ctx: any;
  stageWidth: any;
  stageHeight: any;

  textureSize: any;
  elements: any;

  //previousTimeStamp
  start: any;
  previousTimeStamp: any;

  constructor() {
    this.wrapper = document.getElementById("CanvasWrapper");
    this.canvas = document.createElement("canvas");
    this.wrapper.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.elements = [];
    this.resize();

    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.stageWidth = this.wrapper.clientWidth;
    this.stageHeight = this.wrapper.clientHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;

    this.ctx.scale(1, 1);

    this.textureSize = 12;
    this.init();
  }

  init() {
    for (
      let i = -this.textureSize * 10;
      i < this.stageWidth + this.textureSize;
      i += this.textureSize
    ) {
      for (
        let j = -this.textureSize * 10;
        j < this.stageHeight + this.textureSize;
        j += this.textureSize
      ) {
        this.elements.push(
          new Element(
            i / this.textureSize,
            j / this.textureSize,
            this.textureSize
          )
        );
      }
    }

    window.requestAnimationFrame(this.draw.bind(this));
  }

  draw(timestamp: any) {
    if (this.start === undefined) {
      this.start = timestamp;
    }
    const elapsed = timestamp - this.start;

    this.previousTimeStamp = timestamp;
    window.requestAnimationFrame(this.draw.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.elements.map((el: any) => el.draw(this.ctx, elapsed));
  }
}

class Element {
  i: any;
  j: any;
  size: any;
  time: any;
  opacity: any;

  delay: any;
  speedR: any;
  speedG: any;
  speedB: any;
  color: any;

  constructor(i: any, j: any, size: any) {
    this.i = i;
    this.j = j;
    this.size = size;
    this.opacity = 0;

    this.delay = getRandom(1000, 1050);
    this.speedR = getRandom(400, 410);
    this.speedG = getRandom(500, 520);

    this.color = { r: 190, g: 20, b: 225 };
  }

  draw(ctx: any, elapsed: any) {
    const time = Math.max(0, elapsed - this.delay);
    // this.color.r = 50 + 200 / (1 + Math.cos(time / this.speedR) ** 2);
    this.color.g = 250 - 230 * Math.pow(Math.sin(time / this.speedG), 10);
    ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g},${this.color.b} , 0.1)`;
    ctx.fillRect(
      this.i * this.size,
      this.j * this.size,
      this.size * 10,
      this.size * 10
    );
  }
}

export default OnOffGrid;
