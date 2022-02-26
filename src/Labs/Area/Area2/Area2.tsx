import style from "./Area.module.scss";
import { useCallback, useState, useEffect } from "react";

function getRandom(a: number, b: number) {
  return Math.random() * (b - a) + a;
}

export default function Area() {
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

    this.divider = { x: this.stageWidth * 0.4, y: this.stageHeight * 0.6 };
    this.actualDivider = { x: 0, y: 0 };

    this.ctx.scale(1, 1);
    this.init();
  }

  init() {
    for (var i = 0; i < this.particlesNum; i++) {
      this.particles.push(
        new Plane(
          {
            start: getRandom(0, this.stageWidth / 2),
            end: getRandom(this.stageWidth / 2, this.stageWidth),
          },
          {
            start: getRandom(0, this.stageHeight / 2),
            end: getRandom(this.stageHeight / 2, this.stageHeight),
          },
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
  x: any;
  y: any;
  ctx: any;
  start: any;
  vector: any;
  constructor(x: any, y: any, ctx: any) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.start = { x: 100, y: 100 };
    // this.vector ={x: 100, y: 200}
    this.vector = {
      x: getRandom(this.x.start - this.x.end, this.x.end - this.x.start),
      y: getRandom(this.y.start - this.y.end, this.y.end - this.y.start),
    };
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.start.x, this.start.y);
    this.ctx.lineTo(this.start.x + this.vector.x, this.start.y + this.vector.y);
    this.ctx.lineTo(
      this.start.x + this.vector.x - this.vector.y,
      this.start.y + this.vector.y + this.vector.x
    );
    this.ctx.lineTo(this.start.x - this.vector.y, this.start.y + this.vector.x);
    this.ctx.lineTo(this.start.x, this.start.y);
    this.ctx.closePath();
    this.ctx.strokeStyle = "white";
    this.ctx.fillStyle = `rgba(${getRandom(0, 255)},${getRandom(
      0,
      255
    )},${getRandom(0, 255)}, 0.2)`;
    this.ctx.stroke();
  }
}
