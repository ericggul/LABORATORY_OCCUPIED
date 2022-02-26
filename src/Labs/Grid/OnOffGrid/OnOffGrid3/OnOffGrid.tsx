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

    this.textureSize = 15;
    this.init();
  }

  init() {
    for (
      let i = 0;
      i < this.stageWidth + this.textureSize;
      i += this.textureSize
    ) {
      for (
        let j = 0;
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
  speed: any;
  color: any;

  constructor(i: any, j: any, size: any) {
    this.i = i;
    this.j = j;
    this.size = size;
    this.opacity = 0;

    this.delay = getRandom(1000, 1050);
    this.speed = getRandom(200, 210);

    if (i % 2 === 0 && j % 2 === 0) {
      this.color = { r: 172, g: 20, b: 225 };
    }
    if (i % 2 === 0 && j % 2 === 1) {
      this.color = { r: 210, g: 146, b: 233 };
    }
    if (i % 2 === 1 && j % 2 === 0) {
      this.color = { r: 210, g: 146, b: 233 };
    }
    if (i % 2 === 1 && j % 2 === 1) {
      this.color = { r: 172, g: 20, b: 225 };
    }
  }

  draw(ctx: any, elapsed: any) {
    const time = Math.max(0, elapsed - this.delay);
    this.opacity = 1 / (1.5 + Math.cos(time / this.speed) * 0.5);
    ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g},${this.color.b} , ${this.opacity})`;
    ctx.fillRect(this.i * this.size, this.j * this.size, this.size, this.size);
  }
}

export default OnOffGrid;
