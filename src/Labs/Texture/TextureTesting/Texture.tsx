import style from "./Texture.module.scss";
import { useState, useEffect, useCallback } from "react";

const CENTER = { x: 0.34, y: 0.73 };

const distrub = (): any => {
  return Math.random() * Math.random();
};

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

//Center Square Uniform Generator
const colorGenerator = ({ x, y }: any) => {
  console.log(x, y);
  return {
    s: Math.abs(x - CENTER.x + y - CENTER.y) * 100,
    l: getRandom(0, 100),
  };
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
        const { s, l } = colorGenerator({
          x: i / this.stageWidth,
          y: j / this.stageHeight,
        });
        this.ctx.beginPath();

        this.ctx.fillRect(i, j, 1, 1);
        this.ctx.fillStyle = `hsl(58, ${s}%, ${l}%)`;
      }
    }
  }
}

export default Texture;
