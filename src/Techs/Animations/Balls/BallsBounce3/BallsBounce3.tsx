import * as S from "./styles";
import { useCallback, useState, useEffect } from "react";

const PI2 = Math.PI * 2;
function getRandom(a: number, b: number) {
  return Math.random() * (b - a) + a;
}

function getRandomColor() {
  return {
    r: getRandom(200, 250),
    g: getRandom(200, 250),
    b: getRandom(200, 250),
  };
}

function BallsBounce3() {
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
    this.ctx.globalCompositeOperation = "soft-light";
    this.particlesNum = Math.floor(
      (this.stageHeight * this.stageWidth) / 10000
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
  width: any;
  height: any;
  x: any;
  y: any;
  radius: any;
  color: any;
  vColor: any;
  vx: any;
  vy: any;
  ax: any;
  ay: any;
  sinValue: any;
  cosValue: any;
  coordAdjust: any;

  constructor(width: any, height: any, radius: any, color: any) {
    this.width = width;
    this.height = height;
    this.x = width * 0.5;
    this.y = height * 0.5;
    this.radius = radius;
    this.color = color;

    this.vx = getRandom(-1, 1);
    this.vy = getRandom(-1, 1);
    this.ax = 1.02;
    this.ay = 1.02;
    this.sinValue = getRandom(-1, 1);
    this.cosValue = Math.sqrt(1 - this.sinValue ** 2);

    this.coordAdjust = {
      x0: getRandom(-this.radius * 0.5, this.radius * 0.5),
      y0: getRandom(-this.radius * 0.5, this.radius * 0.5),
      x1: getRandom(-this.radius * 0.5, this.radius * 0.5),
      y1: getRandom(-this.radius * 0.5, this.radius * 0.5),
    };
  }

  animate(ctx: any, stageWidth: any, stageHeight: any) {
    this.vx *= this.ax;
    this.vy *= this.ay;
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < -this.radius || this.x > stageWidth + this.radius) {
      this.vx = getRandom(-1, 1);
      this.vy = getRandom(-1, 1);
      this.x = this.width * 0.5;
      this.y = this.height * 0.5;
    }

    if (this.y < -this.radius || this.y > stageHeight + this.radius) {
      this.vx = getRandom(-1, 1);
      this.vy = getRandom(-1, 1);
      this.x = this.width * 0.5;
      this.y = this.height * 0.5;
    }

    ctx.beginPath();

    const g = ctx.createRadialGradient(
      this.x + this.coordAdjust.x0,
      this.y + this.coordAdjust.y0,
      this.radius * 0,
      this.x + this.coordAdjust.x1,
      this.y + this.coordAdjust.y1,
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
      ctx.arc(this.x, this.y, this.radius, 0, PI2, false);
    }
    ctx.fill();
  }
}

export default BallsBounce3;
