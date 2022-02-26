import * as S from "./styles";
import { useCallback, useState, useEffect } from "react";

const PI2 = Math.PI * 2;
function getRandom(a: number, b: number) {
  return Math.random() * (b - a) + a;
}

function getRandomColor() {
  return {
    r: getRandom(0, 80),
    g: getRandom(150, 230),
    b: getRandom(100, 180),
  };
}

function QuadriptychTesting() {
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

    this.ctx.globalCompositeOperation = "screen";
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
        getRandom(50, 100),
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
  ax: any;
  ay: any;
  sinValue: any;
  cosValue: any;

  constructor(x: any, y: any, radius: any, color: any) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.vColor = { r: 0.5, g: -0.2, b: 0.4 };

    this.vx = getRandom(-1, 1);
    this.vy = getRandom(-1, 1);
    this.ax = getRandom(-0.001, 0.001);
    this.ay = getRandom(-0.001, 0.001);
    this.sinValue = getRandom(-1, 1);
    this.cosValue = Math.sqrt(1 - this.sinValue ** 2);
  }

  animate(ctx: any, stageWidth: any, stageHeight: any) {
    this.vx += this.ax;
    this.vy += this.ay;
    this.x += this.vx;
    this.y += this.vy;

    this.color.r += this.vColor.r;
    this.color.g += this.vColor.g;
    this.color.b += this.vColor.b;

    if (this.x < this.radius || this.x > stageWidth - this.radius) {
      this.vx *= -1;
      this.ax *= -1;
    }

    if (this.y < this.radius || this.y > stageHeight - this.radius) {
      this.vy *= -1;
      this.ay *= -1;
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
      this.x,
      this.y,
      this.radius * 0,
      this.x,
      this.y,
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

export default QuadriptychTesting;
