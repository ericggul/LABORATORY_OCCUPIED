import style from "./Words.module.scss";
import { useState, useEffect, useRef, useCallback } from "react";
import { debounce } from "../../../functions/timer";
import classNames from "classnames";
import { clearInterval } from "timers";
const TEXT = "Esquivons Les Ecchymoses des Esquimaux aux Mots Exquis ";
const LENGTH = 16;

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

function Words() {
  useEffect(() => {
    const sector1 = new Sector();
  }, []);

  return <div className={style.container} id="CanvasWrapper"></div>;
}

class Sector {
  wrapper: any;
  canvas: any;
  ctx: any;
  stageWidth: any;
  stageHeight: any;

  texts: any;

  stablePoint: any;

  now: any;
  then: any;
  delta: any;
  time: any;

  constructor() {
    this.wrapper = document.getElementById("CanvasWrapper");
    this.canvas = document.createElement("canvas");
    this.wrapper.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.texts = [];

    this.now = Date.now();
    this.then = Date.now();
    this.time = 0;
    this.resize();

    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = this.wrapper.clientWidth * 0.5;
    this.stageHeight = this.wrapper.clientHeight * 0.5;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;
    this.ctx.scale(1, 1);

    this.stablePoint = {
      x: getRandom(0, this.stageWidth),
      y: getRandom(0, this.stageHeight),
    };

    for (let i = 0; i < 300; i++) {
      this.texts.push(
        new Text(
          this.stageWidth * 0.4,
          getRandom(0, this.stageHeight),
          this.stablePoint
        )
      );
    }

    window.addEventListener("mousemove", this.animate.bind(this));
  }

  animate(e: any) {
    this.now = Date.now();
    this.delta = this.now - this.then;

    if (this.delta > 60) {
      this.time += 60;
      this.then = this.now;
      this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

      this.texts.forEach((text: any, i: number) => {
        text.draw(this.ctx, this.time, e.clientX, e.clientY);
      });
    }
  }
}

class Text {
  xLoc: any;
  yLoc: any;
  fontSize: any;
  opacity: any;

  stablePoint: any;

  opacityVariables: any;
  locVariables: any;

  constructor(xLoc: any, yLoc: any, stablePoint: any) {
    this.xLoc = xLoc;
    this.yLoc = yLoc;
    this.fontSize = getRandom(12, 40);

    this.stablePoint = stablePoint;
    this.opacityVariables = {
      interval: getRandom(0.001, getRandom(0.003, 0.01)),
      delta: getRandom(0, 2 * Math.PI),
      intensity: getRandom(0, 0.6),
      start: getRandom(getRandom(0, 0.3), 0.7),
    };

    this.locVariables = {
      xx: getRandom(getRandom(-0.8, 0), getRandom(0.1, 0.5)),
      yy: getRandom(-0.1, 0.1),
      xy: getRandom(-0.1, 0.1),
      yx: getRandom(-0.1, 0.1),
    };
  }

  draw(ctx: any, time: any, mouseX: any, mouseY: any) {
    this.opacity =
      Math.sin(
        time * this.opacityVariables.interval + this.opacityVariables.delta
      ) *
        this.opacityVariables.intensity +
      this.opacityVariables.start;
    ctx.strokeStyle = `rgba(255, 255,255, ${this.opacity})`;
    ctx.font = `${this.fontSize}px serif`;
    ctx.strokeText(
      TEXT,
      this.xLoc +
        (mouseX - this.stablePoint.x) * this.locVariables.xx +
        (mouseY - this.stablePoint.y) * this.locVariables.xy,
      this.yLoc +
        (mouseY - this.stablePoint.y) * this.locVariables.yy +
        (mouseX - this.stablePoint.x) * this.locVariables.yx
    );
  }
}

export default Words;
