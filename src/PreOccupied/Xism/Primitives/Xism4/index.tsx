import React, { useState, useEffect } from "react";
import * as S from "./styles";

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

export default function Xism() {
  const [draw, setDraw] = useState<any>(null);
  useEffect(() => {
    setDraw(new Canvas());
  }, []);
  useEffect(() => {
    if (draw) {
      document.addEventListener("click", () => draw.capture());
      return () => document.removeEventListener("click", () => draw.capture());
    }
  }, [draw]);

  return (
    <div
      id="CanvasWrapper"
      style={{ width: "100vw", height: "100vh", background: "white" }}
    />
  );
}

class Canvas {
  wrapper: any;
  canvas: any;
  ctx: any;
  stageWidth: any;
  stageHeight: any;

  scale: any;

  //icon numbers
  layerNumber: any;
  layerSets: any;

  //Time Related
  then: any;
  now: any;
  elapsedTime: any;
  initial: any;

  constructor() {
    this.wrapper = document.getElementById("CanvasWrapper");
    this.canvas = document.createElement("canvas");
    this.wrapper.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.resize();

    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.stageWidth = this.wrapper.clientWidth;
    this.stageHeight = this.wrapper.clientHeight;

    this.scale = 1;
    this.canvas.width = this.stageWidth * this.scale;
    this.canvas.height = this.stageHeight * this.scale;

    this.ctx.scale(this.scale, this.scale);

    this.layerNumber = 5000;
    this.layerSets = [];

    this.init();
  }

  init() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);

    for (let i = 0; i < this.layerNumber; i++) {
      this.layerSets.push(
        new Layer(
          getRandom(0, this.stageWidth),
          this.stageHeight * (i / this.layerNumber)
        )
      );
    }

    this.then = Date.now();
    this.initial = Date.now();

    this.draw();
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.now = Date.now();
    this.elapsedTime = this.now - this.initial;
    const delta = this.now - this.then;
    if (delta > 3) {
      this.draw();
    }
    this.then = this.now;
  }

  draw() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);

    this.layerSets.map((layer: any) => layer.draw(this.ctx, this.elapsedTime));
  }

  capture() {}
}

class Layer {
  centerX: number;
  centerY: number;

  colSize: number;
  rowSize: number;
  colNum: number;
  rowNum: number;

  squares: any;

  constructor(centerX: any, centerY: any) {
    this.colSize = getRandom(45, 55);
    this.rowSize = getRandom(10, 12.5);
    this.colNum = Math.random() < 0.3 ? 2 : Math.random() < 0.3 ? 6 : 4;
    this.rowNum = Math.floor(getRandom(25, getRandom(35, 40)));

    this.centerX = centerX;
    this.centerY = centerY;

    this.squares = [];
    this.init();
  }

  init() {
    for (let i = 0; i < this.rowNum; i++) {
      for (let j = 0; j < this.colNum; j++) {
        this.squares.push(
          new Square(
            this.colSize,
            this.rowSize,
            this.centerX + (j - (this.colNum - 1) / 2) * this.colSize,
            this.centerY + (i - (this.rowNum - 1) / 2) * this.rowSize,
            { r: 0, g: getRandom(100, 150), b: getRandom(150, 200) }
          )
        );
      }
    }
  }

  draw(ctx: any) {
    this.squares.map((sq: any, i: number) => sq.draw(ctx));
  }
}

class Square {
  width: number;
  height: number;
  x: number;
  y: number;

  color: any;

  constructor(width: number, height: number, x: number, y: number, color: any) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.color = color;
  }

  draw(ctx: any) {
    ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.1)`;
    ctx.strokeStyle = `rgba(255, 255, 255, .2)`;
    ctx.lineWidth = 1;

    ctx.save();

    ctx.translate(this.x, this.y);

    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.strokeRect(-this.width / 2, -this.height / 2, this.width, this.height);

    ctx.restore();
  }
}
