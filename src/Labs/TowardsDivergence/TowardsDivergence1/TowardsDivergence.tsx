import React, { useEffect } from "react";
import * as S from "./styles";

export default function TowardsDivergenceTesting() {
  useEffect(() => {
    const app = new App();
  }, []);
  return <S.Container id="CanvasWrapper" />;
}
const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

class App {
  wrapper: any;
  canvas: any;
  ctx: any;
  stageWidth: any;
  stageHeight: any;

  scale: any;

  timeInterval: any;
  now: any;
  then: any;
  initial: any;
  elapsedTime: any;

  goingStraight: any;
  currentRadialPos: any;

  elementNumber: any;
  elementArray: any;

  constructor() {
    this.wrapper = document.getElementById("CanvasWrapper");
    this.canvas = document.createElement("canvas");
    this.wrapper.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.resize();

    this.timeInterval = 10;

    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.stageWidth = this.wrapper.clientWidth;
    this.stageHeight = this.wrapper.clientHeight;

    this.scale = 1;
    this.canvas.width = this.stageWidth * this.scale;
    this.canvas.height = this.stageHeight * this.scale;

    this.ctx.scale(this.scale, this.scale);

    this.init();
  }

  init() {
    this.goingStraight = true;
    this.currentRadialPos = 0;

    this.elementNumber = 100;
    this.elementArray = [];
    for (let i = 0; i < this.elementNumber; i++) {
      this.elementArray.push(new Element(this.stageWidth, this.stageHeight));
    }

    this.then = Date.now();
    this.initial = Date.now();
    this.animate();

    window.addEventListener(
      "click",
      () => (this.goingStraight = !this.goingStraight)
    );
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.now = Date.now();
    this.elapsedTime = this.now - this.initial;
    const delta = this.now - this.then;
    if (delta > 3) {
      this.draw();
    }
    this.then = this.now;
  }

  draw() {
    if (this.goingStraight) {
      this.currentRadialPos +=
        1 * (this.currentRadialPos / this.stageWidth) + 0.1;
    }

    this.elementArray.map((el: any) => {
      el.draw(this.currentRadialPos, this.goingStraight, this.ctx);
    });
  }
}

class Element {
  angle: any;
  incrementAngleSpeed: any;

  centerPos: any;

  constructor(stageWidth: any, stageHeight: any) {
    this.angle = getRandom(0, Math.PI * 2);
    this.incrementAngleSpeed =
      (Math.random() < 0.5 ? -1 : 1) * (Math.PI / 3000);
    this.centerPos = { x: stageWidth / 2, y: stageHeight / 2 };
  }

  draw(radialPos: any, goingStraight: any, ctx: any) {
    if (!goingStraight) {
      this.angle += this.incrementAngleSpeed;
    }
    ctx.fillRect(
      this.centerPos.x + radialPos * Math.cos(this.angle),
      this.centerPos.y + radialPos * Math.sin(this.angle),
      0.3,
      0.3
    );
  }
}
