import * as S from "./styles";
import { useCallback, useState, useEffect } from "react";

const PI2 = Math.PI * 2;
function getRandom(a: number, b: number) {
  return Math.random() * (b - a) + a;
}

function getRandomColor() {
  return { r: getRandom(0, 200), g: getRandom(0, 200), b: getRandom(0, 180) };
}

function BallsBounce2() {
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
    this.ctx.globalCompositeOperation = "difference";
    this.particlesNum = Math.floor(
      (this.stageHeight * this.stageWidth) / 10000
    );

    this.createParticles();
  }

  createParticles() {
    this.particles = [];
    for (var i = 0; i < this.particlesNum; i++) {
      this.particles[i] = new Particles(
        this.stageWidth * 0.5,
        this.stageHeight * 0.5,
        getRandom(100, 300),
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
  x: any;
  y: any;
  radius: any;
  color: any;
  vColor: any;
  vx: any;
  vy: any;
  sinValue: any;
  cosValue: any;
  coordAdjust: any;

  constructor(x: any, y: any, radius: any, color: any) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.vColor = {
      r: getRandom(-0.5, 0.5),
      g: getRandom(-0.5, 0.5),
      b: getRandom(-0.5, 0.5),
    };

    this.vx = getRandom(-1, 1);
    this.vy = getRandom(-1, 1);
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
    this.x += this.vx;
    this.y += this.vy;

    this.color.r += this.vColor.r;
    this.color.g += this.vColor.g;
    this.color.b += this.vColor.b;

    if (this.x < -this.radius || this.x > stageWidth + this.radius) {
      this.vx *= -1;
    }

    if (this.y < -this.radius || this.y > stageHeight + this.radius) {
      this.vy *= -1;
    }

    if (this.color.r < 5 || this.color.r > 250) {
      this.vColor.r *= -1;
    }
    if (this.color.g < 5 || this.color.g > 250) {
      this.vColor.g *= -1;
    }
    if (this.color.b < 5 || this.color.b > 250) {
      this.vColor.b *= -1;
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

export default BallsBounce2;
