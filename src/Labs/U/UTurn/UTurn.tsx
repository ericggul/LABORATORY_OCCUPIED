import style from "./UTurn.module.scss";
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

  setSize: any;
  setRowNum: any;
  setColNum: any;
  setNum: any;
  lineSets: any;
  mouse: any;

  constructor() {
    this.wrapper = document.getElementById("CanvasWrapper");
    this.canvas = document.createElement("canvas");
    this.wrapper.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.particlesNum = 30;
    this.setSize = 100;
    this.lineSets = [];
    this.mouse = { x: 0, y: 0 };

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

    this.ctx.scale(1, 1);
    document.addEventListener("mousemove", this.mouseMove.bind(this));

    this.init();
    this.draw();
  }

  mouseMove(e: any) {
    this.mouse = {
      x: e.clientX / this.stageWidth,
      y: e.clientY / this.stageHeight,
    };
    this.draw();
  }

  init() {
    console.log(this.mouse);
    for (var j = 0; j < this.setRowNum; j++) {
      for (var i = 0; i < this.setColNum; i++) {
        this.lineSets.push(
          new LineSet(
            this.setSize * i,
            this.setSize / 2 + this.setSize * j,
            this.setSize,
            this.setSize,
            this.particlesNum,
            this.ctx,
            this.mouse
          )
        );
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    for (var j = 0; j < this.setNum; j++) {
      this.lineSets[j].draw(this.mouse);
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
  mousePos: any;

  pointA: any;
  pointB: any;
  pointAArray: any;
  pointBArray: any;

  constructor(
    x: any,
    y: any,
    width: any,
    height: any,
    particlesNum: any,
    ctx: any,
    mousePos: any
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.particlesNum = particlesNum;
    this.ctx = ctx;
    this.mousePos = mousePos;

    this.start = { x: this.x, y: this.y - this.height / 2 };

    this.pointA = {
      a: getRandom(this.x, this.width + this.x),
      b: getRandom(this.y - this.height / 2, this.y + this.height / 2),
      c: getRandom(this.x, this.width + this.x),
      d: getRandom(this.y - this.height / 2, this.y + this.height / 2),
    };

    this.pointB = {
      a: getRandom(this.x, this.width + this.x),
      b: getRandom(this.y - this.height / 2, this.y + this.height / 2),
      c: getRandom(this.x, this.width + this.x),
      d: getRandom(this.y - this.height / 2, this.y + this.height / 2),
    };

    this.pointAArray = [];
    this.pointBArray = [];

    for (var i = 0; i < this.particlesNum; i++) {
      this.pointAArray.push({
        a: getRandom(this.x, this.width + this.x),
        b: getRandom(this.y - this.height / 2, this.y + this.height / 2),
        c: getRandom(this.x, this.width + this.x),
        d: getRandom(this.y - this.height / 2, this.y + this.height / 2),
      });
      this.pointBArray.push({
        a: getRandom(this.x, this.width + this.x),
        b: getRandom(this.y - this.height / 2, this.y + this.height / 2),
        c: getRandom(this.x, this.width + this.x),
        d: getRandom(this.y - this.height / 2, this.y + this.height / 2),
      });
    }
  }

  draw(mousePos: any) {
    console.log(mousePos);
    for (var i = 0; i < this.particlesNum; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.start.x, this.start.y);
      this.ctx.bezierCurveTo(
        this.pointAArray[i].a - (this.height * mousePos.x) / 2,
        this.y - this.height / 2 + this.height * mousePos.y * 2,
        this.pointAArray[i].c,
        this.pointAArray[i].d,
        this.width + this.x,
        this.y + this.height / 2
      );
      this.ctx.strokeStyle = "white";
      this.ctx.stroke();
    }
    for (var i = 0; i < this.particlesNum; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.start.x + this.width, this.start.y);
      this.ctx.bezierCurveTo(
        this.x + this.width * mousePos.x + this.height * Math.sin(mousePos.y),
        this.pointBArray[i].b,
        this.pointBArray[i].c,
        this.pointBArray[i].d,
        this.start.x,
        this.start.y + this.height
      );
      this.ctx.strokeStyle = "white";
      this.ctx.stroke();
    }
  }
}

class Line {}
