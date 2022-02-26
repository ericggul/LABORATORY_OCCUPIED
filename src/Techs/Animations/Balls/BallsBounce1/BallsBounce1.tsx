import * as S from "./styles";
import { useCallback, useState, useEffect } from "react";

const PI2 = Math.PI * 2;
function getRandom(a: number, b: number) {
  return Math.random() * (b - a) + a;
}

function getRandomColor() {
  return {
    r: getRandom(100, 150),
    g: getRandom(100, 150),
    b: getRandom(100, 150),
  };
}

function BallsBounce1() {
  useEffect(() => {
    const balls = new App("CanvasWrapper1");
    const balls2 = new App("CanvasWrapper2");
  }, []);
  return (
    <S.Container>
      <div
        id="CanvasWrapper1"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "60vw",
          height: "80vh",
          background: "transparent",
        }}
      />
      <div
        id="CanvasWrapper2"
        style={{
          position: "absolute",
          left: "40vw",
          top: "20vh",
          width: "60vw",
          height: "80vh",
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

    this.vColor = { r: 0.3, g: -0.2, b: 0.15 };

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

    if (this.color.r < 100 || this.color.r > 250) {
      this.vColor.r *= -1;
    }
    if (this.color.g < 100 || this.color.g > 250) {
      this.vColor.g *= -1;
    }
    if (this.color.b < 100 || this.color.b > 250) {
      this.vColor.b *= -1;
    }

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

export default BallsBounce1;
