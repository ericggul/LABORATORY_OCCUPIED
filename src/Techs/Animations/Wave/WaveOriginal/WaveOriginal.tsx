import * as S from "./styles";
import { useCallback, useState, useEffect } from "react";
import { request } from "http";

function getRandom(a: number, b: number) {
  return Math.random() * (b - a) + a;
}

export default function WaveCanvas() {
  useEffect(() => {
    const wave = new App();
  }, []);

  return (
    <div
      id="CanvasWrapper"
      style={{ width: "100vw", height: "100vh", background: "black" }}
    />
  );
}

class App {
  canvas: any;
  ctx: any;
  wrapper: any;

  waveGroup: any;

  stageWidth: any;
  stageHeight: any;

  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.wrapper = document.getElementById("CanvasWrapper");
    this.wrapper.appendChild(this.canvas);

    this.waveGroup = new WaveGroup(6);

    window.addEventListener("resize", this.resize.bind(this));
    this.resize();

    this.animate();
  }

  resize() {
    this.stageWidth = this.wrapper.clientWidth;
    this.stageHeight = this.wrapper.clientHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;
    this.ctx.scale(1, 1);

    this.waveGroup.resize(this.stageWidth, this.stageHeight);
  }

  animate() {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.waveGroup.draw(this.ctx);
    requestAnimationFrame(this.animate.bind(this));
  }
}

class Point {
  x: any;
  y: any;
  fixedY: any;
  speed: any;
  cur: any;
  max: any;

  constructor(index: any, x: any, y: any) {
    this.x = x;
    this.y = y;
    this.fixedY = y;
    this.speed = getRandom(0.03, 0.05);
    this.cur = index;
    this.max = getRandom(10, 100);
  }
  update() {
    this.cur += this.speed;
    this.y = this.fixedY + Math.sin(this.cur) * this.max;
  }
}

class Wave {
  index: any;
  totalPoints: any;
  color: any;
  points: any;
  stageWidth: any;
  stageHeight: any;
  centerX: any;
  centerY: any;
  pointGap: any;

  constructor(index: any, totalPoints: any, color: any) {
    this.index = index;
    this.totalPoints = totalPoints;
    this.color = color;
    this.points = [];
  }

  resize(stageWidth: any, stageHeight: any) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.centerX = stageWidth / 2;
    this.centerY = stageHeight / 1.2;
    this.pointGap = (this.stageWidth * 1.2) / (this.totalPoints - 1);
    this.init();
  }

  init() {
    for (var i = 0; i < this.totalPoints; i++) {
      this.points[i] = new Point(
        this.index + i,
        this.pointGap * i - this.stageWidth * 0.1,
        this.centerY
      );
    }
  }

  draw(ctx: any) {
    ctx.beginPath();
    ctx.fillStyle = this.color;

    let prevX = this.points[0].x;
    let prevY = this.points[0].y;
    ctx.moveTo(prevX, prevY);

    for (var i = 1; i < this.totalPoints; i++) {
      if (i < this.totalPoints - 1) {
        this.points[i].update();
      }
      const cx = (prevX + this.points[i].x) / 2;
      const cy = (prevY + this.points[i].y) / 2;

      ctx.quadraticCurveTo(prevX, prevY, cx, cy);

      prevX = this.points[i].x;
      prevY = this.points[i].y;
    }

    ctx.lineTo(prevX, prevY);
    ctx.lineTo(this.stageWidth, this.stageHeight);
    ctx.lineTo(this.points[0].x, this.stageHeight);
    ctx.fill();
    ctx.closePath();
  }
}

class WaveGroup {
  totalWaves: any;
  totalPoints: any;
  waves: any;

  constructor(totalPoints: any) {
    this.totalWaves = 30;
    this.totalPoints = totalPoints;

    this.waves = [];

    for (let i = 0; i < this.totalWaves; i++) {
      this.waves[i] = new Wave(
        i,
        this.totalPoints,
        `rgba(${getRandom(0, 250)},${getRandom(0, 250)},${getRandom(
          0,
          250
        )},${getRandom(0.1, 0.4)})`
      );
    }
  }

  resize(stageWidth: any, stageHeight: any) {
    for (let i = 0; i < this.totalWaves; i++) {
      const wave = this.waves[i];
      wave.resize(stageWidth, stageHeight);
    }
  }

  draw(ctx: any) {
    for (let i = 0; i < this.totalWaves; i++) {
      const wave = this.waves[i];
      wave.draw(ctx);
    }
  }
}
