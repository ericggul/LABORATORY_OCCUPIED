import style from "./Area7.module.scss";
import { useCallback, useState, useEffect } from "react";

function getRandom(a: number, b: number) {
  return Math.random() * (b - a) + a;
}

export default function RadialGradient() {
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

  divider: any;
  actualDivider: any;

  particles: any;
  particlesNum: any;

  startPoints: any;
  startPointsNum: any;

  constructor() {
    this.wrapper = document.getElementById("CanvasWrapper");
    this.canvas = document.createElement("canvas");
    this.wrapper.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.resize();

    this.canvas.addEventListener("click", (e: any) => {
      this.divider.x = e.clientX;
      this.divider.y = e.clientY;
    });

    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.stageWidth = this.wrapper.clientWidth;
    this.stageHeight = this.wrapper.clientHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;

    this.particlesNum = 1000;
    this.particles = [];

    this.startPointsNum = 16;
    this.startPoints = [];

    this.divider = { x: this.stageWidth * 0.4, y: this.stageHeight * 0.6 };
    this.actualDivider = { x: 0, y: 0 };

    this.ctx.scale(1, 1);
    this.init();
  }

  init() {
    for (var i = 0; i < this.startPointsNum; i++) {
      this.startPoints.push({
        x: getRandom(0, this.stageWidth),
        y: getRandom(0, this.stageHeight),
      });
    }

    for (var i = 0; i < this.particlesNum; i++) {
      this.particles.push(
        new Plane(
          getRandom(0, Math.min(this.stageWidth, this.stageHeight) / 2),
          this.startPoints[Math.floor(Math.random() * this.startPointsNum)],
          this.ctx
        )
      );
    }

    this.draw();
  }

  draw() {
    for (var i = 0; i < this.particlesNum; i++) {
      this.particles[i].draw();
    }
  }
}

class Plane {
  ctx: any;
  start: any;
  radius: any;

  constructor(radius: any, start: any, ctx: any) {
    this.radius = radius;
    this.ctx = ctx;
    this.start = start;
    // this.vector ={x: 100, y: 200}
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(
      this.start.x,
      this.start.y,
      this.radius,
      0,
      Math.PI * 2,
      false
    );
    this.ctx.closePath();
    this.ctx.strokeStyle = "white";
    this.ctx.fillStyle = `rgba(${getRandom(0, 255)},${getRandom(
      0,
      255
    )},${getRandom(0, 255)}, 0.2)`;
    this.ctx.stroke();
  }
}
