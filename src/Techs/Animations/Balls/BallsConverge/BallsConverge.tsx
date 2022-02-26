import * as S from "./styles";
import { useCallback, useState, useEffect } from "react";

const PI2 = Math.PI * 2;
function getRandom(a: number, b: number) {
  return Math.random() * (b - a) + a;
}

function getRandomColor() {
  return {
    r: getRandom(100, 250),
    g: getRandom(100, 250),
    b: getRandom(100, 250),
  };
}

function BallsConverge() {
  useEffect(() => {
    const balls = new App();
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
  particles: any;
  particlesNum: any;

  constructor() {
    this.wrapper = document.getElementById("CanvasWrapper");
    this.canvas = document.createElement("canvas");
    this.wrapper.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];

    this.resize();
    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = this.wrapper.clientWidth;
    this.stageHeight = this.wrapper.clientHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;
    this.ctx.scale(1, 1);

    //soft-light
    //difference
    this.ctx.globalCompositeOperation = "color-dodge";
    this.particlesNum = Math.floor(
      Math.min(this.stageHeight, this.stageWidth) / 5
    );

    this.createParticles();
  }

  createParticles() {
    this.particles = [];
    for (var i = 0; i < this.particlesNum; i++) {
      this.particles[i] = new Particles(
        this.stageWidth,
        this.stageHeight,
        getRandom(10, 30),
        getRandomColor()
      );
    }
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    for (var i = 0; i < this.particlesNum; i++) {
      const item = this.particles[i];
      item.animate(this.ctx, this.stageWidth, this.stageHeight);
    }
  }
}

class Particles {
  r: any;
  rSpeed: any;

  theta: any;
  vTheta: any;

  width: any;
  height: any;
  radius: any;

  color: any;
  vColor: any;

  coordAdjust: any;

  constructor(width: any, height: any, radius: any, color: any) {
    this.r = getRandom(
      Math.min(width, height) / 6,
      Math.min(width, height) / 2.5
    );
    this.rSpeed = -this.r * 0.0001;

    this.width = width;
    this.height = height;
    this.theta = getRandom(0, 360);
    this.vTheta = getRandom(-0.003, 0.003);

    this.radius = radius;
    this.color = color;
    this.vColor = {
      r: getRandom(-0.5, 0.5),
      g: getRandom(-0.5, 0.5),
      b: getRandom(-0.5, 0.5),
    };

    this.coordAdjust = {
      x0: getRandom(-this.radius * 0.5, this.radius * 0.5),
      y0: getRandom(-this.radius * 0.5, this.radius * 0.5),
    };
  }

  animate(ctx: any, stageWidth: any, stageHeight: any) {
    this.theta += this.vTheta;
    this.r += this.rSpeed;

    this.color.r += this.vColor.r;
    this.color.g += this.vColor.g;
    this.color.b += this.vColor.b;

    if (this.color.r < 100 || this.color.r > 250) {
      this.vColor.r *= -1;
    }
    if (this.color.g < 100 || this.color.g > 250) {
      this.vColor.g *= -1;
    }
    if (this.color.b < 100 || this.color.b > 250) {
      this.vColor.b *= -1;
    }

    ctx.beginPath();

    const g = ctx.createRadialGradient(
      this.width / 2 + this.r * Math.sin(this.theta) + this.coordAdjust.x0,
      this.height / 2 + this.r * Math.cos(this.theta) + this.coordAdjust.y0,
      this.radius * 0,
      this.width / 2 + this.r * Math.sin(this.theta),
      this.height / 2 + this.r * Math.cos(this.theta),
      this.radius
    );

    g.addColorStop(
      0,
      `rgba(${this.color.r},${this.color.g},${this.color.b},0.3)`
    );
    g.addColorStop(
      1,
      `rgba(${this.color.r},${this.color.g},${this.color.b},1)`
    );
    ctx.fillStyle = g;
    if (this.radius > 0) {
      ctx.arc(
        this.width / 2 + this.r * Math.sin(this.theta),
        this.height / 2 + this.r * Math.cos(this.theta),
        this.radius,
        0,
        PI2,
        false
      );
    }
    ctx.fill();
  }
}

export default BallsConverge;
