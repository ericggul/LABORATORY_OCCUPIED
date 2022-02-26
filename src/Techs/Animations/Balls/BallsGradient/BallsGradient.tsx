import * as S from "./styles";
import { useCallback, useState, useEffect } from "react";

const PI2 = Math.PI * 2;
function getRandom(a: number, b: number) {
  return Math.random() * (b - a) + a;
}

function getRandomColor() {
  return {
    r: getRandom(50, 200),
    g: getRandom(100, 150),
    b: getRandom(100, 150),
  };
}

function BallsGradient() {
  useEffect(() => {
    const balls = new App("CanvasWrapper1");
  }, []);
  return (
    <S.Container>
      <div
        id="CanvasWrapper1"
        style={{
          position: "absolute",
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "transparent",
        }}
      />
    </S.Container>
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

  constructor(id: any) {
    this.wrapper = document.getElementById(id);
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

    this.ctx.globalCompositeOperation = "saturation";
    this.particlesNum = 15;

    this.createParticles();
  }

  createParticles() {
    this.particles = [];
    for (var i = 0; i < this.particlesNum; i++) {
      this.particles[i] = new Particles(
        getRandom(0, this.stageWidth),
        getRandom(0, this.stageHeight),
        getRandom(400, 800),
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

    this.vx = getRandom(4, 10);
    this.vy = getRandom(4, 10);

    this.sinValue = getRandom(-1, 1);
    this.cosValue = Math.sqrt(1 - this.sinValue ** 2);
  }

  animate(ctx: any, stageWidth: any, stageHeight: any) {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < this.radius) {
      this.vx *= -1;
      this.ax *= -1;
    } else if (this.x > stageWidth - this.radius) {
      this.vx *= -1;
      this.ax *= -1;
    }

    if (this.y < this.radius) {
      this.vy *= -1;
      this.ay *= -1;
    } else if (this.y > stageHeight - this.radius) {
      this.vy *= -1;
      this.ay *= -1;
    }

    ctx.beginPath();

    const g = ctx.createRadialGradient(
      this.x,
      this.y,
      this.radius * 0.01,
      this.x,
      this.y,
      this.radius
    );

    g.addColorStop(
      0,
      `rgba(${this.color.r},${this.color.g},${this.color.b},1)`
    );
    g.addColorStop(
      1,
      `rgba(${this.color.r},${this.color.g},${this.color.b},0)`
    );
    ctx.fillStyle = g;
    if (this.radius > 0) {
      ctx.arc(this.x, this.y, this.radius, 0, PI2, false);
    }
    ctx.fill();
  }
}

export default BallsGradient;
