import style from "./UR1.module.scss";
import { useCallback, useState, useEffect } from "react";

function getRandom(a: number, b: number) {
  return Math.random() * (b - a) + a;
}

export default function UTurn() {
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
  setNum: any;
  lineSets: any;

  constructor() {
    this.wrapper = document.getElementById("CanvasWrapper");
    this.canvas = document.createElement("canvas");
    this.wrapper.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.resize();
    this.particlesNum = 100;
    this.setNum = 8;
    this.lineSets = [];
    this.init();
    this.draw();

    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.stageWidth = this.wrapper.clientWidth;
    this.stageHeight = this.wrapper.clientHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;

    this.ctx.scale(1, 1);
    this.init();
    this.draw();
  }

  init() {
    for (var j = 0; j < this.setNum; j++) {
      this.lineSets.push(
        new LineSet(
          (this.stageWidth * j) / this.setNum,
          this.stageHeight / 2,
          this.stageWidth / this.setNum,
          this.stageWidth / this.setNum,
          this.particlesNum,
          this.ctx
        )
      );
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
  }

  draw() {
    for (var i = 0; i < this.particlesNum; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(
        getRandom(this.x, this.width + this.x),
        getRandom(this.y - this.height / 2, this.y + this.height)
      );
      this.ctx.bezierCurveTo(
        getRandom(this.x, this.width + this.x),
        getRandom(this.y - this.height / 2, this.y + this.height),
        getRandom(this.x, this.width + this.x),
        getRandom(this.y - this.height / 2, this.y + this.height),
        getRandom(this.x, this.width + this.x),
        getRandom(this.y - this.height / 2, this.y + this.height)
      );
      this.ctx.strokeStyle = "white";
      this.ctx.stroke();
    }
  }
}
