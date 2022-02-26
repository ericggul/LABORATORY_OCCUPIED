import style from "./UGrid.module.scss";
import { useCallback, useState, useEffect } from "react";

function getRandom(a: number, b: number) {
  return Math.random() * (b - a) + a;
}

export default function UGrid() {
  useEffect(() => {
    const draw = new App();
  }, []);

  return (
    <div
      id="CanvasWrapper"
      style={{ width: "100vw", height: "100vh", background: "black" }}
    />
  );
}

class App {
  wrapper: any;
  canvas: any;
  ctx: any;
  stageWidth: any;
  stageHeight: any;

  particlesNum: any;

  setSize: any;
  setRowNum: any;
  setColNum: any;
  setNum: any;
  lineSets: any;

  constructor() {
    this.wrapper = document.getElementById("CanvasWrapper");
    this.canvas = document.createElement("canvas");
    this.wrapper.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.particlesNum = 80;
    this.setSize = 100;
    this.lineSets = [];

    this.resize();

    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.stageWidth = this.wrapper.clientWidth;
    this.stageHeight = this.wrapper.clientHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;

    this.setRowNum = Math.ceil(this.stageHeight / this.setSize);
    this.setColNum = Math.ceil(this.stageWidth / this.setSize);
    this.setNum = this.setRowNum * this.setColNum;

    console.log(this.stageHeight, this.setSize);

    this.ctx.scale(1, 1);
    this.init();
    this.draw();
  }

  init() {
    for (var j = 0; j < this.setRowNum; j++) {
      for (var i = 0; i < this.setColNum; i++) {
        this.lineSets.push(
          new LineSet(
            this.setSize * i,
            this.setSize / 2 + this.setSize * j,
            this.setSize,
            this.setSize,
            this.particlesNum,
            this.ctx
          )
        );
      }
    }
  }

  draw() {
    for (var j = 0; j < this.setNum; j++) {
      this.lineSets[j].draw();
    }
  }
}

class LineSet {
  x: any;
  y: any;
  width: any;
  height: any;
  particlesNum: any;
  ctx: any;
  start: any;
  constructor(
    x: any,
    y: any,
    width: any,
    height: any,
    particlesNum: any,
    ctx: any
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.particlesNum = particlesNum;
    this.ctx = ctx;

    this.start = {
      x: getRandom(this.x, this.width + this.x),
      y: getRandom(this.y - this.height / 2, this.y + this.height / 2),
    };
  }

  draw() {
    for (var i = 0; i < this.particlesNum; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.start.x, this.start.y);
      this.ctx.bezierCurveTo(
        getRandom(this.x, this.width + this.x),
        getRandom(this.y - this.height / 2, this.y + this.height / 2),
        this.x + this.width / 2,
        getRandom(this.y - this.height / 2, this.y + this.height / 2),
        getRandom(this.x, this.width + this.x),
        getRandom(this.y - this.height / 2, this.y + this.height / 2)
      );
      this.ctx.strokeStyle = "white";
      this.ctx.stroke();
    }
  }
}
