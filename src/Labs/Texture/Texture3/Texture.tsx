import style from "./Texture.module.scss";
import { useState, useEffect, useCallback } from "react";

const COLOR_SETS = [
  {
    hsl: { h: 58, s: 57, l: 59 },
    ratio: 0.3,
  },
  {
    hsl: { h: 58, s: 3, l: 14 },
    ratio: 0.1,
  },
];

const distrub = (): any => {
  return Math.random() * Math.random();
};

function Texture() {
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

  constructor() {
    this.wrapper = document.getElementById("CanvasWrapper");
    this.canvas = document.createElement("canvas");
    this.wrapper.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.resize();

    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.stageWidth = this.wrapper.clientWidth;
    this.stageHeight = this.wrapper.clientHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;

    this.ctx.scale(1, 1);
    this.init();
  }

  init() {
    for (let i = 0; i < this.stageWidth; i++) {
      for (let j = 0; j < this.stageHeight; j++) {
        this.ctx.beginPath();

        this.ctx.fillRect(i, j, 1, 1);
        this.ctx.fillStyle = `hsl(58, ${distrub() * 100}%,  ${
          (1 - distrub()) * 100
        }%)`;
      }
    }
  }
}

export default Texture;
