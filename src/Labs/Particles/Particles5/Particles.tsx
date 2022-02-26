import style from "./Particles.module.scss";
import { useState, useEffect, useCallback } from "react";

const CENTER = { x: 0.34, y: 0.73 };

const distrub = (): any => {
  return Math.random() * Math.random();
};

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

function Particles() {
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

  bundleNumber: any;
  bundles: any;

  constructor() {
    this.wrapper = document.getElementById("CanvasWrapper");
    this.canvas = document.createElement("canvas");
    this.wrapper.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.resize();

    window.addEventListener("resize", this.resize.bind(this));
    document.addEventListener("mousemove", (e) =>
      this.draw(e.clientX, e.clientY)
    );
    document.addEventListener("touchmove", (e) =>
      this.draw(e.changedTouches[0].clientX, e.changedTouches[0].clientY)
    );
  }

  resize() {
    this.stageWidth = this.wrapper.clientWidth;
    this.stageHeight = this.wrapper.clientHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;

    this.ctx.scale(1, 1);
    this.bundleNumber = 6;
    this.bundles = [];

    this.init();
  }

  init() {
    for (let i = 0; i < this.bundleNumber; i++) {
      this.bundles.push(
        new Bundle(
          {
            x: getRandom(
              -(this.stageWidth + this.stageHeight) / 10,
              (this.stageWidth + this.stageHeight) / 10
            ),
            y: getRandom(
              -(this.stageWidth + this.stageHeight) / 10,
              (this.stageWidth + this.stageHeight) / 10
            ),
          },
          (this.stageWidth + this.stageHeight) / 10,
          100
        )
      );
    }
  }

  draw(mouseX: any, mouseY: any) {
    this.bundles.map((bdl: any) => {
      bdl.draw(this.ctx, { x: mouseX, y: mouseY });
    });
  }
}

class Bundle {
  vector: any;
  radius: any;
  number: any;

  particles: any;
  color: any;

  constructor(vector: any, radius: any, number: any) {
    this.vector = vector;
    this.radius = radius;
    this.number = number;
    this.color = {
      r: getRandom(180, 240),
      g: getRandom(100, 150),
      b: getRandom(100, 200),
    };
    this.particles = [];
    this.init();
  }

  init() {
    for (let i = 0; i < this.number; i++) {
      this.particles.push(
        new Particle(
          this.vector,
          getRandom(0, this.radius),
          getRandom(0, Math.PI * 2),
          this.color
        )
      );
    }
  }

  draw(ctx: any, pos: any) {
    this.particles.map((ptc: any, i: number) => {
      ptc.draw(ctx, pos);
    });
  }
}

class Particle {
  vector: any;
  pos: any;
  initialRadius: any;
  initialTheta: any;
  radius: any;
  theta: any;
  size: any;

  radiusSpeed: any;
  thetaSpeed: any;
  color: any;

  constructor(vector: any, radius: any, theta: any, color: any) {
    this.vector = vector;
    this.pos = { x: -1000, y: -1000 };
    this.initialRadius = radius;
    this.initialRadius = theta;

    this.radius = radius;
    this.theta = theta;

    this.color = color;

    this.radiusSpeed =
      (Math.random() < 0.5 ? -1 : 1) * getRandom(0, getRandom(0, 0.5));
    this.thetaSpeed = getRandom(-0.05, 0.05);
    this.size = getRandom(0.01, 0.08);
  }

  draw(ctx: any, pos: any) {
    this.pos = pos;
    this.theta += this.thetaSpeed;
    this.radius += this.radiusSpeed;
    ctx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`;

    ctx.beginPath();
    ctx.arc(
      this.vector.x + this.pos.x + this.radius * Math.cos(this.theta),
      this.vector.y + this.pos.y + this.radius * Math.sin(this.theta),
      this.size,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
}

export default Particles;
