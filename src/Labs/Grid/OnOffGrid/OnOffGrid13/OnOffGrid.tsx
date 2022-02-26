import style from "./OnOffGrid.module.scss";
import { useState, useEffect, useCallback } from "react";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

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
  mousePos: any;

  xInterval: any;

  constructor() {
    this.wrapper = document.getElementById("CanvasWrapper");
    this.canvas = document.createElement("canvas");
    this.wrapper.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.elements = [];
    this.mousePos = { x: 0, y: 0 };

    this.xInterval = 20;

    this.resize();

    window.addEventListener("resize", this.resize.bind(this));
    window.addEventListener("mousemove", (e: any) => {
      this.mousePos = { x: e.clientX, y: e.clientY };
    });
  }

  resize() {
    this.stageWidth = this.wrapper.clientWidth;
    this.stageHeight = this.wrapper.clientHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;

    this.ctx.scale(1, 1);

    this.textureSize = 10;
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
            this.textureSize,
            this.stageWidth,
            this.stageHeight,
            this.xInterval
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
    const relativeX =
      Math.floor(this.mousePos.x / this.textureSize) % this.xInterval;
    this.elements.map((el: any) =>
      el.draw(this.ctx, elapsed, this.mousePos, relativeX)
    );
  }
}

class Element {
  i: any;
  j: any;
  unitSize: any;
  renderSize: any;
  time: any;
  opacity: any;

  stageWidth: any;
  stageHeight: any;

  xInterval: any;
  relativeXPos: any;

  delay: any;
  speedR: any;
  speedG: any;
  speedB: any;
  color: any;

  constructor(
    i: any,
    j: any,
    size: any,
    stageWidth: any,
    stageHeight: any,
    xInterval: any
  ) {
    this.i = i;
    this.j = j;
    this.unitSize = size;
    this.renderSize =
      this.unitSize * getRandom(0.1, getRandom(0.1, getRandom(0.1, 0.7)));
    this.opacity = 0;

    this.delay = getRandom(1000, 1950);
    this.speedR = getRandom(400, 405);
    this.speedG = getRandom(1100, 1320);

    this.xInterval = xInterval;
    this.relativeXPos = this.i % this.xInterval;

    this.color = { r: 0, g: 0, b: 0 };

    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
  }

  draw(ctx: any, elapsed: any, mousePos: any, relativeX: any) {
    const time = Math.max(0, elapsed - this.delay);
    const location = Math.abs(relativeX - this.relativeXPos);
    console.log(location);

    const amplitude = Math.max(
      1 * Math.sin(time / this.speedR) - location * 0.1,
      0
    );

    this.color.g =
      30 + amplitude * 800 * Math.abs(Math.cos(time / this.speedG));
    ctx.beginPath();
    ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g},${this.color.b} , 1)`;
    ctx.arc(
      this.i * this.unitSize,
      this.j * this.unitSize,
      this.renderSize,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
}

export default OnOffGrid;
